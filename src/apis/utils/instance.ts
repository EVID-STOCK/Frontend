import { defaultAlert, networkErrorAlert } from '@utils/customAlert';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BackEndUrl + '/api';

const defaultApi = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

// defaultApi.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     if (!error.response) {
//       networkErrorAlert('네트워크에 문제가 있습니다.');
//     } else if (error.response.status === 500) {
//       networkErrorAlert(
//         '서버 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.'
//       );
//     }
//     return Promise.reject(error);
//   }
// );

export const defaultInstance = defaultApi;
