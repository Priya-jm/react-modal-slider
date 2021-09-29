import axios from 'axios';

import { getItemFromLocalStorage } from '../utils/localstorage';
import { TOKEN } from '../constants/text';

const { REACT_APP_BASE_URL } = process.env;

const axiosInstance = axios.create({
  baseURL: REACT_APP_BASE_URL,
});

axiosInstance.interceptors.request.use(
  (request) => {
    let accessToken = '';
    if (getItemFromLocalStorage(TOKEN)) {
      const tokenObj = JSON.parse(getItemFromLocalStorage(TOKEN) as any);
      if (tokenObj) {
        accessToken = tokenObj.accessToken;
        request.headers['Authorization'] = `Bearer ${accessToken}`;
      }
    }
    return request;
  },
  (error) => error
);

export default axiosInstance;
