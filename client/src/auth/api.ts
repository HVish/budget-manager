import request from '../shared/request';

interface LoginRequest {
  email: string;
  password: string;
}

type LoginResponse =
  | { message: string; error: 'Unauthorized' }
  | { _id: string; name: string; email: string };

export async function login(payload: LoginRequest) {
  const response = await request.post<LoginResponse>('/auth/login', payload, {
    validateStatus(status) {
      return status >= 200 && status < 500;
    },
  });
  return response.data;
}

export async function logout() {
  await request.post('/auth/logout');
}
