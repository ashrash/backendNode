import { Schema } from 'mongoose';
import { Hobbies, UpdateHobby } from '../interfaces/hobbies.interface';
import { User, UserData } from '../interfaces/users.interface';
import { HttpException } from '../utils/exception';
import hobbiesModel from '../models/hobbies.models';
import usersModel from '../models/users.models';
import userService from '../services/users.service';
import * as R from 'ramda';
import { nullCheck } from '../utils/ramda';

class HobbiesService {
  public userService = new userService();
  public hobbies = hobbiesModel;
  public users = usersModel;

  public async findAllHobbies(): Promise<Hobbies[]> {
    const hobbies: Hobbies[] = await this.hobbies.find();
    return hobbies;
  }

  public async findHobbiesByUserId(userId: string): Promise<UserData> {
    if (nullCheck(userId)) throw new HttpException(400, "User Id is undefined");

    const userHobby: UserData | null = await this.users.findOne({_id: userId}).populate('hobbies');
    if (!userHobby) throw new HttpException(204, '');

    return userHobby;
  }

  public async createHobby(userId: string, hobbyData: Hobbies): Promise<Hobbies| null> {

    const resultUser: User = await this.userService.findUserById(userId);
    if (nullCheck(resultUser)) throw new HttpException(400, `User id: ${userId} does not exists`);

    const createdHobbyData: Hobbies = await this.hobbies.create(hobbyData);
    resultUser.hobbies.push(createdHobbyData._id);
    await this.users.findByIdAndUpdate(userId, new usersModel(resultUser));

    return createdHobbyData;
  }

  public async updateHobby(hobbyId: string, hobbyData: UpdateHobby): Promise<UpdateHobby> {
    if(nullCheck(hobbyId)) throw new HttpException(400, `Hobbies is Undefined`);

    if (hobbyId) {
      const resultHobby: Hobbies | null = await this.hobbies.findOne({ _id: hobbyId });
      if (nullCheck(resultHobby)) throw new HttpException(204, `Hobbies not found for id: ${hobbyId}`);
    }

    const updateUserById: UpdateHobby | null = await this.hobbies.findByIdAndUpdate(hobbyId, 
      hobbyData,
      { new: true });
      
    if (!updateUserById) throw new HttpException(400, "Bad request");

    return updateUserById;
  }

  public async deleteHobby(userId: string, _id: string): Promise<Hobbies> {
    if (nullCheck(userId)) throw new HttpException(400, "Hobbies Id is undefined");
    
    const resultUser: User = await this.userService.findUserById(userId);
    const hobbies: [Schema.Types.ObjectId] | null = R.propOr(null, 'hobbies', resultUser);
    if(!R.includes(_id, hobbies)){
      throw new HttpException(400, `Hobbies not found for user : ${userId}`);
    }

    const updateUser: User = R.assoc('hobbies', R.without(_id, hobbies), resultUser);
    const updatedUser: User = await this.userService.updateUser(updateUser);

    if(!updatedUser) throw new HttpException(400, "Error updating user schema");

    const deleteUserById: Hobbies | null = await this.hobbies.findByIdAndDelete(_id);
    if (!deleteUserById) throw new HttpException(204, "Hobbies not found");

    return deleteUserById;
  }
}

export default HobbiesService;
