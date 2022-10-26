import styled from '@emotion/styled';
import clsx from 'clsx';
import { MouseEventHandler, ReactNode } from 'react';
import { NavLink as NavLinkComp } from 'react-router-dom';

import { colors } from '../shared/theme';

const NavLink = styled(NavLinkComp)`
  text-decoration: none;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 12px 16px;
  text-decoration: none;
  color: ${colors.primary.main};
  font-size: 14px;
  border-radius: 12px;
  min-width: 166px;
  letter-spacing: 1.2;

  &:hover {
    background-color: ${colors.common.white};
  }

  &.active {
    color: ${colors.common.white};
    background-color: ${colors.primary.main};
  }
`;

const Icon = styled.div`
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${colors.primary.main};

  .active & {
    color: ${colors.common.white};
  }
`;

interface Props {
  className?: string;
  icon: ReactNode;
  label: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  to: string;
}

const NavItem = ({ className, icon, label, onClick, to }: Props) => {
  return (
    <NavLink to={to} onClick={onClick}>
      {({ isActive }) => (
        <Wrapper className={clsx(className, isActive ? 'active' : undefined)}>
          <Icon>{icon}</Icon>
          <span>{label}</span>
        </Wrapper>
      )}
    </NavLink>
  );
};

export default NavItem;
