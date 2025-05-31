export interface IGuest {
  guest_id: number;
  event_id: number;
  full_name: string;
  phone: string;
  email: string;
  rsvp: 'PENDING' | 'APPROVED' | 'REJECTED';
  has_rated: boolean;
}
