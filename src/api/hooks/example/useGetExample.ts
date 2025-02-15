import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import { get, exampleQueryKeys, exampleUrl } from "../../libs";

interface GetExampleResponse {
  id: number;
  name: string;
}

const useGetExample = (
  options?: Omit<UseQueryOptions<GetExampleResponse>, "queryKey">
) => {
  return useQuery({
    queryKey: exampleQueryKeys.getExample(),
    queryFn: () => get<GetExampleResponse>(exampleUrl.getExample()),
    ...options,
  });
};

export default useGetExample;
