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
  getItems: (params: string) => void;
  delayApi: (value: string) => void;
}

export const MainContext = createContext<MainContextTypes | null>(null);

export const MainProvider = ({ children }: PropsWithChildren) => {
  const [filterItems, setFilterItems] = useState([]);
  // eslint-disable-next-line no-undef
  let timeout: NodeJS.Timeout | null = null;

  const getItems = async (params: string) => {
    const responsedCache = await getCachedData(BASE_URL, params);

    if (responsedCache) {
      const cachedData = await responsedCache.json();
      setFilterItems(cachedData);
      console.log('cached data');
    }

    if (!responsedCache) {
      try {
        const { data } = await axiosInstance.get(`?q=${params}`);
        setFilterItems(data);
        setCacheStorage(BASE_URL, params, data);
        console.info('calling api');
      } catch (error) {
        console.error(error);
      }
    }
  };

  const resetItems = () => {
    setFilterItems([]);
  };

  const delayApi = (value: string) => {
    if (timeout) {
      clearTimeout(timeout);
    }

    if (value !== '') {
      timeout = setTimeout(() => {
        getItems(value);
      }, 300);
    }

    if (value === '') {
      resetItems();
    }

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  };

  return (
    <MainContext.Provider value={{ filterItems, getItems, delayApi }}>
      {children}
    </MainContext.Provider>
  );
};
