import { MouseEventHandler } from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';

import { IconButton, styled } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';

const Root = styled('header')(({ theme }) => ({
  display: 'flex',
  padding: theme.spacing(4, 2),
  alignItems: 'center',
  fontWeight: 700,
  fontSize: theme.typography.pxToRem(20),
}));

interface Props {
  className?: string;
  onNavOpen?: MouseEventHandler;
}

const AppHeader = ({ className, onNavOpen }: Props) => {
  return (
    <Routes>
      <Route
        path="/*"
        element={
          <Root className={className}>
            {onNavOpen && (
              <IconButton
                color="inherit"
                edge="start"
                size="large"
                onClick={onNavOpen}
              >
                <MenuIcon />
              </IconButton>
            )}
            <Outlet />
          </Root>
        }
      >
        <Route path="dashboard" element="Dashboard" />
        <Route path="transactions" element="All transactions" />
        <Route path="wallets" element="Wallets" />
      </Route>
    </Routes>
  );
};

export default AppHeader;
