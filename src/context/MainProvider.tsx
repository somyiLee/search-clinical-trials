import React, { PropsWithChildren, createContext, useState } from 'react';
import { axiosInstance, filterItems, getCachedData, setCacheStorage, BASE_URL } from '../shared';

interface MainContextTypes {
  resultList: filterItems[];
  getItems: (queryStr: string) => void;
  debouncingAPI: (value: string) => void;
}

export const MainContext = createContext<MainContextTypes | null>(null);

export const MainProvider = ({ children }: PropsWithChildren) => {
  const [resultList, setResultList] = useState([]);
  // eslint-disable-next-line no-undef
  let timeout: NodeJS.Timeout | null = null;

  const getItems = async (queryStr: string) => {
    const responsedCache = await getCachedData(BASE_URL, queryStr);

    if (responsedCache) {
      const cachedData = await responsedCache.json();
      const slicedData = cachedData.slice(0, 6);
      setResultList(slicedData);
    }

    if (!responsedCache) {
      try {
        const { data } = await axiosInstance.get(`?q=${queryStr}`);
        const slicedData = data.slice(0, 6);
        setResultList(slicedData);
        setCacheStorage(BASE_URL, queryStr, slicedData);

        console.info('calling api');
      } catch (error) {
        console.error(error);
      }
    }
  };

  const debouncingAPI = (queryStr: string) => {
    if (queryStr === '') setResultList([]);

    if (timeout) clearTimeout(timeout);

    if (queryStr !== '') {
      timeout = setTimeout(() => {
        getItems(queryStr);
      }, 300);
    }
  };

  return (
    <MainContext.Provider value={{ resultList, getItems, debouncingAPI }}>
      {children}
    </MainContext.Provider>
  );
};
