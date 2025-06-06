export type ApprovalSupplierStatus =
  | 'SUGGESTED'
  | 'BACKUP'
  | 'CHOSEN'
  | 'APPROVED'
  | 'DECLINED';


export const APPROVAL_STATUS_VALUES: ApprovalSupplierStatus[] = [
  'SUGGESTED',
  'BACKUP',
  'CHOSEN',
  'APPROVED',
  'DECLINED'
];