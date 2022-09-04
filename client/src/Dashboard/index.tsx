import styled from '@emotion/styled';

import HeaderComp from '../components/Header';
import RightPanelComp from './RightPanel';
import TransactionsComp from './Transactions';

const Root = styled.div`
  display: grid;
  align-items: start;
  grid-template-areas: 'header right-panel' 'transactions right-panel';
  grid-template-columns: 2fr 1fr;
  grid-template-rows: auto 1fr;
`;

const Header = styled(HeaderComp)`
  grid-area: header;
`;

const RightPanel = styled(RightPanelComp)`
  grid-area: right-panel;
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
      <RightPanel />
      <Transactions />
    </Root>
  );
};

export default Dashboard;
