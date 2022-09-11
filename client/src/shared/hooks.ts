import { useEffect, useState } from 'react';

export default function useMediaQuery(queryString: string) {
  const [isMatch, setIsMatch] = useState(false);

  function mqChange(e: MediaQueryListEvent) {
    setIsMatch(e.matches);
  }

  useEffect(() => {
    const mq = window.matchMedia(queryString);

    mq.addEventListener('change', mqChange);
    setIsMatch(mq.matches);

    return () => {
      mq.removeEventListener('change', mqChange);
    };
  }, [queryString]);

  return isMatch;
}
