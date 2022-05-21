import { model, Schema } from 'mongoose';
import { User } from '../interfaces/users.interface';

const userSchema: Schema = new Schema({
  _id: { type: Number },
  name: { type: String, required: true },
  hobbies: [{ type: Schema.Types.ObjectId, ref: 'Hobbies', required: false, default: null }],
});

const userModel = model<User>('User', userSchema);

export default userModel;
