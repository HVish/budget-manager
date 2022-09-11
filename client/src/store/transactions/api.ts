import request from '../../shared/request';
import { Transaction } from '../../shared/types';

export async function getTransactions() {
  const response = await request.get<Transaction[]>('/transactions');
  return response.data;
}

interface AddTransactionPayload {
  amount: number;
  description: string;
}

export async function addTransaction(paylaod: AddTransactionPayload) {
  const response = await request.post<Transaction>('/transactions', paylaod);
  return response.data;
}
