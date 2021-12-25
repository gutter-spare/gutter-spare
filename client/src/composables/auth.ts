import http from '@/http';

interface Credentials {
  email: string,
  password: string,
}

export interface AuthComposable {
  csrf(): Promise<any>,
  login(credentials: Credentials, token: string): Promise<any>,
}

export default function useAuth(): AuthComposable {
  return {
    csrf: (): Promise<any> => http.get('/sanctum/csrf-cookie'),
    login: (credentials:Credentials, token: string):Promise<any> => http.post('/login', credentials, {
      headers: {
        'X-XSRF-TOKEN': token,
      },
    }),
  };
}