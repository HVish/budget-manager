import styled from '@emotion/styled';

import HeaderComp from '../components/Header';
import { MOBILE_WIDTH } from '../shared/media-query';
import { colors } from '../shared/theme';
import RightPanelComp from './RightPanel';
import TransactionsComp from './Transactions';

const Root = styled.div`
  display: grid;
  align-items: start;
  grid-template-areas: 'header right-panel' 'transactions right-panel';
  grid-template-columns: 2fr 1fr;
  grid-template-rows: auto 1fr;

  @media only screen and (max-width: ${MOBILE_WIDTH}px) {
    position: relative;
    padding: 0 1.5rem;
    grid-template-areas: 'header' 'transactions';
    grid-template-columns: 1fr;
  }
`;

const Header = styled(HeaderComp)`
  grid-area: header;
`;

const RightPanel = styled(RightPanelComp)`
  grid-area: right-panel;
  height: 100%;

  @media only screen and (max-width: ${MOBILE_WIDTH}px) {
    position: absolute;
    right: 0px;
    top: 0;
    bottom: 0;
    transform: translateX(100%);
    background-color: ${colors.common.bg};
    z-index: 1000;
    transition: 300ms ease-in;
    min-width: 100vw;
  }
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
