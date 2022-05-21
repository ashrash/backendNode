import { User, UserData } from '../interfaces/users.interface';
import { HttpException } from '../utils/exception';
import userModel from '../models/users.models';
import hobbiesModel from '../models/hobbies.models';
import * as R from 'ramda';
import { nullCheck } from '../utils/ramda';
import { Schema } from 'mongoose';

class UserService {
  public users = userModel;

  public async findAllUser(): Promise<UserData[]> {
    const users: UserData[] = await this.users.find().populate('hobbies');
    return users;
  }

  public async findUserDataById(userId: string): Promise<UserData> {
    if (nullCheck(userId)) throw new HttpException(400, "User Id is undefined");

    const userResult: UserData | null = await this.users.findOne({ _id: userId }).populate('hobbies');
    if (!userResult) throw new HttpException(204, '');

    return userResult;
  }

  public async findUserById(userId: string): Promise<User> {
    if (nullCheck(userId)) throw new HttpException(400, "User Id is undefined");

    const userResult: User | null = await this.users.findOne({ _id: userId });
    if (!userResult) throw new HttpException(204, '');

    return userResult;
  }

  public async createUser(userData: User): Promise<User| null> {
    const userResult: User | null = await this.users.findOne({ _id: userData._id });
    if (userResult) throw new HttpException(400, `User id: ${userData._id} already exists`);

    const createUserData: User = await this.users.create(userData);

    return createUserData;
  }

  public async updateUser(userData: User): Promise<User> {
    if (userData._id) {
      const userResult: User | null = await this.users.findOne({ _id: userData._id });
      if (nullCheck(userResult)) throw new HttpException(204, `User not found for id: ${userData._id}`);
    }

    const updateUserById: User | null = await this.users.findByIdAndUpdate(userData._id, 
      new userModel(userData),
      { new: true });
      
    if (!updateUserById) throw new HttpException(400, "Bad request");

    return updateUserById;
  }

  public async deleteUser(userId: string): Promise<User> {
    if (nullCheck(userId)) throw new HttpException(400, "User Id is undefined");

    const userToDelete: User| null = await this.findUserById(userId);
    const hobbies: [Schema.Types.ObjectId] | null = R.propOr(null, 'hobbies', userToDelete);

    if(!nullCheck(hobbies)){
      await hobbiesModel.deleteMany({ _id: { $in: hobbies }});
    }

    const deleteUserById: User | null = await this.users.findByIdAndDelete(userId);
    if (!deleteUserById) throw new HttpException(204, "User not found");

    return deleteUserById;
  }
}

export default UserService;
