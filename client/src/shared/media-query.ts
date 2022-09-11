import useMediaQuery from './hooks';

export const MOBILE_WIDTH = 480;

export function useIsMobile() {
  const isMatch = useMediaQuery('screen and (max-width: 480px)');
  return isMatch;
}
