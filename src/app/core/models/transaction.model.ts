export interface Transaction {
  id: string;
  type: 'sale' | 'purchase' | 'payment' | 'receipt';
  date: Date;
  partyId: string;
  amount: number;
  reference: string;
  status: 'draft' | 'confirmed' | 'cancelled';
  paymentMethod: 'cash' | 'bank';
  bankAccountId?: string;
  notes?: string;
  createdBy: string;
  createdAt: Date;
}