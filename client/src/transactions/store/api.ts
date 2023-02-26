import request from '../../shared/request';
import { Stats, Transaction, TrendItem } from '../../shared/types';

interface GetTransactionsParams {
  skip?: number;
}

export async function getTransactions(params?: GetTransactionsParams) {
  const response = await request.get<Transaction[]>('/transactions', {
    params,
  });
  return response.data;
}

interface AddTransactionPayload {
  amount: number;
  date: number;
  description: string;
  /** tag ids */
  tags: string[];
}

export async function addTransaction(payload: AddTransactionPayload) {
  const response = await request.post<Transaction>('/transactions', payload);
  return response.data;
}

type UpdateTransactionPayload = Partial<
  Omit<Transaction, '_id' | 'updatedAt'>
> &
  Pick<Transaction, '_id'>;

export async function updateTransaction({
  _id,
  ...payload
}: UpdateTransactionPayload) {
  const response = await request.patch<Transaction>(
    `/transactions/${_id}`,
    payload
  );
  return response.data;
}

export async function deleteTransaction({
  transactionId,
}: {
  transactionId: string;
}) {
  await request.delete(`/transactions/${transactionId}`);
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

interface GetTrendsParams {
  by: 'year' | 'month' | 'day';
  /** unixtime in milliseconds */
  start: number;
  /** unixtime in milliseconds */
  end: number;
}

export async function getTrends(params: GetTrendsParams) {
  const response = await request.get<TrendItem[]>('/transactions/trends', {
    params,
  });
  return response.data;
}
