import { ReactNode } from 'react';
import { useSelector } from 'react-redux';

import { Drawer as MuiDrawer, Fab as MuiFab, styled } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';

import { useAppDispatch } from '../../store';
import Navbar from '../Navbar';
import RightPanel from '../RightPanel';
import { toggleNav, toggleRightPanel } from '../store/actions';
import { selectIsNavOpen, selectIsRightPanelOpen } from '../store/selectors';
import AppHeader from '../AppHeader';

const Root = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  flexWrap: 'wrap',
  overflow: 'hidden',
  height: '100vh',
  backgroundColor: theme.palette.background.app,
}));

const Header = styled(AppHeader)(({ theme }) => ({
  flexShrink: 0,
  padding: theme.spacing(2),
}));

const Body = styled('main')(({ theme }) => ({
  flex: 1,
  overflow: 'auto',
  padding: theme.spacing(0, 2, 2),
}));

const Drawer = styled(MuiDrawer)(({ theme }) => ({
  '.MuiDrawer-paper': {
    backgroundColor: theme.palette.background.app,
  },
}));

const Fab = styled(MuiFab)(({ theme }) => ({
  position: 'fixed',
  bottom: theme.spacing(2),
  right: theme.spacing(2),
}));

interface Props {
  children: ReactNode;
}

const MobileLayout = ({ children }: Props) => {
  const dispatch = useAppDispatch();

  const isNavOpen = useSelector(selectIsNavOpen);
  const isRightPanelOpen = useSelector(selectIsRightPanelOpen);

  const openNav = () => dispatch(toggleNav({ isOpen: true }));
  const closeNav = () => dispatch(toggleNav({ isOpen: false }));

  const openRightPanel = () => dispatch(toggleRightPanel({ isOpen: true }));
  const closeRightPanel = () => dispatch(toggleRightPanel({ isOpen: false }));

  return (
    <Root>
      <Drawer open={isNavOpen} anchor="left" onClose={closeNav}>
        <Navbar onClose={closeNav} />
      </Drawer>
      <Header onNavOpen={openNav} />
      <Body>{children}</Body>
      <Fab color="primary" onClick={openRightPanel}>
        <AddIcon />
      </Fab>
      <Drawer open={isRightPanelOpen} anchor="right" onClose={closeRightPanel}>
        <RightPanel onClose={closeRightPanel} />
      </Drawer>
    </Root>
  );
};

export default MobileLayout;
