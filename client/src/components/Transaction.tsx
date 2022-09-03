import clsx from 'clsx';
import styled from '@emotion/styled';

import { colors } from '../shared/theme';
import { ReactComponent as ExpenseIcon } from '../assets/arrow-up.svg';
import { ReactComponent as IncomeIcon } from '../assets/arrow-down.svg';
import { formatCurrency, formatUnixTime } from '../shared/utils';

const Root = styled.div`
  display: grid;
  grid-template-areas: 'icon title amount' 'icon date amount';
  grid-template-columns: auto 1fr auto;
  align-items: center;
`;

const Icon = styled.div`
  grid-area: icon;
  width: 48px;
  height: 48px;
  padding: 8px;
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
  font-weight: 500;
`;

const DateAndTime = styled.div`
  grid-area: date;
  font-size: 12px;
  color: ${colors.text.secondary};
`;

const Amount = styled.div`
  grid-area: amount;
  font-size: 18px;
  font-weight: 500;

  .income & {
    color: ${colors.success.main};
  }

  .expense & {
    color: ${colors.error.main};
  }
`;

interface Props {
  amount: number;
  /** Unix timestamp in milliseconds */
  date: number;
  title: string;
}

const Transaction = ({ amount, date, title }: Props) => {
  const isIncome = amount > 0;

  return (
    <Root className={clsx({ income: isIncome, expense: !isIncome })}>
      <Icon>{isIncome ? <IncomeIcon /> : <ExpenseIcon />}</Icon>
      <Title>{title}</Title>
      <DateAndTime>{formatUnixTime(date)}</DateAndTime>
      <Amount>₹ {formatCurrency(amount)}</Amount>
    </Root>
  );
};

export default Transaction;
