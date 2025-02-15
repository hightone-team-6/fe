export const exampleQueryKeys = {
  getExample: () => ["example", "get", "example"],
} as const;

export const templateQueryKeys = {
  getTemplates: () => ["template", "get", "templates"],
} as const;

export const reservationQueryKeys = {
  postReservation: () => ["reservation", "post", "reservation"],
} as const;

export const locationQueryKeys = {
  getLocations: () => ["location", "get", "locations"],
} as const;
