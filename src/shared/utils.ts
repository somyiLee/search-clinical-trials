import { filterItems } from './types';
import { FETCHED_DATE, EXPIRE_TIME } from './constants';

export const setCacheStorage = async (url: string, params: string, data: filterItems[]) => {
  const cacheStorage = await caches.open(url);
  const response = new Response(JSON.stringify(data));

  const clonedResponse = response.clone();
  const newBody = clonedResponse.blob();
  const newHeader = new Headers(clonedResponse.headers);
  newHeader.append(FETCHED_DATE, new Date().toISOString());

  const newResponse = new Response(await newBody, {
    status: clonedResponse.status,
    statusText: clonedResponse.statusText,
    headers: newHeader,
  });

  cacheStorage.put(params, newResponse);
};

export const checkCacheExpired = (cacheData: Response) => {
  const cachedDate = cacheData.headers.get(FETCHED_DATE);

  if (!cachedDate) return;

  const fetchDate = new Date(cachedDate).getTime();
  const today = new Date().getTime();

  return today - fetchDate > EXPIRE_TIME;
};

export const getCachedData = async (url: string, params: string) => {
  const cacheStorage = await caches.open(url);
  const cachedData = await cacheStorage.match(params);

  if (cachedData) {
    if (!checkCacheExpired(cachedData)) return cachedData;

    await cacheStorage.delete(params);
  }

  return null;
};
