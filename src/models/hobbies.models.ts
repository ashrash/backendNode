import { model, Schema, Document } from 'mongoose';
import { Hobbies } from '../interfaces/hobbies.interface';

const hobbiesSchema: Schema = new Schema({
  name: { type: String, required: true },
  passionLevel: { type: String, required: true, enum : ['Low', 'Medium', 'High', 'Very-High'] },
  year: { type: Number, required: true },
});

const hobbiesModel = model<Hobbies>('Hobbies', hobbiesSchema);

export default hobbiesModel;
