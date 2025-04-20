export const EVENT_TYPES = [
    "Conference",
    "Seminar",
    "Corporate event",
    "Product launch",
    "Customer event"
  ] as const;
  
  export type EventType = typeof EVENT_TYPES[number];