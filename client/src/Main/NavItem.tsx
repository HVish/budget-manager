import styled from '@emotion/styled';
import clsx from 'clsx';
import { ReactNode } from 'react';
import { NavLink as NavLinkComp } from 'react-router-dom';

import { colors } from '../shared/theme';

const NavLink = styled(NavLinkComp)`
  text-decoration: none;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px 20px;
  text-decoration: none;
  color: ${colors.primary.main};
  font-size: 16px;
  border-radius: 16px;

  &:hover {
    background-color: ${colors.common.white};
  }

  &.active {
    color: ${colors.common.white};
    background-color: ${colors.primary.main};
  }
`;

const Icon = styled.div`
  width: 24px;
  height: 24px;
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
  to: string;
}

const NavItem = ({ className, icon, label, to }: Props) => {
  return (
    <NavLink to={to}>
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
