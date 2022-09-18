import styled from '@emotion/styled';
import { useSelector } from 'react-redux';

import { ReactComponent as _MenuOpenIcon } from '../assets/menu-open.svg';
import { ReactComponent as DashboardIcon } from '../assets/dashboard.svg';
import { ReactComponent as TransactionsIcon } from '../assets/transactions.svg';
import { ReactComponent as WalletIcon } from '../assets/wallet.svg';

import routes from '../shared/routes';
import { selectIsNavOpen } from '../store/app/selectors';
import NavItem from './NavItem';
import { useIsMediumDevice } from '../shared/media-query';
import { useAppDispatch } from '../store';
import { toggleNav } from '../store/app/actions';
import Button from '../components/Button';
import { clearSession } from '../shared/session';
import { useNavigate } from 'react-router-dom';

const Root = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 12px;
  overflow: auto;
  padding: 32px 16px;
`;

const MenuOpenIcon = styled(_MenuOpenIcon)`
  width: 40px;
  height: 40px;
`;

const CloseNavButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  padding: 1rem;
  border: none;
  background-color: transparent;
`;

const Icon = styled.div`
  font-size: 32px;
  padding: 0 12px;
`;

const Welcome = styled.div`
  font-size: 20px;
  font-weight: bold;
  padding: 12px 12px 30px;
`;

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
