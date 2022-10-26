import styled from '@emotion/styled';
import Fab from '../components/Fab';

import { ReactComponent as AddIcon } from '../assets/add.svg';

import HeaderComp from '../components/Header';
import { getMediaQuery, useIsTablet } from '../shared/media-query';
import { colors } from '../shared/theme';
import { useAppDispatch } from '../store';
import { toggleRightPanel } from '../app/store/actions';
import RightPanelComp from './RightPanel';
import TransactionsComp from './Transactions';
import { useSelector } from 'react-redux';
import { selectIsRightPanelOpen } from '../app/store/selectors';

const Root = styled.div`
  display: grid;
  align-items: start;
  grid-template-areas: 'header right-panel' 'transactions right-panel';
  grid-template-columns: 2fr 1fr;
  grid-template-rows: auto 1fr;
  overflow: auto;

  @media ${getMediaQuery('medium')} {
    position: relative;
  }

  @media ${getMediaQuery('tablet')} {
    grid-template-areas: 'header' 'transactions';
    grid-template-columns: 1fr;
  }
`;

const Header = styled(HeaderComp)`
  grid-area: header;

  @media ${getMediaQuery('medium')} {
    position: relative;
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }
`;

const RightPanel = styled(RightPanelComp)<{ isOpen: boolean }>`
  grid-area: right-panel;
  height: 100%;

  @media ${getMediaQuery('tablet')} {
    position: absolute;
    right: 0px;
    top: 0;
    bottom: 0;
    transform: ${props =>
      props.isOpen ? 'translateX(0)' : 'translateX(100%)'};
    background-color: ${colors.common.bg};
    z-index: 1000;
    transition: transform 300ms ease-in;
    min-width: 300px;
  }

  @media ${getMediaQuery('mobile')} {
    min-width: 100vw;
  }
`;

const Transactions = styled(TransactionsComp)`
  grid-area: transactions;
  height: 100%;
  overflow: auto;
  padding-right: 20px;

  @media ${getMediaQuery('medium')} {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }
`;

const Dashboard = () => {
  const isTablet = useIsTablet();
  const dispatch = useAppDispatch();

  const isRightPanelOpen = useSelector(selectIsRightPanelOpen);

  const openRightPanel = () => dispatch(toggleRightPanel({ isOpen: true }));

  return (
    <Root>
      <Header>Dashboard</Header>
      <RightPanel isOpen={isRightPanelOpen} />
      <Transactions />
      {isTablet ? (
        <Fab onClick={openRightPanel}>
          <AddIcon />
        </Fab>
      ) : null}
    </Root>
  );
};

export default Dashboard;
