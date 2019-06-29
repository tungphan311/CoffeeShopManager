import { Photo } from './Photo';

export interface Staff {
    id: number;
    name: string;
    teamId: number;
    age: number;
    photo: string;
    gender: string;
    phone: string;
    email: string;
    address: string;
    dateOfBirth: Date;
    isDelete: boolean;
    photos?: Photo[];
}
