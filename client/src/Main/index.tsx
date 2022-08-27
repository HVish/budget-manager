import styled from '@emotion/styled';
import { Route, Routes } from 'react-router-dom';

import routes from '../shared/routes';
import { colors } from '../shared/theme';
import HeaderComp from './Header';
import NavbarComp from './Navbar';

const Root = styled.div`
  display: grid;
  height: 100vh;
  width: 100vw;
  max-width: 1108px;
  margin: auto;
  overflow: hidden;
  grid-template-areas: 'logo header' 'navbar body';
  grid-template-columns: 188px 1fr;
  grid-template-rows: 88px 1fr;
`;

const Header = styled(HeaderComp)`
  grid-area: header;
  padding: 0 32px;
  display: flex;
  align-items: center;
  font-weight: bold;
  font-size: 20px;
  background-color: ${colors.common.white};
`;

const Logo = styled.div`
  grid-area: logo;
  font-weight: bold;
  color: ${colors.primary.main};
  background-color: ${colors.common.white};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
`;

const Navbar = styled(NavbarComp)`
  grid-area: navbar;
  display: flex;
  flex-direction: column;
  gap: 12px;
  overflow: auto;
  padding: 28px 0;
  background-color: ${colors.common.white};
`;

const Body = styled.main`
  grid-area: body;
  display: grid;
  overflow: auto;
  padding: 28px 32px;
  background-color: ${colors.common.bg};
`;

const Main = () => {
  return (
    <Root>
      <Logo>My Finances</Logo>
      <Navbar />
      <Header />
      <Body>
        <Routes>
          <Route path={routes.dashboard} element="Dashboard content" />
        </Routes>
      </Body>
    </Root>
  );
};

export default Main;
