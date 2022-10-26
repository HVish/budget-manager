import { useEffect, useState } from 'react';

import {
  Button,
  Drawer as MuiDrawer,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  Radio,
  RadioGroup,
  styled,
  TextField,
  Toolbar,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';

import { TransactionType } from './types';
import { forMobile } from '../shared/media-query';
import { useSelector } from 'react-redux';
import { selectTransaction } from './store/selectors';
import { MobileDateTimePicker } from '@mui/x-date-pickers';

const DRAWER_WIDTH = 360;

const Drawer = styled(MuiDrawer)(({ theme }) => ({
  flexDirection: 'column',

  '& .MuiDrawer-paper': {
    width: DRAWER_WIDTH,
    [forMobile(theme)]: {
      width: '100vw',
    },
  },
}));

const DrawerHeader = styled(Toolbar)(({ theme }) => ({
  display: 'felx',
  justifyContent: 'space-between',
  flexShrink: 0,
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
}));

const EditForm = styled('form')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  padding: theme.spacing(2),
  gap: theme.spacing(2),
  height: '100%',
  overflow: 'auto',
}));

interface Props {
  isOpen: boolean;
  onClose: () => void;
  transactionId: string;
}

const EditTransactionDrawer = ({ isOpen, onClose, transactionId }: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  const transaction = useSelector(selectTransaction(transactionId));

  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [transactionType, setTransactionType] = useState(TransactionType.DEBIT);
  const [date, setDate] = useState<number | null>(Date.now());

  useEffect(
    function initValues() {
      const amount = transaction?.amount ?? 0;

      if (amount) {
        setAmount(Math.abs(amount).toString());
      }

      setDescription(transaction?.description ?? '');

      setTransactionType(
        amount > 0 ? TransactionType.CREDIT : TransactionType.DEBIT
      );

      setDate(transaction?.createdAt ?? Date.now());
    },
    [transaction?.amount, transaction?.createdAt, transaction?.description]
  );

  if (!transaction) return null;

  const updateTransaction = async () => {
    if (!amount || !description) return;

    try {
      setIsLoading(true);
      // TODO: send request to server
      onClose();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Drawer anchor="right" open={isOpen} onBackdropClick={onClose}>
      <DrawerHeader>
        Editing transaction{' '}
        <IconButton edge="end" color="inherit" onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DrawerHeader>
      <EditForm>
        <TextField
          type="number"
          label="Amount"
          value={amount.toString()}
          onChange={e => setAmount(e.target.value)}
        />
        <TextField
          multiline
          type="text"
          minRows={3}
          label="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              updateTransaction();
            }
          }}
        />
        <FormControl>
          <FormLabel>Transaction Type</FormLabel>
          <RadioGroup
            row
            value={transactionType}
            onChange={e =>
              setTransactionType(e.target.value as TransactionType)
            }
          >
            <FormControlLabel
              value={TransactionType.DEBIT}
              control={<Radio />}
              label="Debit"
            />
            <FormControlLabel
              value={TransactionType.CREDIT}
              control={<Radio />}
              label="Credit"
            />
          </RadioGroup>
        </FormControl>
        <MobileDateTimePicker
          hideTabs
          label="Date"
          value={date}
          disableFuture
          inputFormat="dd/MM/yyyy hh:mma"
          onChange={date => setDate(date)}
          renderInput={params => <TextField {...params} />}
        />
        <Button disabled={isLoading} onClick={updateTransaction}>
          {isLoading ? 'Updating...' : 'Update'}
        </Button>
      </EditForm>
    </Drawer>
  );
};

export default EditTransactionDrawer;
