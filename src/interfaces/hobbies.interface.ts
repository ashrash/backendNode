import { Schema } from 'mongoose';


export interface Hobbies {
    _id: Schema.Types.ObjectId;
    passionLevel: string;
    name: string;
    year: string;
}
  
export interface UpdateHobby {
    passionLevel: string;
    name: string;
    year: string; 
}