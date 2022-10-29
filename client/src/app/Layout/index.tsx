import { Outlet } from 'react-router-dom';

import { useMediaQuery } from '@mui/material';

import { forMobile, forTablet } from '../../shared/media-query';
import DesktopLayout from './Desktop';
import MobileLayout from './Mobile';
import TabletLayout from './Tablet';

const Layout = () => {
  const isMobile = useMediaQuery(forMobile);
  const isTablet = useMediaQuery(forTablet);

  if (isMobile) {
    return (
      <MobileLayout>
        <Outlet />
      </MobileLayout>
    );
  }

  if (isTablet) {
    return (
      <TabletLayout>
        <Outlet />
      </TabletLayout>
    );
  }

  return (
    <DesktopLayout>
      <Outlet />
    </DesktopLayout>
  );
};

export default Layout;
