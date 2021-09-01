export interface Account {
  accountNumber: number;
  clientNumber: number;
  accountType: string;
  currency: string;
  accountStatus: string;
}

export interface ClientAddress {
  country: string;
  city: string;
  address: string;
}

export interface Client {
  id: number;
  name: string;
  lastName: string;
  gender: string;
  personalNumber: string;
  phoneNumber: string;
  image: string;
  legalAddress: ClientAddress;
  actualAddress: ClientAddress;
  account: Account[];
}
