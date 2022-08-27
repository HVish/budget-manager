import { ReactComponent as DashboardIcon } from '../assets/dashboard.svg';
import { ReactComponent as TransactionsIcon } from '../assets/transactions.svg';
import { ReactComponent as WalletIcon } from '../assets/wallet.svg';
import routes from '../shared/routes';
import NavItem from './NavItem';

interface Props {
  className?: string;
}

const Navbar = ({ className }: Props) => {
  return (
    <nav className={className}>
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
    </nav>
  );
};

export default Navbar;
