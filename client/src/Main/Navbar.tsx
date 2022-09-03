import styled from '@emotion/styled';
import { ReactComponent as DashboardIcon } from '../assets/dashboard.svg';
import { ReactComponent as TransactionsIcon } from '../assets/transactions.svg';
import { ReactComponent as WalletIcon } from '../assets/wallet.svg';
import routes from '../shared/routes';
import NavItem from './NavItem';

const Root = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 12px;
  overflow: auto;
  padding: 32px 20px;
`;

const Icon = styled.div`
  font-size: 32px;
  padding: 0 12px;
`;

const Welcome = styled.div`
  font-size: 20px;
  padding: 8px 12px 24px;
`;

interface Props {
  className?: string;
}

const Navbar = ({ className }: Props) => {
  return (
    <Root className={className}>
      <Icon>👋</Icon>
      <Welcome>Hi, Vishnu</Welcome>
      <NavItem
        to={routes.dashboard}
        label="Dashboard"
        icon={<DashboardIcon />}
      />
      <NavItem
        to={routes.transactions}
        label="Transactions"
        icon={<TransactionsIcon />}
      />
      <NavItem to={routes.wallets} label="Wallets" icon={<WalletIcon />} />
    </Root>
  );
};

export default Navbar;
