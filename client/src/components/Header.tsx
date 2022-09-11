import { ReactNode } from 'react';
import styled from '@emotion/styled';

import { ReactComponent as _MenuIcon } from '../assets/menu.svg';
import { getMediaQuery, useIsMediumDevice } from '../shared/media-query';
import { toggleNav } from '../store/app/actions';
import { useAppDispatch } from '../store';

const Root = styled.header`
  display: flex;
  padding: 32px 0;
  align-items: center;
  font-weight: bold;
  font-size: 24px;

  @media ${getMediaQuery('mobile')} {
    padding: 24px 0;
  }
`;

const MenuIcon = styled(_MenuIcon)`
  width: 32px;
  height: 32px;
`;

const MenuButton = styled.button`
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
