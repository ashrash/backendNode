import { Hobbies } from './hobbies.interface'
import { Schema } from 'mongoose';

export interface UserData {
    _id: Number;
    name: string;
    hobbies: [Hobbies];
}
  
export interface User {
    _id: Number;
    name: string;
    hobbies: [Schema.Types.ObjectId];
}
