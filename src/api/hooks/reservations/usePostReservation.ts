import { useMutation, UseMutationOptions } from "@tanstack/react-query";

import { post, reservationQueryKeys, reservationUrl } from "@/api/libs";

interface ReservationRequest {
  locationId: number;
  file: File[];
  request: string;
  userName: string;
  userPhone: string;
  dates: number[];
  month: number;
}

const usePostReservation = (
  options?: Omit<
    UseMutationOptions<void, unknown, ReservationRequest>,
    "mutationKey"
  >
) => {
  return useMutation({
    mutationKey: reservationQueryKeys.postReservation(),
    mutationFn: async (data: ReservationRequest) => {
      const formData = new FormData();
      formData.append("locationId", String(data.locationId));
      data.file.forEach((file) => {
        formData.append("file", file);
      });
      formData.append("request", data.request);
      formData.append("userName", data.userName);
      formData.append("userPhone", data.userPhone);
      formData.append("dates", JSON.stringify(data.dates));
      formData.append("month", String(data.month));

      await post(reservationUrl.postReservation(), formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
    ...options,
  });
};

export default usePostReservation;
