export interface IMilestone {
    category: string;
    status: 'pending' | 'waiting' | 'approved' | 'rejected';
}