import Axios from 'axios';
import Cookies from 'js-cookie';
import configs from '../Config/config';

const axiosInstance = Axios.create({
  timeout: 3 * 60 * 1000,
  baseURL: configs.apiDomain,
});


axiosInstance.interceptors.request.use(
  (config) => {
    config.headers['Authorization'] = `Bearer ${Cookies.get('token')}`;
    return config;
  },
  (error) => Promise.reject(error),
);


export const sendGet = (url, params) => axiosInstance.get(url, { params });
export const sendPost = (url, params, queryParams) =>
  axiosInstance.post(url, params, { params: queryParams });
export const sendPostFile = (url, params, queryParams) =>
  axiosInstance.post(url, params, {
    headers: { 'Content-Type': 'multipart/form-data' },
    params: queryParams,
  });
export const sendPut = (url, params) => axiosInstance.put(url, params);
export const sendPatch = (url, params) => axiosInstance.patch(url, params);
export const sendDelete = (url, params) =>
  axiosInstance.delete(url, { params });
