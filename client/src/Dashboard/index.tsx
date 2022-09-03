import styled from '@emotion/styled';

import HeaderComp from '../components/Header';
import QuickActionsComp from './QuickActions';
import TransactionsComp from './Transactions';

const Root = styled.div`
  display: grid;
  align-items: start;
  grid-template-areas: 'header quick-actions' 'transactions quick-actions';
  grid-template-columns: 2fr 1fr;
  grid-template-rows: auto 1fr;
`;

const Header = styled(HeaderComp)`
  grid-area: header;
`;

const QuickActions = styled(QuickActionsComp)`
  grid-area: quick-actions;
  height: 100%;
`;

const Transactions = styled(TransactionsComp)`
  grid-area: transactions;
  height: 100%;
`;

const Dashboard = () => {
  return (
    <Root>
      <Header>Dashboard</Header>
      <QuickActions />
      <Transactions />
    </Root>
  );
};

export default Dashboard;
