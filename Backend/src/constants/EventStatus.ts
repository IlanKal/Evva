export const EVENT_STATUS = [
    "SCHEDULED",
    "PLANNING"
] as const;

  export type EventStatus = typeof EVENT_STATUS[number];