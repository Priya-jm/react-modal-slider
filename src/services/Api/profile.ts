import { AxiosResponse } from 'axios';

import axios from "../instance";
import { UserSummaryInterface } from '../../interfaces/UserSummaryInterface';
import { LIMIT_ID } from '../../constants/text';
import { ProfileDataInterface } from '../../interfaces/ProfileInterface';

export const getUserProfile = (): Promise<ProfileDataInterface> => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.get('users/me');
      resolve(res.data);
    }
    catch (err) {
      reject(err);
    }
  });
}

export const updateUserProfile = (data: any): Promise<AxiosResponse<void>> => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.put(
        'users/me',
        data
      );
      resolve(res.data);
    }
    catch (err) {
      reject(err);
    }
  });
}

export const getBorrowerSummary = (page: number): Promise<UserSummaryInterface> => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.get(`user-submissions/history?page=${page}&limit=${LIMIT_ID}`);
      resolve(res.data);
    }
    catch (err) {
      reject(err);
    }
  });
}
