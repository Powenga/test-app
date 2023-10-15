import axios from 'axios';
import { API_URL } from '../config';
import { IUser, IUserRequst } from '@test-app/types';

type FindUser = {
  (data: IUserRequst): Promise<IUser[]>;
  controller?: AbortController;
};

const ERR_CANCELED_CODE = 'ERR_CANCELED';
const UNCAUGHT_ERROR_MESSAGE = 'Something went wrong!';
export const CANCELED_MESSAGE = 'Request canceled';

const axiosInstanse = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
});

export const api = {
  findUser: ((data: IUserRequst) => {
    const previouseController = api.findUser.controller;
    if (previouseController) {
      previouseController.abort();
    }
    const controller = new AbortController();
    api.findUser.controller = controller;
    return axiosInstanse
      .post<IUser[]>('/', data, { signal: controller.signal })
      .then(({ data }) => {
        api.findUser.controller = undefined;
        return data;
      })
      .catch((error) => {
        console.log({ error });
        if (error.code === ERR_CANCELED_CODE) {
          return Promise.reject(CANCELED_MESSAGE);
        }
        if (error.response) {
          return Promise.reject(error.response.data.message);
        }
        return Promise.reject(UNCAUGHT_ERROR_MESSAGE);
      });
  }) as FindUser,
};
