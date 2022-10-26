import request from '../../shared/request';
import { Stats, Transaction } from '../../shared/types';

interface GetTransactionsParams {
  lastId?: string;
}

export async function getTransactions(params?: GetTransactionsParams) {
  const response = await request.get<Transaction[]>('/transactions', {
    params,
  });
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

interface GetStatsParams {
  /** unixtime in milliseconds */
  start: number;
  /** unixtime in milliseconds */
  end: number;
}

export async function getStats(params: GetStatsParams) {
  const response = await request.get<Stats>('/transactions/stats', { params });
  return response.data;
}
