import styled from '@emotion/styled';
import clsx from 'clsx';

import { ReactComponent as ExpenseIcon } from '../assets/arrow-up.svg';
import { ReactComponent as IncomeIcon } from '../assets/arrow-down.svg';

import { colors } from '../shared/theme';
import { formatCurrency } from '../shared/utils';

const Root = styled.div`
  display: grid;
  grid-template-areas: 'icon title change' 'icon amount change';
  grid-template-columns: auto 1fr auto;
  align-items: center;
`;

const Icon = styled.div`
  grid-area: icon;
  width: 44px;
  height: 44px;
  padding: 6px;
  border-radius: 10px;
  margin-right: 16px;
  border: 1px solid;

  svg {
    transform: rotate(45deg);
  }

  .income & {
    color: ${colors.success.main};
    background-color: ${colors.success.bg};
    border-color: ${colors.success.main};
  }

  .expense & {
    color: ${colors.error.main};
    background-color: ${colors.error.bg};
    border-color: ${colors.error.main};
  }
`;

const Title = styled.div`
  grid-area: title;
  font-size: 12px;
  color: ${colors.text.secondary};
`;

const Amount = styled.div`
  grid-area: amount;
  font-size: 16px;
  font-weight: bold;

  .income & {
    color: ${colors.success.main};
  }

  .expense & {
    color: ${colors.error.main};
  }
`;

const Change = styled.div`
  grid-area: change;
  font-size: 11px;
  padding: 2px 8px;
  color: ${colors.text.secondary};
  background-color: ${colors.grey.main};
  border-radius: 100px;
  border: 1px solid ${colors.grey.main};

  &.error {
    color: ${colors.error.main};
    background-color: ${colors.error.bg};
    border-color: ${colors.error.main};
  }

  &.success {
    color: ${colors.success.main};
    background-color: ${colors.success.bg};
    border-color: ${colors.success.main};
  }
`;

interface Props {
  amount: number;
  changeInPercentage: number;
  expense?: boolean;
  income?: boolean;
  title: string;
}

const Stats = ({
  amount,
  changeInPercentage,
  expense = false,
  income = false,
  title,
}: Props) => {
  return (
    <Root className={clsx({ income, expense })}>
      <Icon>{income ? <IncomeIcon /> : <ExpenseIcon />}</Icon>
      <Title>{title}</Title>
      <Amount>₹ {formatCurrency(amount)}</Amount>
      <Change
        className={clsx({
          error:
            (income && changeInPercentage < 0) ||
            (expense && changeInPercentage > 0),
          success:
            (income && changeInPercentage > 0) ||
            (expense && changeInPercentage < 0),
        })}
      >
        {changeInPercentage}%
      </Change>
    </Root>
  );
};

export default Stats;
