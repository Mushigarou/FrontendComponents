import axiosConfig from "@/utils/axios-config";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useToast } from "../use-toast";
import { logError, logSuccess } from "./utils";

function usePostData<TRequest, TResponse>(
  endpoint: string | null,
  queryKey: string,
  cacheDeps: ReadonlyArray<unknown> = [],
  urlQueries: { [key: string]: string | number } | null = null,
) {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const postData = async (payload: TRequest): Promise<TResponse | null> => {
    if (!endpoint) return null;

    try {
      const response = await axiosConfig.post(`${endpoint}`, payload, {
        params: urlQueries,
      });

      return response.data as TResponse;
    } catch (e) {
      logError(e, toast);
    }

    return null;
  };

  const mutation = useMutation({
    mutationFn: postData,
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: [queryKey, ...cacheDeps] });
      if (response != null) {
        logSuccess("Data submitted successfully", toast);
      }
    },
  });

  return mutation;
}

export { usePostData };
