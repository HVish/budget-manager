import { ReactNode } from 'react';
import styled from '@emotion/styled';

import { ReactComponent as _MenuIcon } from '../assets/menu.svg';
import { MOBILE_WIDTH, useIsMobile } from '../shared/media-query';
import { toggleNav } from '../store/app/actions';
import { useAppDispatch } from '../store';

const Root = styled.header`
  display: flex;
  padding: 32px 0;
  align-items: center;
  font-weight: bold;
  font-size: 24px;

  @media only screen and (max-width: ${MOBILE_WIDTH}px) {
    padding: 24px 0;
  }
`;

const MenuIcon = styled(_MenuIcon)`
  width: 32px;
  height: 32px;
  margin-right: 1rem;
  margin-left: -0.5rem;
`;

interface Props {
  className?: string;
  children: ReactNode;
}

const Header = ({ className, children }: Props) => {
  const isMobile = useIsMobile();
  const dispatch = useAppDispatch();

  const openNav = () => dispatch(toggleNav({ isOpen: true }));

  return (
    <Root className={className}>
      {isMobile ? <MenuIcon onClick={openNav} /> : null}
      {children}
    </Root>
  );
};

export default Header;
