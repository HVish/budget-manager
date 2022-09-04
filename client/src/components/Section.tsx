import styled from '@emotion/styled';
import { ReactNode } from 'react';

const Header = styled.header`
  font-size: 20px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

interface Props {
  className?: string;
  header: ReactNode;
  children: ReactNode;
}

const Section = ({ className, header, children }: Props) => {
  return (
    <section className={className}>
      <Header>{header}</Header>
      <Body>{children}</Body>
    </section>
  );
};

export default Section;
