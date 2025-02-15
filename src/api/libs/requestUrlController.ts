export const exampleUrl = {
  getExample: () => "/example",
} as const;

export const templateUrl = {
  getTemplates: () => "/templates",
} as const;

export const reservationUrl = {
  postReservation: () => "/reservations",
} as const;

export const locationUrl = {
  getLocations: () => "/locations",
} as const;
