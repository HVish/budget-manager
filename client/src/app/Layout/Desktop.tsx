import { ReactNode } from 'react';

import { styled } from '@mui/material';

import NavbarComp from '../Navbar';
import RightPanelComp from '../RightPanel';
import AppHeader from '../AppHeader';

const Root = styled('div')(({ theme }) => ({
  display: 'grid',
  gridTemplateAreas: '"nav header right-panel" "nav body right-panel"',
  gridTemplateColumns: '220px 1fr 320px',
  overflow: 'hidden',
  height: '100vh',
  maxWidth: 1156,
  margin: 'auto',
  backgroundColor: theme.palette.background.app,
}));

const Navbar = styled(NavbarComp)(({ theme }) => ({
  gridArea: 'nav',
  minWidth: 'unset',
}));

const Body = styled('main')(({ theme }) => ({
  gridArea: 'body',
  overflow: 'auto',
  padding: theme.spacing(0, 2, 2),
}));

const RightPanel = styled(RightPanelComp)(({ theme }) => ({
  gridArea: 'right-panel',
}));

interface Props {
  children: ReactNode;
}

const DesktopLayout = ({ children }: Props) => {
  return (
    <Root>
      <Navbar />
      <AppHeader />
      <Body>{children}</Body>
      <RightPanel />
    </Root>
  );
};

export default DesktopLayout;
