export interface Gift {
  id: string;
  title: string;
  reserved: boolean;
  reservedBy?: string;
  reservedAt?: string;
  createdAt: string;
  updatedAt?: string;
}
