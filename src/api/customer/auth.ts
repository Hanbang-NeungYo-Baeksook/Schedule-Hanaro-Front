import { API_ROUTE } from '@/constants/route';
import apiCall from '../Api';

const BASE_URL = API_ROUTE.customer + '/auth';

export type PostSignInRequest = {
  authId: string;
  password: string;
};

export type PostSignInResponse = {
  accessToken: string;
};

export type PostSignUpRequest = {
  authId: string;
  password: string;
  name: string;
  phoneNum: string;
  birth: string;
  gender: string;
};

export type PostSignUpResponse = {
  message: string;
};

export const postSignIn = async ({ authId, password }: PostSignInRequest) => {
  return (await apiCall.post(BASE_URL + '/sign-in', {
    authId,
    password,
  })) as PostSignInResponse;
};

export const postSignUp = async (postSignUpRequest: PostSignUpRequest) => {
  return (await apiCall.post(
    BASE_URL + '/sign-up',
    postSignUpRequest
  )) as PostSignUpResponse;
};
