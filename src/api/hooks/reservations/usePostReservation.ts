import { useMutation, UseMutationOptions } from "@tanstack/react-query";

import { post, reservationQueryKeys, reservationUrl } from "@/api/libs";

interface ReservationRequest {
  locationId: number;
  file: File;
  description: string;
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
      formData.append("file", data.file);
      formData.append("description", data.description);

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
