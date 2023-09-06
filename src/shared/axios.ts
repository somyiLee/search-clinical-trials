import axios from 'axios';
import { BASE_URL } from './constants';

export const axiosClient = () => {
  return axios.create({
    baseURL: BASE_URL,
  });
};

export const axiosInstance = axiosClient();
