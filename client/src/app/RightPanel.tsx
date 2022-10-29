import { MouseEventHandler, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { ArrowBack as BackIcon } from '@mui/icons-material';
import { AppBar, Button, IconButton, styled, Toolbar } from '@mui/material';

import { forMobile, forTablet } from '../shared/media-query';
import { useAppDispatch } from '../store';
import AddTransaction from '../transactions/AddTransaction';
import Section from '../components/Section';
import MonthPicker from '../components/MonthPicker';
import Stats from '../components/Stats';
import { selectStats } from '../transactions/store/selectors';
import { fetchStats } from '../transactions/store/actions';
import { endOfMonth, startOfMonth } from 'date-fns';

const Root = styled('aside')(({ theme }) => ({
  padding: theme.spacing(8, 2, 4),
  position: 'relative',
  overflow: 'auto',

  [forMobile(theme)]: {
    padding: 0,
    width: '100vw',
  },
}));

const Wrapper = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.common.white,
  borderRadius: 12,
  padding: theme.spacing(4, 3),
  minWidth: 280,
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  justifyContent: 'space-between',

  [forTablet(theme)]: {
    flexDirection: 'column-reverse',
  },

  [forMobile(theme)]: {
    margin: theme.spacing(0, 2, 4),
  },
}));

interface Props {
  className?: string;
  onClose?: MouseEventHandler;
}

const RightPanel = ({ className, onClose }: Props) => {
  const dispatch = useAppDispatch();

  const [month, setMonth] = useState(Date.now());

  const stats = useSelector(selectStats);

  useEffect(
    function getStats() {
      dispatch(
        fetchStats({
          start: startOfMonth(month).getTime(),
          end: endOfMonth(month).getTime(),
        })
      );
    },
    [dispatch, month]
  );

  return (
    <Root className={className}>
      {onClose && (
        <AppBar elevation={0} position="sticky" color="default">
          <Toolbar>
            <IconButton edge="start" onClick={onClose}>
              <BackIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      )}
      <Wrapper>
        <AddTransaction />
        <Section
          header={
            <>
              <span>Statistics</span>
              <MonthPicker onChange={setMonth} value={month} />
            </>
          }
        >
          <Stats
            income
            amount={stats.income}
            title="Total income"
            changeInPercentage={1}
          />
          <Stats
            expense
            amount={stats.expense}
            title="Total expense"
            changeInPercentage={20}
          />
          <Button>View All</Button>
        </Section>
      </Wrapper>
    </Root>
  );
};

export default RightPanel;
