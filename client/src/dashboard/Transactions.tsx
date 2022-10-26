import { Link } from 'react-router-dom';

import { Button, styled } from '@mui/material';

import Section from '../components/Section';
import TransactionList from '../transactions/TransactionList';

const Root = styled('div')(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
}));

interface Props {
  className?: string;
}

const Transactions = ({ className }: Props) => {
  return (
    <Root className={className}>
      <Section
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
    </Root>
  );
};

export default Transactions;
