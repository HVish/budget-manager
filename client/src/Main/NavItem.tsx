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
  padding: 10px 24px;
  text-decoration: none;
  color: ${colors.grey.dark};
  font-size: 14px;

  &.active {
    color: ${colors.primary.main};
    background-color: ${colors.primary.bg};
  }

  &:hover {
    background-color: ${colors.primary.bg};
  }
`;

const Icon = styled.div`
  width: 24px;
  height: 24px;
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  color: ${colors.grey.dark};
  background-color: ${colors.grey.main};

  .active & {
    color: ${colors.common.white};
    background-color: ${colors.primary.main};
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
