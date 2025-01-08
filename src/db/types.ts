export interface IDatabase {
  createUser(name: string, password: string, code: string): Promise<boolean>;
  validateUser(name: string, password: string): Promise<boolean>;
  validateInvitationCode(code: string): Promise<boolean>;
  isUserExists(name: string): Promise<boolean>;
  addInvitationCode(code: { code: string; createdAt: number; expiresAt: number }): Promise<boolean>;
}