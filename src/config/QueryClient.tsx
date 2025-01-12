import {QueryClient} from '@tanstack/react-query';
import {apiInstance} from '.';

// Create a QueryClient instance
const QueryClients = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: async ({queryKey}: any) => {
        const response = await apiInstance.get(queryKey[0]);
        return response.data;
      },
    },
  },
});

export default QueryClients;
