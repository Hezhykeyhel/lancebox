import {apiInstance} from '../../config/index';
import {
  CreateProfileData,
  LoginTypes,
  NameEnquiryRequestTypes,
  NameEnquiryResponseTypes,
  ResponseTypes,
  SuggestedAPIResponseTypes,
  SuggestedRequestDataTypes,
  UserNameCheckDataTypes,
} from './type';

// Login function
export async function loginAPI({email, password}: LoginTypes) {
  const response = await apiInstance.post('auth/login', {
    email,
    password,
  });
  return response.data;
}

// Create Profile function
export async function createProfileAPI(data: CreateProfileData) {
  const response = await apiInstance.post('CreateUserProfile', data);
  return response.data;
}

export async function userNameCheckAPI(
  parameter: UserNameCheckDataTypes,
): Promise<ResponseTypes> {
  try {
    const response = (await apiInstance.post(
      'fx-bridge-profile-mgmt/UserNameCheck',
      parameter,
    )) as ResponseTypes;
    return response;
  } catch (error: any) {
    // console.log(error);

    return error.data;
  }
}

export async function suggestedAPI(
  data: SuggestedRequestDataTypes,
): Promise<SuggestedAPIResponseTypes> {
  const response = (await apiInstance.request({
    method: 'post',
    url: 'fx-bridge-profile-mgmt/SuggestBankList',
    data,
    timeout: 60_000,
  })) as SuggestedAPIResponseTypes;
  return response;
}

export async function NameEnquiryAPI(
  data: NameEnquiryRequestTypes,
): Promise<NameEnquiryResponseTypes> {
  try {
    const response = (await apiInstance.request({
      method: 'post',
      url: 'fx-bridge-profile-mgmt/NameEnquiry',
      data,
      timeout: 60_000,
    })) as NameEnquiryResponseTypes;

    return response;
  } catch (error: any) {
    return error;
  }
}
