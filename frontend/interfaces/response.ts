interface ResponseUser {
  access_token?: string;
  full_name: string;
  birth_date: string;
  weight: number;
  height: number;
  gender: string;
  goal: string;
  email: string;
  password: string;
  onboarding: string;
}

interface RegisterResponse {
  user: ResponseUser;
}

interface LoginResponse {
  message: string;
  access_token: string;
  user: ResponseUser;
}
