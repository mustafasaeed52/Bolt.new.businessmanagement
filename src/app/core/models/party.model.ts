export interface Party {
  id: string;
  name: string;
  type: 'customer' | 'supplier';
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
  creditLimit?: number;
  currentBalance: number;
  createdAt: Date;
}