import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import { get, locationQueryKeys, locationUrl } from "@/api/libs";
import { minutesToMs } from "@/utils/minutesToMs";

export interface Location {
  imageUrls: string[];
  title: string;
  location: string;
  description: string;
  templateId: number;
  locationId: number;
  hashTags: string[];
}

const useGetLocations = (
  search?: string,
  options?: Omit<UseQueryOptions<Location[]>, "queryKey">
) => {
  return useQuery({
    queryKey: locationQueryKeys.getLocations(search),
    queryFn: () => get<Location[]>(locationUrl.getLocations(search)),
    staleTime: minutesToMs(5),
    gcTime: minutesToMs(10),
    ...options,
  });
};

export default useGetLocations;
