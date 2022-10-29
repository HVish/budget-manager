import { Link } from 'react-router-dom';

import { Button } from '@mui/material';

import Section from '../components/Section';
import TransactionList from '../transactions/TransactionList';

interface Props {
  className?: string;
}

const Transactions = ({ className }: Props) => {
  return (
    <Section
      className={className}
      header={
        <>
          <span>Transactions</span>
          <Button component={Link} to="../transactions">
            View All
          </Button>
        </>
      }
    >
      <TransactionList />
    </Section>
  );
};

export default Transactions;
