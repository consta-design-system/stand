import { createContext, useContext } from 'react';

export const MdxCodeContext = createContext(false);

export const useMdxCodeContext = () => {
  return useContext(MdxCodeContext);
};
