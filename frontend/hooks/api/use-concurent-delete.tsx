import axiosConfig from '@/utils/axios-config';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useToast } from '../use-toast';
import { logError, logSuccess } from './utils';

function useConcurrentDelete(
  endpoints: string[] | null,
  queryKey: string,
  cacheDeps: ReadonlyArray<unknown> = [],
  urlQueries: { [key: string]: string | number } | null = null,
) {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const deleteMultiple = async () => {
    if (!endpoints) return null;

    const deleteRequests = endpoints.map((endpoint) =>
      axiosConfig.delete(endpoint, {
        params: urlQueries,
      }),
    );

    try {
      const results = await Promise.all(deleteRequests);

      return results;
    } catch (e) {
      logError(e, toast);
    }

    return null;
  };

  const mutation = useMutation({
    mutationFn: deleteMultiple,
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: [queryKey, ...cacheDeps] });
      if (response !== null) {
        logSuccess('Data deleted Successfully', toast);
      }
    },
  });

  return mutation;
}

export { useConcurrentDelete };
