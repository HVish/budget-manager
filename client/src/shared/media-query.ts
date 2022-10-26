import { Theme } from '@mui/material';
import { useMediaQuery } from './hooks';

export const MOBILE_WIDTH = 480;
export const TABLET_WIDTH = 768;
export const MEDIUM_DEVICE_WIDTH = 992;

export function getMediaQuery(device: 'mobile' | 'tablet' | 'medium') {
  switch (device) {
    case 'mobile':
      return `only screen and (max-width: ${MOBILE_WIDTH}px)`;
    case 'tablet':
      return `only screen and (max-width: ${TABLET_WIDTH}px)`;
    case 'medium':
      return `only screen and (max-width: ${MEDIUM_DEVICE_WIDTH}px)`;
  }
}

export function useIsMobile() {
  const isMatch = useMediaQuery(getMediaQuery('mobile'));
  return isMatch;
}

export function useIsTablet() {
  const isMatch = useMediaQuery(getMediaQuery('tablet'));
  return isMatch;
}

export function useIsMediumDevice() {
  const isMatch = useMediaQuery(getMediaQuery('medium'));
  return isMatch;
}

export function forMobile(theme: Theme) {
  return theme.breakpoints.down('sm');
}

export function forTablet(theme: Theme) {
  return theme.breakpoints.down('md');
}
