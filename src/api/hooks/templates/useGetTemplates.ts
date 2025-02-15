import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import { get, templateQueryKeys, templateUrl } from "@/api/libs";
import { minutesToMs } from "@/utils/minutesToMs";

export interface Template {
  imageUrls: string[];
  title: string;
  tags: string[];
  templateId: number;
}

const useGetTemplates = (
  options?: Omit<UseQueryOptions<Template[]>, "queryKey">
) => {
  return useQuery({
    queryKey: templateQueryKeys.getTemplates(),
    queryFn: () => get<Template[]>(templateUrl.getTemplates()),
    staleTime: minutesToMs(5),
    gcTime: minutesToMs(10),
    ...options,
  });
};

export default useGetTemplates;
