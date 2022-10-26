import { ReactNode } from 'react';

import { styled } from '@mui/material';
import { ReactComponent as _MenuIcon } from '../assets/menu.svg';
import { forMobile, useIsMediumDevice } from '../shared/media-query';
import { toggleNav } from '../app/store/actions';
import { useAppDispatch } from '../store';

const Root = styled('header')(({ theme }) => ({
  display: 'flex',
  padding: theme.spacing(4, 0),
  alignItems: 'center',
  fontWeight: theme.typography.fontWeightBold,
  fontSize: theme.typography.pxToRem(24),

  [forMobile(theme)]: {
    padding: theme.spacing(3, 0),
  },
}));

const MenuIcon = styled(_MenuIcon)`
  width: 32px;
  height: 32px;
`;

const MenuButton = styled('button')`
  border: none;
  background-color: transparent;
  margin-right: 1rem;
  margin-left: -0.5rem;
  cursor: pointer;
`;

interface Props {
  className?: string;
  children: ReactNode;
}

const Header = ({ className, children }: Props) => {
  const isMediumDevice = useIsMediumDevice();
  const dispatch = useAppDispatch();

  const openNav = () => dispatch(toggleNav({ isOpen: true }));

  return (
    <Root className={className}>
      {isMediumDevice ? (
        <MenuButton onClick={openNav}>
          <MenuIcon />
        </MenuButton>
      ) : null}
      {children}
    </Root>
  );
};

export default Header;
