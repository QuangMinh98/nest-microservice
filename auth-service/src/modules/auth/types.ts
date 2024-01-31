export interface JwtPayload {
  id: string;
  name: string;
  email: string;
  iat: number;
  exp: number;
}

export type TRegisterPayload = {
  name: string;
  email: string;
  password: string;
};

export type TLoginPayload = {
  email: string;
  password: string;
};
