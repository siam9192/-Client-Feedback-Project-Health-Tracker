export interface CurrentUser extends User {
   profile:Admin|Client|Employee
}

export interface User {
    _id: string;
    email: string;
    role: UserRole;
    status: UserStatus;
    createdAt: string;
    updatedAt: string;
    __v: number;
    profileId: string;
  }



export interface Admin {
  user: User;
  name: string;
  gender?: Gender;
  profilePicture?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Client {
  _id: string;
  user:User;
  name: string;
  gender: Gender;
  profilePicture?: string;
  clientType:ClientType;
  address?: Address;
  count: {
    runningProjects: number;
    completedProjects: number;
    overdueProjects: number;
  };
  createdAt: string;
  updatedAt: string;
  __v: number;
}


export interface Employee {
  _id: string;
  user:User;
  name: string;
  position: string;
  gender: Gender;
  profilePicture: string;
  employmentType:EmploymentType;
  address: {
    city: string;
    country: string;
  };
  contactInfo: {
    email: string;
    phone: string;
  };
  count: {
    runningProjects: number;
    completedProjects: number;
    overdueProjects: number;
  };
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export enum UserStatus {
  ACTIVE = 'active',
  BLOCKED = 'blocked',
}

export enum UserRole {
  ADMIN = 'admin',
  EMPLOYEE = 'employee',
  CLIENT = 'client',
}

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
}

export enum ClientType {
  INDIVIDUAL = 'individual',
  COMPANY = 'company',
}

export type ContactInfo = {
  email?: string;
  phone?: string;
};

export type Address = {
  street?: string;
  city: string;
  state?: string;
  country: string;
  postcode?: string;
};

export enum EmploymentType {
  FULLTIME = 'fulltime',
  PARTTIME = 'parttime',
  INTERN = 'intern',
  CONTRACT = 'contract',
}