import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { Button, styled } from '@mui/material';

import { useAppDispatch } from '../store';
import { fetchTransactions } from './store/actions';
import {
  selectIsTransactionsLoading,
  selectTransactions,
} from './store/selectors';
import Transaction from './Transaction';

const LoadMoreButton = styled(Button)`
  margin-top: 1rem;
  width: 100%;
`;

interface Props {
  /** @default false */
  showAll?: boolean;
}

const TransactionList = ({ showAll = false }: Props) => {
  const dispatch = useAppDispatch();

  const [hasMore, setHasMore] = useState(true);
  const [isFetchingMore, setIsFetchingMore] = useState(false);

  const isLoading = useSelector(selectIsTransactionsLoading);
  const transactions = useSelector(
    selectTransactions(showAll ? undefined : 10)
  );

  useEffect(
    function getData() {
      dispatch(fetchTransactions());
    },
    [dispatch]
  );

  const handleLoadMore = async () => {
    try {
      setIsFetchingMore(true);
      const result = await dispatch(
        fetchTransactions({ skip: transactions.length })
      ).unwrap();
      if (!result.length) {
        setHasMore(false);
      }
    } catch (error) {
    } finally {
      setIsFetchingMore(false);
    }
  };

  return (
    <>
      {isLoading
        ? 'Getting transactions...'
        : !transactions.length
        ? 'No transactions found!'
        : null}
      {transactions.map(transaction => (
        <Transaction key={transaction._id} transactionId={transaction._id} />
      ))}
      {showAll ? (
        <LoadMoreButton
          size="large"
          disabled={!hasMore || isFetchingMore}
          onClick={handleLoadMore}
        >
          {!hasMore
            ? 'No more transactions'
            : isFetchingMore
            ? 'Loading...'
            : 'Load more'}
        </LoadMoreButton>
      ) : null}
    </>
  );
};
export default TransactionList;
