// Login Types Interface
import {StatusCodes} from '@/helpers/index';

export interface LoginTypes {
  email?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  otp?: string;
  newPassword?: string;
}

// Create Profile Data Interface
export interface CreateProfileData {
  username: string;
  password: string;
  accountNumber: string;
  accountBankCode: string;
  channelId: string;
}
export interface UserNameCheckDataTypes {
  userName: string;
}

export interface ResponseTypes {
  responseCode: StatusCodes;
  responseDetails: null | any;
  responseMsg: string;
}

export interface SuggestedRequestDataTypes {
  accountNumber: string;
  username?: string;
  channelId: string;
}

export interface BankDetailsTypes {
  bankCode: string;
  bankShortName: string;
  bankId: string;
  category: string;
  bankName: string;
}

export interface SuggestedAPIResponseTypes {
  responseCode: string;
  responseDetails: {
    probableBanksList: BankDetailsTypes[];
    famousBanksList: BankDetailsTypes[];
  };
  responseMessage: string | null;
}

export interface NameEnquiryRequestTypes {
  accountNumber: string;
  channelCode: string;
  bankCode: string;
  username: string;
}

interface NameEnquiryResponseDetails {
  accountNumber: string;
  bankCode: string;
  accountName: string;
  bvn: string;
  accountTier: string;
  responseCode: string;
  responseMessage: string | null;
  channelCode: string;
}

export interface NameEnquiryResponseTypes {
  responseDetails: NameEnquiryResponseDetails;
  responseCode: string;
  responseMsg: string | null;
}
