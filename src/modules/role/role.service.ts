import { BadRequestException, Injectable, Logger, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/database/services";
import { CreateRoleDto } from "./dto";
import { UpdateRoleDto } from "./dto/updateRole.dto";

@Injectable()
export class RoleService {
    constructor(private readonly dbContext: PrismaService) { }


    private readonly logger: Logger = new Logger(RoleService.name);

    async createRole(createRoleDto: CreateRoleDto) {
        const { displayName, name, description, permissions } = createRoleDto;

        const foundRole = await this.dbContext.role.findFirst({
            where: { name },
        });

        if (foundRole) {
            throw new BadRequestException('This role name has been used.');
        }

        const filteredPermissions = await this.dbContext.permission.findMany({
            where: { id: { in: [...permissions] } },
        });

        const role = await this.dbContext.role.create({
            data: {
                name: name,
                displayName: displayName,
                description: description,
                permissions: {
                    createMany: {
                        data: filteredPermissions.map((p) => ({
                            permissionId: p.id,
                        })),
                        skipDuplicates: true,
                    },
                },
            },
        });

        this.logger.log('Created a role record', role);
        return role;
    }

    async updateRole(id: string, roleInfo: UpdateRoleDto) {
        console.log(roleInfo)
        const { permissions } = roleInfo;
        const role = await this.dbContext.role.findUnique({
            where: {
                id,
            },
        });

        if (!role) {
            throw new NotFoundException('The requested role does not exist.');
        }

        if (!role.canBeUpdated)
            throw new BadRequestException('This role cannot be updated.');

        if (role.name !== roleInfo.name && roleInfo) {
            const foundRole = await this.dbContext.role.findFirst({
                where: {
                    name: roleInfo.name,
                },
            });

            if (foundRole)
                throw new BadRequestException(
                    'A role with given name already exists. Please try again.',
                );
        }

        const filteredPermissions = await this.dbContext.permission.findMany({
            where: { id: { in: [...permissions] } },
        });

        const updatedRole = await this.dbContext.role.update({
            where: {
                id: id,
            },
            data: {
                name: roleInfo.name,
                displayName: roleInfo.name,
                description: roleInfo.description,
                permissions: {
                    deleteMany: {
                        permissionId: {
                            notIn: filteredPermissions.map((x) => x.id),
                        },
                    },
                    createMany: {
                        data: filteredPermissions.map((p) => ({
                            permissionId: p.id,
                        })),
                        skipDuplicates: true,
                    },
                },
            },
        });

        this.logger.log({ updatedRole }, 'updated role record');
    }

    async roleExists(roleId: string): Promise<boolean> {
        const role = await this.dbContext.role.findUnique({ where: { id: roleId } });
        return !!role;
    }
}