import {useState, useEffect} from 'react';
import {NameEnquiryAPI} from '../auth';
import {NameEnquiryRequestTypes, NameEnquiryResponseTypes} from '../auth/type';

export const useNameEnquiry = ({
  accountNumber,
  channelCode,
  bankCode,
  username,
}: NameEnquiryRequestTypes) => {
  const [data, setData] = useState<NameEnquiryResponseTypes | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<{message: string; code: string} | null>(
    null,
  );
  const [showNameEnquiry, setShowNameEnquiry] = useState<boolean>(true);
  useEffect(() => {
    if (accountNumber.length === 10 && bankCode?.length > 0) {
      const fetchSuggestedData = async () => {
        setIsLoading(true);
        setError(null);

        try {
          const response = await NameEnquiryAPI({
            accountNumber,
            channelCode,
            bankCode,
            username,
          });
          setData(response);
          setShowNameEnquiry(true);
        } catch (error: any) {
          console.log(error, '===NAME ENQUIRY ===');
        } finally {
          setIsLoading(false);
        }
      };
      fetchSuggestedData();
    }
  }, [accountNumber, channelCode, bankCode, username]);

  return {data, isLoading, error, showNameEnquiry, setShowNameEnquiry};
};
