import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import { get, reservationQueryKeys, reservationUrl } from "@/api/libs";
import { minutesToMs } from "@/utils/minutesToMs";

export interface ReservationResponse {
  locationId: number;
  file: File;
  request: string;
  userName: string;
  userPhone: string;
  dates: number[];
  month: number;
}

const useGetReservations = (
  options?: Omit<UseQueryOptions<ReservationResponse[]>, "queryKey">
) => {
  return useQuery({
    queryKey: reservationQueryKeys.getReservations(),
    queryFn: () => get<ReservationResponse[]>(reservationUrl.getReservations()),
    staleTime: minutesToMs(5),
    gcTime: minutesToMs(10),
    ...options,
  });
};

export default useGetReservations;
