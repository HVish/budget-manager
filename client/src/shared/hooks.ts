import { ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';

export function useMediaQuery(queryString: string) {
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

export const usePortal = (container: HTMLElement) => {
  const portal = useRef({
    render: (props: { children: ReactNode }): JSX.Element | null => null,
    remove: (): boolean | null => null,
  });

  const createPortal = useCallback((el: HTMLElement) => {
    const Portal = ({ children }: { children: ReactNode }) => {
      return ReactDOM.createPortal(children, el);
    };

    const remove = () => ReactDOM.unmountComponentAtNode(el);

    return { render: Portal, remove };
  }, []);

  useEffect(() => {
    const currentPortal = createPortal(container);
    portal.current = currentPortal;
    return () => {
      currentPortal.remove();
    };
  }, [createPortal, container, portal]);

  return portal.current.render;
};
