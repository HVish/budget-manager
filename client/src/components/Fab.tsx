import styled from '@emotion/styled';
import { MouseEventHandler, ReactNode } from 'react';
import { colors } from '../shared/theme';

const Root = styled.button`
  cursor: pointer;
  position: fixed;
  right: 16px;
  bottom: 16px;
  border: none;
  width: 56px;
  height: 56px;
  border-radius: 16px;
  color: ${colors.primary.bg};
  background-color: ${colors.primary.main};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Icon = styled.div`
  width: 24px;
  height: 24px;
`;

interface Props {
  children: ReactNode;
  onClick?: MouseEventHandler;
}

const Fab = ({ children, onClick }: Props) => {
  return (
    <Root onClick={onClick}>
      <Icon>{children}</Icon>
    </Root>
  );
};

export default Fab;
