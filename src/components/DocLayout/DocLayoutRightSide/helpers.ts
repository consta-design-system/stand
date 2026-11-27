import { useMutableRef } from '@consta/uikit/useMutableRef';
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';

type State = {
  position: 'absolute' | 'fixedDown' | 'fixedUp';
  top: number;
  direction: 'up' | 'down';
};

const headerHeight = 0;

export const useScroll = (isActive: boolean) => {
  const [state, setState] = useState<State>({
    position: 'fixedUp',
    top: 0,
    direction: 'up',
  });
  const [height, setHeight] = useState<number>(0);
  const ref = useRef<HTMLDivElement>(null);
  const refHeight = useMutableRef<number>(height);
  const refScroll = useRef<number>(0);
  const refState = useMutableRef(state);

  useLayoutEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      setHeight(ref.current?.getBoundingClientRect().height || 0);
    });

    ref.current && resizeObserver.observe(ref.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, [ref.current, isActive]);

  const calculate = useCallback(() => {
    const direction = window.scrollY > refScroll.current ? 'down' : 'up';
    refScroll.current = window.scrollY;
    const top = ref.current?.getBoundingClientRect().top || 0;
    const height = refHeight.current;
    const scroll = refScroll.current;
    const state = refState.current;
    const windowHeight = window.innerHeight;

    if (height <= windowHeight || scroll === 0) {
      if (state.position !== 'fixedUp') {
        setState({
          position: 'fixedUp',
          top: 0,
          direction: 'up',
        });
      }

      return;
    }

    if (
      direction === 'down' &&
      state.position === 'absolute' &&
      scroll >= state.top + height - windowHeight
    ) {
      setState({
        position: 'fixedDown',
        top: headerHeight,
        direction: 'down',
      });
    }

    if (
      direction === 'up' &&
      state.position === 'fixedDown' &&
      scroll >= top + windowHeight - height
    ) {
      setState({
        position: 'absolute',
        top: scroll + windowHeight - height,
        direction: 'up',
      });
    }

    if (
      direction === 'up' &&
      state.position === 'absolute' &&
      scroll <= state.top - headerHeight
    ) {
      setState({
        position: 'fixedUp',
        top: headerHeight,
        direction: 'up',
      });
    }

    if (
      direction === 'down' &&
      state.position === 'fixedUp' &&
      scroll >= top - headerHeight
    ) {
      setState({
        position: 'absolute',
        top: scroll + headerHeight,
        direction: 'down',
      });
    }
  }, []);

  useLayoutEffect(() => {
    if (isActive) {
      window.addEventListener('scroll', calculate);
      window.addEventListener('resize', calculate);
    }

    return () => {
      window.removeEventListener('scroll', calculate);
      window.removeEventListener('resize', calculate);
    };
  }, [ref, isActive]);

  useEffect(() => {
    if (isActive) {
      calculate();
    }
  }, [height, isActive]);

  return { ref, ...state };
};
