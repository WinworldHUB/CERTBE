export type User = {
  username: string;
  parent_id: number;
  role: string;
  isPrimary: boolean;
  email: string;
  phone: string;
  address: string;
  password: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};