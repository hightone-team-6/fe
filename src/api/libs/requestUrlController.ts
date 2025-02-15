export const exampleUrl = {
  getExample: () => "/example",
} as const;

export const templateUrl = {
  getTemplates: () => "/templates",
} as const;

export const reservationUrl = {
  postReservation: () => "/reservations",
  getReservations: () => "/reservations",
} as const;

export const locationUrl = {
  getLocations: (search?: string) =>
    `/locations?${search ? `search=${search}` : ""}`,
} as const;
