import { Drawer } from '@mui/material';
import { useSelector } from 'react-redux';
import { Outlet, Route, Routes } from 'react-router-dom';
import { useAppDispatch } from '../store';
import { toggleRightPanel } from './store/actions';
import { selectIsRightPanelOpen } from './store/selectors';

const RightPanel = () => {
  const dispatch = useAppDispatch();
  const isOpen = useSelector(selectIsRightPanelOpen);

  const handleClose = () => dispatch(toggleRightPanel({ isOpen: false }));

  return (
    <Routes>
      <Route
        path="app/*"
        element={
          <Drawer anchor="right" open={isOpen} onBackdropClick={handleClose}>
            <Outlet />
          </Drawer>
        }
      >
        {/* TODO: add right panel content */}
      </Route>
    </Routes>
  );
};

export default RightPanel;
