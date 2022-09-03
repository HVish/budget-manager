import { MouseEventHandler, ReactNode } from 'react';
import styled from '@emotion/styled';
import { colors } from '../shared/theme';

const Root = styled.button`
  cursor: pointer;
  padding: 10px;
  min-width: 96px;
  background-color: ${colors.primary.main};
  color: ${colors.common.white};
  text-align: center;
  border: none;
  border-radius: 10px;
  font-size: 12px;

  &:disabled {
    cursor: default;
  }
`;

interface Props {
  className?: string;
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const Button = ({ className, children, onClick }: Props) => {
  return (
    <Root className={className} onClick={onClick}>
      {children}
    </Root>
  );
};

export default Button;
