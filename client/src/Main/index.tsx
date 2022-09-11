import styled from '@emotion/styled';
import { useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import Dashboard from '../Dashboard';
import { getMediaQuery } from '../shared/media-query';

import routes from '../shared/routes';
import { colors } from '../shared/theme';
import { selectIsNavOpen } from '../store/app/selectors';
import NavbarComp from './Navbar';

const Root = styled.div`
  display: grid;
  height: 100vh;
  width: 100vw;
  max-width: 1156px;
  background-color: ${colors.primary.bg};
  margin: auto;
  gap: 16px;
  overflow: hidden;
  grid-template-areas: 'navbar body';
  grid-template-columns: auto 1fr;

  @media ${getMediaQuery('medium')} {
    position: relative;
    grid-template-areas: 'body';
    grid-template-columns: 1fr;
  }
`;

const Navbar = styled(NavbarComp)<{ isOpen: boolean }>`
  grid-area: navbar;

  @media ${getMediaQuery('medium')} {
    position: absolute;
    transform: ${props =>
      props.isOpen ? 'translateX(0)' : 'translateX(-100%)'};
    left: 0;
    top: 0;
    bottom: 0;
    background-color: ${colors.common.white};
    z-index: 1000;
    transition: 300ms ease-in;
    min-width: 260px;
  }
`;

const Body = styled.main`
  grid-area: body;
  display: grid;
  overflow: auto;
`;

const Main = () => {
  const isNavOpen = useSelector(selectIsNavOpen);

  return (
    <Root>
      <Navbar isOpen={isNavOpen} />
      <Body>
        <Routes>
          <Route path={routes.dashboard} element={<Dashboard />} />
          <Route path={routes.transactions} element="Transactions" />
          <Route path={routes.wallets} element="Wallets" />
          <Route
            path="*"
            element={<Navigate to={routes.dashboard} replace />}
          />
        </Routes>
      </Body>
    </Root>
  );
};

export default Main;
