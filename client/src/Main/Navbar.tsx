import styled from '@emotion/styled';
import { useSelector } from 'react-redux';

import { ReactComponent as _MenuOpenIcon } from '../assets/menu-open.svg';
import { ReactComponent as DashboardIcon } from '../assets/dashboard.svg';
import { ReactComponent as TransactionsIcon } from '../assets/transactions.svg';
import { ReactComponent as WalletIcon } from '../assets/wallet.svg';

import routes from '../shared/routes';
import { selectIsNavOpen } from '../store/app/selectors';
import NavItem from './NavItem';
import { useIsMobile } from '../shared/media-query';
import { useAppDispatch } from '../store';
import { toggleNav } from '../store/app/actions';

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

interface Props {
  className?: string;
}

const Navbar = ({ className }: Props) => {
  const dispatch = useAppDispatch();

  const isMobile = useIsMobile();
  const isNavOpen = useSelector(selectIsNavOpen);

  const closeNav = () => dispatch(toggleNav({ isOpen: false }));

  return (
    <Root className={className}>
      {isNavOpen && isMobile ? (
        <CloseNavButton>
          <MenuOpenIcon onClick={closeNav} />
        </CloseNavButton>
      ) : null}
      <Icon>👋</Icon>
      <Welcome>Hi, Sakshee</Welcome>
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
