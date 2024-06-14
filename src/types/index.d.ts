export type SignupRequest = {
  fullName: string;
  parent_id?: number;
  role?: string;
  isPrimary?: boolean;
  email: string;
  phone: string;
  address: string;
  password: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};

type PfiRequest = {
  name: string;
  address: string;
};
