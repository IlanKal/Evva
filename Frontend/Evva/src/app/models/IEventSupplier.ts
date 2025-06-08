import { ISupplier } from './ISupplier';

export interface IEventSupplier extends ISupplier {
  approval_status: 'SUGGESTED' | 'BACKUP' | 'CHOSEN' | 'APPROVED' | 'DECLINED';
}