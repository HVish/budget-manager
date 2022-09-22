import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { useSelector } from 'react-redux';

import { ReactComponent as AddIcon } from '../assets/add.svg';
import Button from '../components/Button';
import Fab from '../components/Fab';
import HeaderComp from '../components/Header';
import RightPanelComp from '../Dashboard/RightPanel';
import Transaction from '../components/Transaction';
import { getMediaQuery, useIsTablet } from '../shared/media-query';
import { useAppDispatch } from '../store';
import { toggleRightPanel } from '../store/app/actions';
import { selectIsRightPanelOpen } from '../store/app/selectors';
import { fetchTransactions } from '../store/transactions/actions';
import {
  selectIsTransactionsLoading,
  selectTransactions,
} from '../store/transactions/selectors';
import { colors } from '../shared/theme';

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

const LoadMoreButton = styled(Button)`
  margin-top: 1rem;
  width: 100%;
`;

const TransactionsPage = () => {
  const isTablet = useIsTablet();
  const dispatch = useAppDispatch();

  const [hasMore, setHasMore] = useState(true);
  const [isFetchingMore, setIsFetchingMore] = useState(false);

  const isRightPanelOpen = useSelector(selectIsRightPanelOpen);

  const transactions = useSelector(selectTransactions());
  const isLoading = useSelector(selectIsTransactionsLoading);

  useEffect(
    function getData() {
      dispatch(fetchTransactions());
    },
    [dispatch]
  );

  const openRightPanel = () => dispatch(toggleRightPanel({ isOpen: true }));

  const handleLoadMore = async () => {
    try {
      setIsFetchingMore(true);
      const result = await dispatch(
        fetchTransactions({ lastId: transactions.at(-1)?._id })
      ).unwrap();
      if (!result.length) {
        setHasMore(false);
      }
    } catch (error) {
    } finally {
      setIsFetchingMore(false);
    }
  };

  return (
    <Root>
      <Header>All Transactions</Header>
      <RightPanel isOpen={isRightPanelOpen} />
      <Body>
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
        <LoadMoreButton
          disabled={!hasMore || isFetchingMore}
          onClick={handleLoadMore}
        >
          {!hasMore
            ? 'No more transactions'
            : isFetchingMore
            ? 'Loading...'
            : 'Load more'}
        </LoadMoreButton>
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
