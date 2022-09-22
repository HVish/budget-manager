import { useState } from 'react';
import styled from '@emotion/styled';

import { ReactComponent as CloseIcon } from '../assets/close.svg';

import Button from '../components/Button';
import MonthPicker from '../components/MonthPicker';
import Section from '../components/Section';
import { colors } from '../shared/theme';
import AddTransaction from './AddTransaction';
import Stats from './Stats';
import { useAppDispatch } from '../store';
import { toggleRightPanel } from '../store/app/actions';
import { getMediaQuery, useIsTablet } from '../shared/media-query';

const Root = styled.div`
  padding: 64px 16px 32px;
  position: relative;
`;

const Wrapper = styled.div`
  background-color: ${colors.common.white};
  border-radius: 12px;
  padding: 32px 24px;
  height: 100%;
  min-width: 280px;
  display: flex;
  gap: 1rem;
  flex-direction: column;
  justify-content: space-between;
  overflow: auto;

  @media ${getMediaQuery('tablet')} {
    flex-direction: column-reverse;
  }
`;

const CloseButton = styled.button`
  cursor: pointer;
  position: absolute;
  top: 0;
  right: 0;
  padding: 1rem;
  border: none;
  background-color: transparent;

  svg {
    width: 28px;
    height: 28px;
  }
`;

interface Props {
  className?: string;
}

const RightPanel = ({ className }: Props) => {
  const isTablet = useIsTablet();
  const dispatch = useAppDispatch();

  const [month, setMonth] = useState(Date.now());

  const closeRightPanel = () => {
    dispatch(toggleRightPanel({ isOpen: false }));
  };

  return (
    <Root className={className}>
      {isTablet && (
        <CloseButton onClick={closeRightPanel}>
          <CloseIcon />
        </CloseButton>
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
            amount={200000}
            title="Total income"
            changeInPercentage={1}
          />
          <Stats
            expense
            amount={-4258}
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
