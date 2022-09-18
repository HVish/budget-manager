import request from '../shared/request';

export async function login(payload: { username: string; password: string }) {
  const response = await request.post<{ error: string } | { token: string }>(
    '/auth/login',
    payload,
    {
      validateStatus(status) {
        return status >= 200 && status < 500;
      },
    }
  );
  return response.data;
}
