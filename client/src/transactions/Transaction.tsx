import { MouseEventHandler, useState } from 'react';
import clsx from 'clsx';
import { IconButton, styled } from '@mui/material';
import { Close as CloseIcon, Edit as EditIcon } from '@mui/icons-material';

import { colors } from '../shared/theme';
import { ReactComponent as ExpenseIcon } from '../assets/arrow-up.svg';
import { ReactComponent as IncomeIcon } from '../assets/arrow-down.svg';
import { formatCurrency, formatUnixTime } from '../shared/utils';
import EditTransactionDrawer from './EditTransactionDrawer';
import { useSelector } from 'react-redux';
import { selectTransaction } from './store/selectors';

const Root = styled('div')(({ theme }) => ({
  display: 'grid',
  gridTemplateAreas: "'icon title amount actions' 'icon date amount actions'",
  gridTemplateColumns: 'auto 1fr auto',
  alignItems: 'center',
  padding: theme.spacing(1.75, 2),
  backgroundColor: theme.palette.common.white,
  boxShadow: '0px 0px 14px 0px rgb(0 0 0 / 5%)',
  borderRadius: 6,
}));

const Icon = styled('div')`
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

const Title = styled('div')(({ theme }) => ({
  gridArea: 'title',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  fontWeight: theme.typography.fontWeightBold,
}));

const DateAndTime = styled('div')(({ theme }) => ({
  gridArea: 'date',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  fontSize: theme.typography.pxToRem(12),
  fontWeight: theme.typography.fontWeightBold,
  color: theme.palette.text.secondary,
}));

const Amount = styled('div')(({ theme }) => ({
  gridArea: 'amount',
  fontSize: theme.typography.pxToRem(18),
  fontWeight: theme.typography.fontWeightBold,

  '.income &': {
    color: theme.palette.success.main,
  },

  '.expense &': {
    color: theme.palette.error.main,
  },
}));

const Actions = styled('div')(({ theme }) => ({
  gridArea: 'actions',
  marginLeft: theme.spacing(1),
  display: 'flex',
  alignItems: 'center',
  marginRight: theme.spacing(-1.5),
}));

interface Props {
  onDelete?: MouseEventHandler;
  onEdit?: MouseEventHandler;
  transactionId: string;
}

const Transaction = ({ onDelete, onEdit, transactionId }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const transaction = useSelector(selectTransaction(transactionId));

  if (!transaction) return null;

  const { amount, description, createdAt } = transaction;

  const isIncome = amount > 0;

  const handleEdit = () => {
    setIsEditing(true);
  };

  return (
    <Root className={clsx({ income: isIncome, expense: !isIncome })}>
      <Icon>{isIncome ? <IncomeIcon /> : <ExpenseIcon />}</Icon>
      <Title>{description}</Title>
      <DateAndTime>{formatUnixTime(createdAt)}</DateAndTime>
      <Amount>₹ {formatCurrency(amount)}</Amount>
      <Actions>
        <IconButton onClick={handleEdit}>
          <EditIcon />
        </IconButton>
        <IconButton color="error" onClick={onDelete}>
          <CloseIcon />
        </IconButton>
      </Actions>
      <EditTransactionDrawer
        isOpen={isEditing}
        onClose={() => setIsEditing(false)}
        transactionId={transactionId}
      />
    </Root>
  );
};

export default Transaction;
