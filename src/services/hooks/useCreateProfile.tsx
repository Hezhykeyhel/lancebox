import {useState} from 'react';
import {createProfileAPI} from '../auth'; // Adjust the path as needed
import {CreateProfileData} from '../auth/type';

export const useCreateProfile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const createProfile = async (data: CreateProfileData) => {
    setIsLoading(true);
    setMessage(null);
    setIsSuccess(false);

    try {
      const response = await createProfileAPI(data);
      setIsSuccess(true);
      setMessage('Profile created successfully!');
      console.log(response);

      return response;
    } catch (error: any) {
      setIsSuccess(false);
      setMessage(
        error.response?.data?.message ||
          'An error occurred while creating the profile.',
      );
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    createProfile,
    isLoading,
    isSuccess,
    message,
  };
};
