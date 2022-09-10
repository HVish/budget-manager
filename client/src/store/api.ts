import axios from 'axios';
import { Transaction } from '../shared/types';

const api = axios.create({
  baseURL: '/api',
  headers: {
    Authorization: process.env.REACT_APP_AUTH_TOKEN,
  },
});

export async function getTransactions() {
  const response = await api.get<Transaction[]>('/transactions');
  return response.data;
}

interface AddTransactionPayload {
  amount: number;
  description: string;
}

export async function addTransaction(paylaod: AddTransactionPayload) {
  const response = await api.post<Transaction>('/transactions', paylaod);
  return response.data;
}
