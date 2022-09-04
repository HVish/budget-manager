import styled from '@emotion/styled';
import { Route, Routes } from 'react-router-dom';
import Dashboard from '../Dashboard';

import routes from '../shared/routes';
import { colors } from '../shared/theme';
import NavbarComp from './Navbar';

const Root = styled.div`
  display: grid;
  height: 100vh;
  width: 100vw;
  max-width: 1156px;
  background-color: ${colors.primary.bg};
  margin: auto;
  overflow: hidden;
  grid-template-areas: 'navbar body';
  grid-template-columns: auto 1fr;
`;

const Navbar = styled(NavbarComp)`
  grid-area: navbar;
`;

const Body = styled.main`
  grid-area: body;
  display: grid;
  overflow: auto;
`;

const Main = () => {
  return (
    <Root>
      <Navbar />
      <Body>
        <Routes>
          <Route path={routes.dashboard} element={<Dashboard />} />
        </Routes>
      </Body>
    </Root>
  );
};

export default Main;
