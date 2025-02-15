export const exampleQueryKeys = {
  getExample: () => ["example", "get", "example"],
} as const;

export const templateQueryKeys = {
  getTemplates: () => ["template", "get", "templates"],
} as const;

export const reservationQueryKeys = {
  postReservation: () => ["reservation", "post", "reservation"],
  getReservations: () => ["reservation", "get", "reservations"],
} as const;

export const locationQueryKeys = {
  getLocations: (search?: string) => ["location", "get", "locations", search],
} as const;
