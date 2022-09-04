import styled from '@emotion/styled';
import Button from '../components/Button';
import Section from '../components/Section';
import Transaction from '../components/Transaction';

const Root = styled.section`
  border-radius: 4px;
`;

interface Props {
  className?: string;
}

const Transactions = ({ className }: Props) => {
  return (
    <Root className={className}>
      <Section
        header={
          <>
            <span>Transactions</span>
            <Button>View All</Button>
          </>
        }
      >
        <Transaction
          amount={-137}
          date={Date.now()}
          title="Milk and vegetables"
        />
        <Transaction amount={200000} date={Date.now()} title="Salary" />
      </Section>
    </Root>
  );
};

export default Transactions;
