import { ReactNode } from 'react';
import { useSelector } from 'react-redux';

import { Drawer as MuiDrawer, styled } from '@mui/material';

import { useAppDispatch } from '../../store';
import Navbar from '../Navbar';
import RightPanelComp from '../RightPanel';
import { toggleNav } from '../store/actions';
import { selectIsNavOpen } from '../store/selectors';
import AppHeader from '../AppHeader';

const Root = styled('div')(({ theme }) => ({
  display: 'grid',
  gridTemplateAreas: '"header right-panel" "body right-panel"',
  gridTemplateColumns: '1fr 320px',
  gridTemplateRows: '64px 1fr',
  overflow: 'hidden',
  height: '100vh',
  backgroundColor: theme.palette.background.app,
}));

const Header = styled(AppHeader)(({ theme }) => ({
  gridArea: 'header',
  padding: theme.spacing(2),
}));

const Body = styled('main')(({ theme }) => ({
  gridArea: 'body',
  overflow: 'auto',
  padding: theme.spacing(0, 2, 2),
}));

const Drawer = styled(MuiDrawer)(({ theme }) => ({
  '.MuiDrawer-paper': {
    backgroundColor: theme.palette.background.app,
  },
}));

const RightPanel = styled(RightPanelComp)(({ theme }) => ({
  gridArea: 'right-panel',
}));

interface Props {
  children: ReactNode;
}

const TabletLayout = ({ children }: Props) => {
  const dispatch = useAppDispatch();

  const isNavOpen = useSelector(selectIsNavOpen);

  const openNav = () => dispatch(toggleNav({ isOpen: true }));
  const closeNav = () => dispatch(toggleNav({ isOpen: false }));

  return (
    <Root>
      <Drawer open={isNavOpen} anchor="left" onClose={closeNav}>
        <Navbar onClose={closeNav} />
      </Drawer>
      <Header onNavOpen={openNav} />
      <Body>{children}</Body>
      <RightPanel />
    </Root>
  );
};

export default TabletLayout;
