import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import styled from '@emotion/styled';

import Button from '../components/Button';
import Section from '../components/Section';
import Transaction from '../components/Transaction';
import {
  selectIsTransactionsLoading,
  selectTransactions,
} from '../store/selectors';
import { fetchTransactions } from '../store/actions';
import { useAppDispatch } from '../store';

const Root = styled.section`
  border-radius: 4px;
`;

interface Props {
  className?: string;
}

const Transactions = ({ className }: Props) => {
  const dispatch = useAppDispatch();

  const isLoading = useSelector(selectIsTransactionsLoading);
  const transactions = useSelector(selectTransactions);

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
            <Button>View All</Button>
          </>
        }
      >
        {isLoading ? 'Getting transactions...' : null}
        {!transactions.length ? 'No transactions found!' : null}
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
