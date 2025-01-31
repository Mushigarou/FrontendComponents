import axiosConfig from "@/utils/axios-config";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useToast } from "../use-toast";
import { logError, logSuccess } from "./utils";

function useUpdateData<T>(
  endpoint: string | null,
  queryKey: string,
  cacheDeps: ReadonlyArray<unknown> = [],
  urlQueries: { [key: string]: string | number } | null = null,
) {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const updateData = async (payload: T): Promise<T | null> => {
    if (!endpoint) return null;

    try {
      const response = await axiosConfig.put(`${endpoint}`, payload, {
        params: urlQueries,
      });

      return response.data as T;
    } catch (e) {
      logError(e, toast);
    }

    return null;
  };

  const mutation = useMutation({
    mutationFn: updateData,
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: [queryKey, ...cacheDeps] });
      if (response !== null) {
        logSuccess("Data updated successfully", toast);
      }
    },
  });

  return mutation;
}

export { useUpdateData };
