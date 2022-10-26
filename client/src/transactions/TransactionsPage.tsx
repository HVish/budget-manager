import styled from '@emotion/styled';

import { ReactComponent as AddIcon } from '../assets/add.svg';
import Fab from '../components/Fab';
import HeaderComp from '../components/Header';
import { getMediaQuery, useIsTablet } from '../shared/media-query';
import { useAppDispatch } from '../store';
import TransactionList from './TransactionList';
import { toggleRightPanel } from '../app/store/actions';

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

const Body = styled.div`
  grid-area: transactions;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: auto;
  padding-right: 20px;
  gap: 12px;
  padding-bottom: 1rem;

  @media ${getMediaQuery('medium')} {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }
`;

const TransactionsPage = () => {
  const isTablet = useIsTablet();
  const dispatch = useAppDispatch();

  const openRightPanel = () => dispatch(toggleRightPanel({ isOpen: true }));

  return (
    <Root>
      <Header>All Transactions</Header>
      <Body>
        <TransactionList showAll />
      </Body>
      {isTablet ? (
        <Fab onClick={openRightPanel}>
          <AddIcon />
        </Fab>
      ) : null}
    </Root>
  );
};

export default TransactionsPage;
