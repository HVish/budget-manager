import { MouseEventHandler } from 'react';
import { useNavigate } from 'react-router-dom';

import { Close as CloseIcon } from '@mui/icons-material';
import { Button, IconButton, styled } from '@mui/material';

import { ReactComponent as DashboardIcon } from '../assets/dashboard.svg';
import { ReactComponent as TransactionsIcon } from '../assets/transactions.svg';
import { ReactComponent as WalletIcon } from '../assets/wallet.svg';

import routes from '../shared/routes';
import NavItem from './NavItem';
import { useAppDispatch } from '../store';
import { toggleNav } from './store/actions';
import { clearSession, getSession } from '../shared/session';
import { logout } from '../auth/api';

const Root = styled('nav')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(3),
  overflow: 'auto',
  padding: theme.spacing(4, 2),
  minWidth: 250,
  height: '100vh',
}));

const CloseButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(0.5),
  right: theme.spacing(0.5),
}));

const Icon = styled('div')(({ theme }) => ({
  fontSize: theme.typography.pxToRem(32),
  padding: theme.spacing(0, 3),
}));

const Welcome = styled('div')(({ theme }) => ({
  fontSize: theme.typography.pxToRem(20),
  fontWeight: theme.typography.fontWeightBold,
  padding: theme.spacing(1.5, 1.5, 3.75),
}));

const Logout = styled(Button)`
  margin-top: auto;
`;

interface Props {
  className?: string;
  onClose?: MouseEventHandler;
}

const Navbar = ({ className, onClose }: Props) => {
  const navigation = useNavigate();
  const dispatch = useAppDispatch();

  const session = getSession();

  const closeNav = () => dispatch(toggleNav({ isOpen: false }));

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.log(error);
    } finally {
      closeNav();
      clearSession();
      navigation('/auth');
    }
  };

  return (
    <Root className={className}>
      {onClose && (
        <CloseButton size="large" onClick={onClose}>
          <CloseIcon />
        </CloseButton>
      )}
      <Icon>👋</Icon>
      <Welcome>Hi, {session?.name}</Welcome>
      <NavItem
        to={routes.dashboard}
        label="Dashboard"
        icon={<DashboardIcon />}
        onClick={closeNav}
      />
      <NavItem
        to={routes.transactions}
        label="Transactions"
        icon={<TransactionsIcon />}
        onClick={closeNav}
      />
      <NavItem
        to={routes.wallets}
        label="Wallets"
        icon={<WalletIcon />}
        onClick={closeNav}
      />
      <Logout onClick={handleLogout}>Logout</Logout>
    </Root>
  );
};

export default Navbar;
