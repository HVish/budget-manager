import { ReactNode } from 'react';
import styled from '@emotion/styled';

const Root = styled.header`
  display: flex;
  padding: 32px 0;
  align-items: center;
  font-weight: bold;
  font-size: 24px;
`;

interface Props {
  className?: string;
  children: ReactNode;
}

const Header = ({ className, children }: Props) => {
  return <Root className={className}>{children}</Root>;
};

export default Header;
