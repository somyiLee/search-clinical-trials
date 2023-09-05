import { PropsWithChildren, createContext, useState } from 'react';
import { axiosInstance } from '../apis/axios';

interface MainContextTypes {
  filterItems: {
    sickCd: string;
    sickNm: string;
  }[];
  getItems: (prams: string) => void;
}

export const MainContext = createContext<MainContextTypes | null>(null);

export const MainProvider = ({ children }: PropsWithChildren) => {
  const [filterItems, setFilterItems] = useState([]);
  const getItems = async (prams: string) => {
    const { data } = await axiosInstance.get(`?q=${prams}`);
    setFilterItems(data);
  };

  return <MainContext.Provider value={{ getItems, filterItems }}>{children}</MainContext.Provider>;
};
