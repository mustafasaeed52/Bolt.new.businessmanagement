import { Injectable } from '@angular/core';
import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { environment } from '../../../environments/environment';
import { Product } from '../models/inventory.model';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
  }

  async getProducts() {
    const { data, error } = await this.supabase
      .from('products')
      .select('*')
      .order('name');
    if (error) throw error;
    return data;
  }

  async addProduct(product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) {
    const { data, error } = await this.supabase
      .from('products')
      .insert(product)
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async updateStock(productId: string, quantity: number) {
    const { data, error } = await this.supabase
      .from('products')
      .update({ quantity })
      .eq('id', productId)
      .select()
      .single();
    if (error) throw error;
    return data;
  }
}