import { Prisma } from '@prisma/client';

export type getUsersPayload = Prisma.UserGetPayload<{
    select: {
        id: true;
        email: true;
        password: true;
        firstName: true;
        lastName: true;
        avatarUrl: true;
        roleId: true
    };
}>;