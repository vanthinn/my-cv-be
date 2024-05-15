import { UploadApiErrorResponse, UploadApiResponse } from "cloudinary";

export type JwtPayload = {
  sub: string;
  username: string;
};

export type RequestUser = {
  id: string;
  fullName: string;
  email: string;
  roleId: string[];
  session: string;
  avatarUrl: string | null;
};

export type CloudinaryResponse = UploadApiResponse | UploadApiErrorResponse;

export type Document = {
  fileName: string;
  fileUrl: string;
};
