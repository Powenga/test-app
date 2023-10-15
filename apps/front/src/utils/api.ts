import axios from 'axios';
import { API_URL } from '../config';
import { IUser, IUserRequst } from '@test-app/types';

const UNCAUGHT_ERROR_MESSAGE = 'Something went wrong!';

const axiosInstanse = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
});

export const api = {
  findUser: (data: IUserRequst) =>
    axiosInstanse
      .post<IUser[]>('/', data)
      .then(({ data }) => {
        return data;
      })
      .catch((error) => {
        if (error.response) {
          return Promise.reject(error.response.data.message);
        }
        return Promise.reject(UNCAUGHT_ERROR_MESSAGE);
      }),
};
