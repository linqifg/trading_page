export interface User {
  name: string;
  password: string;
  code: string;
}

export interface InvitationCode {
  code: string;
  createdAt: number;
  expiresAt: number;
}