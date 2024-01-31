export type TCreateUserPayload = {
  name: string;
  email: string;
  password: string;
};

export type TUpdateUserPayload = Partial<TCreateUserPayload>;
