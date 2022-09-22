import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import styled from '@emotion/styled';

import Button from '../components/Button';
import Section from '../components/Section';
import Transaction from '../components/Transaction';
import {
  selectIsTransactionsLoading,
  selectTransactions,
} from '../store/transactions/selectors';
import { fetchTransactions } from '../store/transactions/actions';
import { useAppDispatch } from '../store';
import { Link } from 'react-router-dom';

const Root = styled.div`
  border-radius: 4px;
`;

interface Props {
  className?: string;
}

const Transactions = ({ className }: Props) => {
  const dispatch = useAppDispatch();

  const transactions = useSelector(selectTransactions(10));
  const isLoading = useSelector(selectIsTransactionsLoading);

  useEffect(
    function getData() {
      dispatch(fetchTransactions());
    },
    [dispatch]
  );

  return (
    <Root className={className}>
      <Section
        header={
          <>
            <span>Transactions</span>
            <Link to="../transactions">
              <Button>View All</Button>
            </Link>
          </>
        }
      >
        {isLoading
          ? 'Getting transactions...'
          : !transactions.length
          ? 'No transactions found!'
          : null}
        {transactions.map(transaction => (
          <Transaction
            key={transaction._id}
            amount={transaction.amount}
            date={transaction.createdAt}
            title={transaction.description}
          />
        ))}
      </Section>
    </Root>
  );
};

export default Transactions;
