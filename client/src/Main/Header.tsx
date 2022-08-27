import { Route, Routes } from 'react-router-dom';
import routes from '../shared/routes';

interface Props {
  className?: string;
}

const Header = ({ className }: Props) => {
  return (
    <header className={className}>
      <Routes>
        <Route path={routes.dashboard} element="Dashboard" />
        <Route path={routes.transactions} element="Transactions" />
        <Route path={routes.wallets} element="Wallets" />
      </Routes>
    </header>
  );
};

export default Header;
