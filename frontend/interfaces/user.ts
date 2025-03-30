interface UserCredentials {
  fullName: string;
  email: string;
  password: string;
}

interface UserBiometrics {
  birthDate: string;
  weight: number;
  height: number;
}

interface User {
  userCredentials: UserCredentials;
  userBiometrics: UserBiometrics;
  goal: string;
  gender: string;
  token?: string;
}
