import { ISupplier } from "./ISupplier";

export interface IEventResults {
    eventId: number;
    steps: {
        category: 'location' | 'photographer' | 'dj' | 'catering';
        suppliers: ISupplier[];
        status: 'pending' | 'waiting_for_confirmation' | 'approved' | 'rejected';
    }[];
}
