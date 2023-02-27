export enum TransactionType {
  CREDIT = 'credit',
  DEBIT = 'debit',
}

export interface TransactionStats {
  income: number;
  expense: number;
}
