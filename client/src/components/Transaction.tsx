import clsx from 'clsx';
import styled from '@emotion/styled';

import { colors } from '../shared/theme';
import { ReactComponent as EditIcon } from '../assets/edit.svg';
import { ReactComponent as CloseIcon } from '../assets/close.svg';
import { ReactComponent as ExpenseIcon } from '../assets/arrow-up.svg';
import { ReactComponent as IncomeIcon } from '../assets/arrow-down.svg';
import { formatCurrency, formatUnixTime } from '../shared/utils';
import { MouseEventHandler } from 'react';

const Root = styled.div`
  display: grid;
  grid-template-areas: 'icon title amount actions' 'icon date amount actions';
  grid-template-columns: auto 1fr auto;
  align-items: center;
  background-color: ${colors.common.white};
  padding: 0.875rem 1rem;
  border-radius: 6px;
  box-shadow: 0px 0px 14px 0px rgb(0 0 0 / 5%);
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
  font-weight: bold;
`;

const DateAndTime = styled.div`
  grid-area: date;
  font-size: 12px;
  color: ${colors.text.secondary};
`;

const Amount = styled.div`
  grid-area: amount;
  font-size: 18px;
  font-weight: bold;

  .income & {
    color: ${colors.success.main};
  }

  .expense & {
    color: ${colors.error.main};
  }
`;

const IconButton = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;

  &:hover {
    background-color: ${colors.primary.bg};
  }

  &.red {
    color: ${colors.error.main};
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;

const Actions = styled.div`
  grid-area: actions;
  margin-left: 8px;
  display: flex;
  align-items: center;
  margin-right: -12px;
`;

interface Props {
  amount: number;
  /** Unix timestamp in milliseconds */
  date: number;
  title: string;
  onEdit?: MouseEventHandler;
  onDelete?: MouseEventHandler;
}

const Transaction = ({ amount, date, onEdit, onDelete, title }: Props) => {
  const isIncome = amount > 0;

  return (
    <Root className={clsx({ income: isIncome, expense: !isIncome })}>
      <Icon>{isIncome ? <IncomeIcon /> : <ExpenseIcon />}</Icon>
      <Title>{title}</Title>
      <DateAndTime>{formatUnixTime(date)}</DateAndTime>
      <Amount>₹ {formatCurrency(amount)}</Amount>
      <Actions>
        <IconButton onClick={onEdit}>
          <EditIcon />
        </IconButton>
        <IconButton className="red" onClick={onDelete}>
          <CloseIcon />
        </IconButton>
      </Actions>
    </Root>
  );
};

export default Transaction;
