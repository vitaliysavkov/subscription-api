export interface UserModelFields {
  id: string;
  email: string;
  password: string;
  subscriptionId?: string | null;
  expiresAt?: string | null;
  createdAt: string;
  updatedAt: string;
}
