import { Hobbies } from './hobbies.interface'
import { Schema } from 'mongoose';

export interface UserData {
    _id: number;
    name: string;
    hobbies: [Hobbies];
}
  
export interface User {
    _id: number;
    name: string;
    hobbies: [Schema.Types.ObjectId];
}
