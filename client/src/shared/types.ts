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
