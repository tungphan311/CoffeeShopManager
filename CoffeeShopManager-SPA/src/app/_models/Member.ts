import { Photo } from './Photo';

export interface Member {
    id: number;
    name: string;
    age: number;
    photo: string;
    gender: string;
    phone: string;
    address: string;
    dateOfBirth: Date;
    createdDate: Date;
    photos?: Photo[];
}
