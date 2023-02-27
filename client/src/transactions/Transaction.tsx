import { useState } from 'react';
import clsx from 'clsx';
import {
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  styled,
  Typography,
} from '@mui/material';
import { Close as CloseIcon, Edit as EditIcon } from '@mui/icons-material';

import { colors } from '../shared/theme';
import { ReactComponent as ExpenseIcon } from '../assets/arrow-up.svg';
import { ReactComponent as IncomeIcon } from '../assets/arrow-down.svg';
import { formatCurrency, formatUnixTime } from '../shared/utils';
import { useSelector } from 'react-redux';
import { selectTransaction } from './store/selectors';
import { useAppDispatch } from '../store';
import { deleteTransaction } from './store/actions';
import { selectTagsById } from '../tags/store/selectors';

const Root = styled('div')(({ theme }) => ({
  display: 'grid',
  gridTemplateAreas: "'icon date amount actions' 'icon details amount actions'",
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

const Details = styled('div')(({ theme }) => ({
  gridArea: 'details',
  display: 'flex',
  gap: theme.spacing(1),
  flexWrap: 'wrap',
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
  onEdit: () => void;
  transactionId: string;
}

const Transaction = ({ onEdit, transactionId }: Props) => {
  const dispatch = useAppDispatch();

  const [isDeleting, setIsDeleting] = useState(false);
  const [isConfirmDeleteAlertOpen, setIsConfirmDeleteAlertOpen] =
    useState(false);

  const tagsById = useSelector(selectTagsById);
  const transaction = useSelector(selectTransaction(transactionId));

  if (!transaction) return null;

  const { amount, createdAt } = transaction;

  const isIncome = amount > 0;

  const openConfirmDeleteAlert = () => setIsConfirmDeleteAlertOpen(true);
  const closeConfirmDeleteAlert = () => setIsConfirmDeleteAlertOpen(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    await dispatch(deleteTransaction({ transactionId }));
    setIsDeleting(false);
    closeConfirmDeleteAlert();
  };

  return (
    <Root className={clsx({ income: isIncome, expense: !isIncome })}>
      <Icon>{isIncome ? <IncomeIcon /> : <ExpenseIcon />}</Icon>
      <DateAndTime>{formatUnixTime(createdAt)}</DateAndTime>
      <Details>
        {transaction.tags.length ? (
          transaction.tags.map(tagId => {
            const tag = tagsById[tagId];
            if (!tag) return null;
            return <Chip key={tagId} label={tag.name} size="small" />;
          })
        ) : (
          <Typography variant="body2">{transaction.description}</Typography>
        )}
      </Details>
      <Amount>₹ {formatCurrency(amount)}</Amount>
      <Actions>
        <IconButton onClick={onEdit}>
          <EditIcon />
        </IconButton>
        <IconButton color="error" onClick={openConfirmDeleteAlert}>
          <CloseIcon />
        </IconButton>
      </Actions>
      <Dialog
        open={isConfirmDeleteAlertOpen}
        maxWidth="sm"
        onClose={closeConfirmDeleteAlert}
      >
        <DialogTitle>Delete transaction?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Would you like to delete the transaction with amount:{' '}
            {transaction.amount}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeConfirmDeleteAlert}>No</Button>
          <Button disabled={isDeleting} color="error" onClick={handleDelete}>
            {isDeleting ? 'Deleting...' : 'Yes, Delete it'}
          </Button>
        </DialogActions>
      </Dialog>
    </Root>
  );
};

export default Transaction;
