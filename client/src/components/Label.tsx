import styled from '@emotion/styled';
import { ReactNode } from 'react';

import { colors } from '../shared/theme';

const Root = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  height: 18px;
  width: 56px;

  &.success {
    color: ${colors.success.main};
    background-color: ${colors.success.bg};
  }

  &.error {
    color: ${colors.error.main};
    background-color: ${colors.error.bg};
  }
`;

interface Props {
  children: ReactNode;
  variant: 'success' | 'error';
}

const Label = ({ children, variant }: Props) => {
  return <Root className={variant}>{children}</Root>;
};

export default Label;
