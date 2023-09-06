import { PropsWithChildren, createContext, useState } from 'react';
import {
  axiosInstance,
  filterItems,
  getCachedData,
  setCacheStorage,
  BASE_URL,
} from '../shared/index';

interface MainContextTypes {
  filterItems: filterItems[];
  getItems: (queryStr: string) => void;
  debouncingAPI: (value: string) => void;
}

export const MainContext = createContext<MainContextTypes | null>(null);

export const MainProvider = ({ children }: PropsWithChildren) => {
  const [filterItems, setFilterItems] = useState([]);
  // eslint-disable-next-line no-undef
  let timeout: NodeJS.Timeout | null = null;

  const getItems = async (queryStr: string) => {
    const responsedCache = await getCachedData(BASE_URL, queryStr);

    if (responsedCache) {
      const cachedData = await responsedCache.json();
      setFilterItems(cachedData);
      console.log('cached data');
    }

    if (!responsedCache) {
      try {
        const { data } = await axiosInstance.get(`?q=${queryStr}`);
        setFilterItems(data);
        setCacheStorage(BASE_URL, queryStr, data);
        console.info('calling api');
      } catch (error) {
        console.error(error);
      }
    }
  };

  const resetItems = () => {
    setFilterItems([]);
  };

  const debouncingAPI = (queryStr: string) => {
    if (timeout) {
      clearTimeout(timeout);
    }

    if (queryStr !== '') {
      timeout = setTimeout(() => {
        getItems(queryStr);
      }, 300);
    }

    if (queryStr === '') {
      resetItems();
    }

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  };

  return (
    <MainContext.Provider value={{ filterItems, getItems, debouncingAPI }}>
      {children}
    </MainContext.Provider>
  );
};
