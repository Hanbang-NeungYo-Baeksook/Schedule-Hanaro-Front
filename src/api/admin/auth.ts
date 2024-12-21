import apiCall from '../Api';

const BASE_URL = '/api/auth/admin';

export type PostAdminLoginRequest = {
  authId: string;
  password: string;
};

export type PostAdminLoginResponse = {
  accessToken: string;
};

export const postAdminLogin = async ({
  authId,
  password,
}: PostAdminLoginRequest) => {
  const body = {
    authId,
    password,
  };

  return (await apiCall.post(
    BASE_URL + '/sign-in',
    body
  )) as PostAdminLoginResponse;
};
