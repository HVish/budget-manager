import styled from '@emotion/styled';
import { ReactNode } from 'react';
import { createPortal } from 'react-dom';

const Root = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.25);
`;

interface Props {
  className?: string;
  isOpen: boolean;
  children: ReactNode;
}

const Model = ({ className, isOpen, children }: Props) => {
  if (!isOpen) return null;

  return createPortal(
    <Root className={className}>{children}</Root>,
    document.getElementById('root')!
  );
};

export default Model;
