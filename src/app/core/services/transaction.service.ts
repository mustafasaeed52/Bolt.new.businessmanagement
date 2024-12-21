import { Injectable } from '@angular/core';
import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { environment } from '../../../environments/environment';
import { Transaction } from '../models/transaction.model';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
  }

  async createTransaction(transaction: Omit<Transaction, 'id' | 'createdAt'>) {
    const { data, error } = await this.supabase
      .from('transactions')
      .insert(transaction)
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async getTransactions(type?: Transaction['type']) {
    let query = this.supabase
      .from('transactions')
      .select('*, party:parties(name)');
    
    if (type) {
      query = query.eq('type', type);
    }
    
    const { data, error } = await query.order('date', { ascending: false });
    if (error) throw error;
    return data;
  }

  async updateTransactionStatus(id: string, status: Transaction['status']) {
    const { data, error } = await this.supabase
      .from('transactions')
      .update({ status })
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data;
  }
}