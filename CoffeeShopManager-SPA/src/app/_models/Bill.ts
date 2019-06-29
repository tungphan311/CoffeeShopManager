import { BillDetail } from './BillDetail';

export interface Bill {
    id: number;
    staffId: number;
    memberId: number;
    createdDate: Date;
    value: number;
    billDetails: BillDetail[];
}
