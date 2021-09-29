import { AxiosResponse } from 'axios';

import axios from '../instance';
import {
  LoginRequestInterface,
  LoginResponseInterface,
  LoginResponseBeforeTokenInterface,
  TokenValidateInterface,
  ForgotPasswordRequestInterface,
  ValidateResetPasswordTokenRequestInterface,
  ChangePasswordRequestInterface,
} from '../../interfaces/LoginInterface';

export const signup = (data: any): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
      const config = { headers: { 'Content-Type': 'multipart/form-data' } };
      const res = await axios.post('users', data, config);
      resolve(res.data);
    } catch (err) {
      reject(err);
    }
  });
};

export const verifyToken = (data: TokenValidateInterface): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.patch(`users/${data.userId}/verify`, {
        token: data.token,
      });
      resolve(res.data);
    } catch (err) {
      reject(err);
    }
  });
};

export const login = (
  data: LoginRequestInterface
): Promise<LoginResponseBeforeTokenInterface> => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.post('auth/login', data);
      resolve(res.data);
    } catch (err) {
      reject(err);
    }
  });
};

export const forgotPassword = (
  data: ForgotPasswordRequestInterface
): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.post('users/forgot-password', data);
      resolve(res.data);
    } catch (err) {
      reject(err);
    }
  });
};

export const validateResetPasswordToken = (
  data: ValidateResetPasswordTokenRequestInterface,
  userId: string 
): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.post(`users/${userId}/validate-reset-password-token`, data);
      resolve(res.data);
    } catch (err) {
      reject(err);
    }
  });
};

export const ChangePassword = (
  data: ChangePasswordRequestInterface,
  userId: string 
): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.post(`users/${userId}/change-password`, data);
      resolve(res.data);
    } catch (err) {
      reject(err);
    }
  });
};

export const validateToken = (
  data: TokenValidateInterface
): Promise<LoginResponseInterface> => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.post(`auth/${data.userId}/validate-token`, {
        token: data.token,
      });
      resolve(res.data);
    } catch (err) {
      reject(err);
    }
  });
};

export const resendQrUsingBackupCodes = (data: TokenValidateInterface): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.post(`users/${data.userId}/resend-secret-qr`, {
        backupCode: data.token,
      });
      resolve(res.data);
    } catch (err) {
      reject(err);
    }
  });
};

export const logout = (): Promise<AxiosResponse<void>> => {
  return axios.get(`auth/logout`);
};
