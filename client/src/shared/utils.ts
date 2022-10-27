import { format } from 'date-fns';

/**
 * Formats currency amount into more readable format
 * @param amount amount that need to be formatted
 * @returns formatted currency string
 */
export function formatCurrency(amount: number) {
  return amount.toLocaleString('en-IN');
}

/**
 * Formats unix timestamp into a readable data and time format
 * @param unixTime unix timestamp in milli-seconds
 * @returns formatted date string
 */
export function formatUnixTime(unixTime: number) {
  return format(unixTime, 'dd MMM, yyyy hh:mm a');
}

export function notUndefined<T>(item: T | undefined): item is T {
  return item !== undefined;
}
