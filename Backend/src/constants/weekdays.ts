

export const WEEKDAYS = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ] as const;
  
  // טיפוס TypeScript שמגביל אותך רק לימי השבוע
  export type Weekday = typeof WEEKDAYS[number];