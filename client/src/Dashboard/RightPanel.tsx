import styled from '@emotion/styled';
import { useState } from 'react';
import MonthPicker from '../components/MonthPicker';
import Section from '../components/Section';
import { colors } from '../shared/theme';

const Root = styled.div`
  padding: 64px 28px 32px;
`;

const Wrapper = styled.div`
  background-color: ${colors.common.white};
  border-radius: 12px;
  padding: 32px 24px;
  height: 100%;
  min-width: 280px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

interface Props {
  className?: string;
}

const RightPanel = ({ className }: Props) => {
  const [month, setMonth] = useState(Date.now());

  return (
    <Root className={className}>
      <Wrapper>
        <Section header="Quick actions">Quick actions</Section>
        <Section
          header={
            <>
              <span>Statistics</span>
              <MonthPicker onChange={setMonth} value={month} />
            </>
          }
        >
          Statistics
        </Section>
      </Wrapper>
    </Root>
  );
};

export default RightPanel;
