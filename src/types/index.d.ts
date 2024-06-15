export type SignupRequest = {
  orgName: string;
  userFullName: string;
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

export type ValidationResult =  {
  isActive: boolean;
  message: string;
  statusCode: number;
}

export type AgreementRequest = {
  pfiId: number; 
  isActive?: boolean;
  status?: string; 
  agreementAmount: string; 
  agreementPeriod: string; 
  isPaid?: boolean; 
  isApproved?: boolean; 
  commencementDate?: Date; 
  expiryDate?: Date; 
  createdAt: Date;
  updatedAt: Date;
}