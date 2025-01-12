import axios from 'axios';
import {AESDecrypt, AESEncrypt} from '@/helpers/Encryption';
import {StatusCodes} from '@/helpers';

axios.defaults.timeout = 60_000;
export const apiInstance = axios.create({
  baseURL: '',
  adapter: ['fetch'],
  timeout: 60_000,
});

apiInstance.interceptors.response.use(
  async result => {
    const {response}: any = result.data;
    const decryptedData = AESDecrypt(response);

    return decryptedData;
  },
  async result => {
    if (result.response) {
      const error = result.response;

      const {status, data}: any = error;

      if (status >= StatusCodes.SERVER_ERROR_HTTP_CODE) {
        const {data: errorData} = error;

        if (errorData) {
          const {response: errorResponse}: any = errorData;

          if (errorResponse) {
            const decryptedError = AESDecrypt(errorResponse);

            throw decryptedError;
          }
        }

        const serverError =
          'ERR 015: Currently unable to process your request. Please try again';

        throw {responseMsg: serverError} as any;
      }

      const responseData: any = data?.response;
      if (!responseData) {
        const serverError =
          'Currently unable to process your request. Please try again later';

        return {responseMsg: serverError};
      }

      const decryptedError = AESDecrypt(responseData);

      if (status >= 400 || status <= 499) {
        const {responseCode} = decryptedError;

        switch (status) {
          case StatusCodes.UNAUTHORIZED_HTTP_CODE: {
            if (responseCode === '41') {
              // Unauthorized
            } else if (responseCode === '40') {
              // Session Expired
            }

            throw decryptedError;
          }

          case StatusCodes.BAD_REQUEST_HTTP_CODE: {
            throw decryptedError;
          }

          case 417: {
            throw decryptedError;
          }

          default: {
            if (typeof responseData !== 'string') {
              const unhandledError =
                'Currently unable to process your request. Please try again';

              throw {responseMsg: unhandledError} as any;
            }

            throw decryptedError;
          }
        }
      }

      const unhandledError =
        'Currently unable to process your request. Please try again';

      throw {responseMsg: unhandledError} as any;
    }
  },
);

apiInstance.interceptors.request.use(
  async request => {
    request.headers.set('content-type', `application/json`);

    const originalBody = request.data;

    if (originalBody) {
      const encryptedBody = AESEncrypt(originalBody);
      request.transformRequest = [() => encryptedBody];
    }

    return request;
  },
  error => Promise.reject(error),
);
