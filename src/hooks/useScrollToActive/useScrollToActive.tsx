import { useLayoutEffect } from 'react';
import { useRouter } from 'react-router5';

export const getElementByHref = (href: string, prefix?: string): Element => {
  return document.querySelectorAll(
    `${prefix ? `.${prefix}` : ''}[href='${href}']`,
  )[0];
};

export const useScrollToActive = (timeout?: number) => {
  const router = useRouter();

  useLayoutEffect(() => {
    const element = getElementByHref(router.getState().path);
    setTimeout(
      () =>
        element?.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
          inline: 'nearest',
        }),
      timeout ?? 600,
    );
  }, []);
};
