import apiCall from '../Api';

const BASE_URL = '/api/auth/admin';

export type PostAdminLoginRequest = {
  authId: string;
  password: string;
};

export type AdminInfo = {
  adminId: number;
  adminName: string;
  branchName: string;
};

export type PostAdminLoginResponse = {
  accessToken: string;
  refreshToken: string;
  adminInfo: AdminInfo;
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

export const postReissueAccessToken = async () => {
  return (await apiCall.post('/api/auth/reissue')) as PostAdminLoginResponse;
};
