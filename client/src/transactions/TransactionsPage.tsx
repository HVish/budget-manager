import { styled } from '@mui/material';
import TransactionList from './TransactionList';

const Root = styled('div')(({ theme }) => ({
  display: 'grid',
  gap: theme.spacing(1.75),
}));

const TransactionsPage = () => {
  return (
    <Root>
      <TransactionList showAll />
    </Root>
  );
};

export default TransactionsPage;
