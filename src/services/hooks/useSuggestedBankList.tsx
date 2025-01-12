import {useState, useEffect} from 'react';
import {suggestedAPI} from '../auth';
import {
  SuggestedAPIResponseTypes,
  SuggestedRequestDataTypes,
} from '../auth/type';

export const useSuggestedAPI = ({
  accountNumber,
  username,
  channelId,
}: SuggestedRequestDataTypes) => {
  const [data, setData] = useState<SuggestedAPIResponseTypes | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [error, setError] = useState<{message: string; code: string} | null>(
    null,
  );
  useEffect(() => {
    if (accountNumber.length === 10) {
      const fetchSuggestedData = async () => {
        setIsLoading(true);
        setError(null);

        try {
          const response = await suggestedAPI({
            accountNumber,
            username,
            channelId,
          });

          setData(response);
        } catch (error: any) {
          console.log(error, '===SUGGESTED_BANK===');

          //   setError(error.data || {message: 'An error occurred', code: 'ERROR'});
        } finally {
          setIsLoading(false);
        }
      };
      fetchSuggestedData();
    }
  }, [accountNumber, channelId, username]);

  return {data, isLoading, error};
};
