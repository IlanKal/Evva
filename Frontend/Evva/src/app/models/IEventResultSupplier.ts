import { ISupplier } from './ISupplier';
import { DJAttributes } from './DJAttributes';
import { LocationAttributes } from './LocationAttributes';
import { CateringAttributes } from './CateringAttributes';
import { PhotographerAttributes } from './PhotographerAttributes';
import { SpeakerAttributes } from './SpeakerAttributes';

export interface IEventResultSupplier extends ISupplier {
  approval_status?: string;
  contact_info?: string;
  region?: string;
  price_per_hour?: number;
  price_per_person?: number;
  price_per_lecture?: number;
  price: number;
  supplier_type?: string;
  djs?: DJAttributes[];
  locations?: LocationAttributes[];
  caterings?: CateringAttributes[];
  photographers?: PhotographerAttributes[];
  speakers?: SpeakerAttributes[];
}
