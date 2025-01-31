import axiosConfig from "@/utils/axios-config";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

function useFetchData<Data>(
  endpoint: string | null,
  queryKey: string,
  cacheDeps: ReadonlyArray<unknown> = [],
  urlQueries: { [key: string]: unknown } | null = null,
  tanstackProps?: Partial<
    UseQueryOptions<Data | null, Error, Data | null, unknown[]>
  >,
) {
  const fetchData = async () => {
    if (endpoint === null) return null;

    const response = await axiosConfig.get(`${endpoint}`, {
      params: urlQueries,
    });
    return response.data as Data;
  };

  const query = useQuery({
    queryFn: fetchData,
    queryKey: [queryKey, ...cacheDeps],
    ...tanstackProps,
  });

  return query;
}

export { useFetchData };
