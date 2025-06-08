export const EVENT_STATUS = [
    "SCHEDULED",
    "PLANNING",
    "COMPLETED"
] as const;

  export type EventStatus = typeof EVENT_STATUS[number];