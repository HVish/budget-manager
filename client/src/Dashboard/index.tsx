import styled from '@emotion/styled';

import { ReactComponent as WalletIcon } from '../assets/wallet.svg';
import { ReactComponent as IncomeIcon } from '../assets/income.svg';
import StatsWidget from './StatsWidget';

const Root = styled.div`
  display: flex;
  gap: 16px;
`;

const Dashboard = () => {
  return (
    <Root>
      <StatsWidget
        icon={<WalletIcon />}
        title="Balance"
        stats="₹ 5,40,000"
        change={{ success: true, value: '0.89%' }}
      />
      <StatsWidget
        icon={<IncomeIcon />}
        title="Income"
        stats="₹ 40,000"
        change={{ success: true, value: '6.25%' }}
      />
    </Root>
  );
};

export default Dashboard;
