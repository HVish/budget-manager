import { MouseEventHandler, ReactNode } from 'react';
import styled from '@emotion/styled';
import { colors } from '../shared/theme';

const Root = styled.button`
  cursor: pointer;
  padding: 0 24px;
  min-width: 96px;
  min-height: 40px;
  border-radius: 100px;
  background-color: ${colors.primary.main};
  color: ${colors.common.white};
  text-align: center;
  border: none;
  font-size: 12px;

  &:disabled {
    cursor: default;
    opacity: 0.38;
  }
`;

interface Props {
  className?: string;
  children: ReactNode;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const Button = ({ className, children, disabled, onClick }: Props) => {
  return (
    <Root className={className} disabled={disabled} onClick={onClick}>
      {children}
    </Root>
  );
};

export default Button;
