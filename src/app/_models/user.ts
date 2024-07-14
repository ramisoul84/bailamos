export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
}

export interface User {
  firstName: string;
  lastName?: string;
  gender: Gender;
  email: string;
  createdAt: Date;
  lastLoginAt: Date;
}

export interface LoginUserDto {
  email: string;
  password: string;
}

export interface RegisterUserDto {
  firstName: string;
  lastName?: string;
  gender: Gender;
  email: string;
  password: string;
}

export interface ResponseLoginDto {
  user: {
    id: string;
    email: string;
  };
  accessToken: string;
}
