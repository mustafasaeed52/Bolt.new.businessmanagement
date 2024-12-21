export interface Product {
  id: string;
  name: string;
  sku: string;
  description: string;
  category: string;
  quantity: number;
  unitPrice: number;
  reorderLevel: number;
  createdAt: Date;
  updatedAt: Date;
}