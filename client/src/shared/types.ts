export interface Transaction {
  _id: string;
  amount: number;
  description: string;
  tags: string[];
  /** unix timestamp */
  createdAt: number;
  /** unix timestamp */
  updatedAt: number;
}

export interface Stats {
  income: number;
  expense: number;
}

export interface TrendItem {
  _id: string;
  income: number;
  expense: number;
}

export interface Tag {
  _id: string;
  name: string;
}
