import apiCall from '../Api';

const BASE_URL = '/api/auth/admin';

export const postAdminLogin = async ({
  authId,
  password,
}: {
  authId: string;
  password: string;
}) => {
  const body = {
    authId,
    password,
  };

  return await apiCall.post(BASE_URL + '/sign-in', body);
};
