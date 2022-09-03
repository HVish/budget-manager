import styled from '@emotion/styled';
import Button from '../components/Button';
import Transaction from '../components/Transaction';

const Root = styled.section`
  border-radius: 4px;
`;

const Header = styled.header`
  font-size: 20px;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

interface Props {
  className?: string;
}

const Transactions = ({ className }: Props) => {
  return (
    <Root className={className}>
      <Header>
        <span>Transactions</span>
        <Button>View All</Button>
      </Header>
      <Body>
        <Transaction
          amount={-137}
          date={Date.now()}
          title="Milk and vegetables"
        />
        <Transaction amount={200000} date={Date.now()} title="Salary" />
      </Body>
    </Root>
  );
};

export default Transactions;
