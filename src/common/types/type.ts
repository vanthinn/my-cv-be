export type JwtPayload = {
  sub: string;
  username: string;
};

export type RequestUser = {
  id: string;
  fullName: string;
  roleId: string[];
  session: string;
  avatarUrl: string | null;
};
