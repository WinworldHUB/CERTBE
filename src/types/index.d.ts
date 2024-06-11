export type User = {
  username: string;
  pfiId: number;
  email: string;
  phone: string;
  address: string;
  password: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};