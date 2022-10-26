import { useSelector } from 'react-redux';

import { ReactComponent as _MenuOpenIcon } from '../assets/menu-open.svg';
import { ReactComponent as DashboardIcon } from '../assets/dashboard.svg';
import { ReactComponent as TransactionsIcon } from '../assets/transactions.svg';
import { ReactComponent as WalletIcon } from '../assets/wallet.svg';

import routes from '../shared/routes';
import { selectIsNavOpen } from './store/selectors';
import NavItem from './NavItem';
import { useIsMediumDevice } from '../shared/media-query';
import { useAppDispatch } from '../store';
import { toggleNav } from './store/actions';
import { clearSession } from '../shared/session';
import { useNavigate } from 'react-router-dom';
import { Button, styled } from '@mui/material';

const Root = styled('nav')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(3),
  overflow: 'auto',
  padding: theme.spacing(4, 2),
}));

const MenuOpenIcon = styled(_MenuOpenIcon)`
  width: 40px;
  height: 40px;
`;

const CloseNavButton = styled('button')(({ theme }) => ({
  position: 'absolute',
  top: 0,
  right: 0,
  padding: theme.spacing(2),
  border: 'none',
  backgroundColor: 'transparent',
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
}

const Navbar = ({ className }: Props) => {
  const navigation = useNavigate();
  const dispatch = useAppDispatch();

  const isMediumDevice = useIsMediumDevice();
  const isNavOpen = useSelector(selectIsNavOpen);

  const closeNav = () => dispatch(toggleNav({ isOpen: false }));

  const handleLogout = () => {
    closeNav();
    clearSession();
    navigation('/auth');
  };

  return (
    <Root className={className}>
      {isNavOpen && isMediumDevice && (
        <CloseNavButton>
          <MenuOpenIcon onClick={closeNav} />
        </CloseNavButton>
      )}
      <Icon>👋</Icon>
      <Welcome>Hi, Sakshee</Welcome>
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
