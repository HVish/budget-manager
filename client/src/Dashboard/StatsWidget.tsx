import styled from '@emotion/styled';
import { ReactNode } from 'react';

import Label from '../components/Label';
import { colors } from '../shared/theme';

const Root = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  background-color: ${colors.common.white};
  border-radius: 4px;
  padding: 18px;
`;

const Icon = styled.div`
  width: 48px;
  height: 48px;
  padding: 12px;
  border-radius: 12px;
  color: ${colors.primary.main};
  background-color: ${colors.primary.bg};
`;

const Title = styled.div`
  font-size: 16px;
  color: ${colors.grey.dark};
`;

const StatsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  font-size: 24px;
  font-weight: bold;
  color: ${colors.text.primary};
`;

const Stats = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

interface Props {
  change: { success: boolean; value: string | number };
  children?: ReactNode;
  className?: string;
  icon: ReactNode;
  stats: ReactNode;
  title: string;
}

const StatsWidget = ({
  change,
  children,
  className,
  icon,
  stats,
  title,
}: Props) => {
  return (
    <Root className={className}>
      <Icon>{icon}</Icon>
      <Title>{title}</Title>
      <StatsWrapper>
        <Stats>{stats}</Stats>
        <Label variant={change.success ? 'success' : 'error'}>
          {change.value}
        </Label>
      </StatsWrapper>
      {children}
    </Root>
  );
};

export default StatsWidget;
