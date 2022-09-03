import styled from '@emotion/styled';
import { colors } from '../shared/theme';

const Root = styled.div`
  padding: 64px 28px 32px;
`;

const Wrapper = styled.section`
  background-color: ${colors.common.white};
  border-radius: 12px;
  padding: 32px 24px;
  height: 100%;
`;

const Header = styled.header`
  font-size: 20px;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
`;

interface Props {
  className?: string;
}

const Cards = ({ className }: Props) => {
  return (
    <Root className={className}>
      <Wrapper>
        <Header>Quick actions</Header>
      </Wrapper>
    </Root>
  );
};

export default Cards;
