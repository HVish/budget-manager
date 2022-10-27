import { useState } from 'react';

import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from '@mui/material';
import { MobileDateTimePicker } from '@mui/x-date-pickers';

import Section from '../components/Section';
import { useAppDispatch } from '../store';
import { addTransaction } from './store/actions';
import { TransactionType } from './types';

const AddTransaction = () => {
  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState(false);

  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [transactionType, setTransactionType] = useState(TransactionType.DEBIT);
  const [date, setDate] = useState<number | null>(Date.now());

  const reset = () => {
    setAmount('');
    setDescription('');
    setTransactionType(TransactionType.DEBIT);
    setDate(Date.now());
  };

  const handleAddTransaction = async () => {
    if (!amount || !description || !date) return;

    try {
      setIsLoading(true);
      await dispatch(
        addTransaction({
          amount:
            transactionType === TransactionType.DEBIT
              ? -parseFloat(amount)
              : parseFloat(amount),
          date,
          description,
        })
      );
      reset();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Section header="Add transaction">
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
            handleAddTransaction();
          }
        }}
      />
      <FormControl>
        <FormLabel>Transaction Type</FormLabel>
        <RadioGroup
          row
          value={transactionType}
          onChange={e => setTransactionType(e.target.value as TransactionType)}
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
        inputFormat="dd MMM, yyyy hh:mm a"
        onChange={(date: Date | null) => setDate(date?.getTime() ?? null)}
        renderInput={params => <TextField {...params} />}
      />
      <Button disabled={isLoading} onClick={handleAddTransaction}>
        {isLoading ? 'Adding...' : 'Add'}
      </Button>
    </Section>
  );
};
export default AddTransaction;
