import axios from 'axios';

export const axiosClient = () => {
  return axios.create({
    baseURL: 'http://localhost:4000/sick',
  });
};

export const axiosInstance = axiosClient();
