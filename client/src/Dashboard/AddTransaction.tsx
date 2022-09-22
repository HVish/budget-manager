import { useState } from 'react';

import Button from '../components/Button';
import Input from '../components/Input';
import Section from '../components/Section';
import { useAppDispatch } from '../store';
import { addTransaction } from '../store/transactions/actions';

const AddTransaction = () => {
  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState(false);

  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');

  const reset = () => {
    setAmount('');
    setDescription('');
  };

  const handleAddTransaction = async () => {
    if (!amount || !description) return;

    try {
      setIsLoading(true);
      await dispatch(
        addTransaction({
          amount: parseFloat(amount),
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
      <Input
        type="number"
        label="Amount"
        value={amount.toString()}
        onChange={setAmount}
      />
      <Input
        multiline
        type="text"
        label="Description"
        value={description}
        onChange={setDescription}
        onEnter={e => {
          if (!e.shiftKey) {
            e.preventDefault();
            handleAddTransaction();
          }
        }}
      />
      <Button disabled={isLoading} onClick={handleAddTransaction}>
        {isLoading ? 'Adding...' : 'Add'}
      </Button>
    </Section>
  );
};
export default AddTransaction;
