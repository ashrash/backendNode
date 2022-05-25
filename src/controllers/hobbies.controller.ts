import { NextFunction, Request, Response } from 'express';
import { Hobbies, UpdateHobby } from '../interfaces/hobbies.interface';
import hobbiesService from '../services/hobbies.service';

class HobbiesController {
  public hobbiesService = new hobbiesService();

  public getHobbies = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllHobbiesData: Hobbies[] = await this.hobbiesService.findAllHobbies();

      res.status(200).json({ data: findAllHobbiesData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getHobbyById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const hobbiesId: string = req.params._id;
      const findOneHobbiesData: Hobbies = await this.hobbiesService.findHobbiesById(hobbiesId);

      res.status(200).json({ data: findOneHobbiesData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public getHobbyByUserId = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId: string = req.params.userId;
      const hobbiesData: Hobbies = await this.hobbiesService.findHobbiesByUserId(userId);

      res.status(200).json({ data: hobbiesData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createHobby = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const hobbyData: Hobbies = req.body;
      const userId: string = req.params.userId;
      const createHobbyData: Hobbies | null = await this.hobbiesService.createHobby(userId, hobbyData);

      res.status(201).json({ data: createHobbyData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateHobby = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const _id: string = req.params._id;
      const hobbyData: Hobbies = req.body;
      const updateUserData: UpdateHobby = await this.hobbiesService.updateHobby(_id, hobbyData);

      res.status(200).json({ data: updateUserData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteHobby = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId: string = req.params.userId;
      const _id: string = req.params._id;
      const deleteUserData: Hobbies = await this.hobbiesService.deleteHobby(userId, _id);

      res.status(200).json({ data: deleteUserData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default HobbiesController;
