import axios from 'axios';
import {
  FORGOT_PASSWORD,
  LOGIN,
  REGISTER,
  RESET_PASSWORD,
  VERIFY_OTP,
} from './constants';

const tokens = {
  device_token: '0imfnc8mVLWwsAawjYr4Rx-Af50DDqtlx',
  type: 'email/facebook/google/apple',
  social_id: '0imfnc8mVLWwsAawjYr4Rx-Af50DDqtlx',
};

export async function apiLogin(email: string, password: string): Promise<any> {
  return await axios.post(LOGIN, {
    email,
    password,
    role: 'farmer',
    ...tokens,
  });
}

export async function apiRegister(data: any): Promise<any> {
  return await axios.post(REGISTER, {
    ...data,
    ...tokens,
  });
}

export async function forgotPassword(data: any): Promise<any> {
  return await axios.post(FORGOT_PASSWORD, {
    ...data,
    ...tokens,
  });
}

export async function resetPassword(data: any): Promise<any> {
  return await axios.post(RESET_PASSWORD, {
    ...data,
    ...tokens,
  });
}

export async function verifyOTP(data: any): Promise<any> {
  return await axios.post(VERIFY_OTP, {
    ...data,
    ...tokens,
  });
}
