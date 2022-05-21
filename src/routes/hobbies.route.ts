
import { Router } from 'express';
import HobbiesController from '../controllers/hobbies.controller';
import { Routes } from '../interfaces/routes.interface';
import validationMiddleware from '../middleware/validation.middleware';

class HobbiesRoute implements Routes {
  public route = '/hobbies';
  public router = Router();
  public hobbiesController = new HobbiesController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.route}`, this.hobbiesController.getHobbies);
    this.router.get(`${this.route}/:_id`, this.hobbiesController.getHobbyById);
    this.router.post(`${this.route}/:userId`,  this.hobbiesController.createHobby);
    this.router.put(`${this.route}/:_id`,  this.hobbiesController.updateHobby);
    this.router.delete(`${this.route}/:userId/:_id`, this.hobbiesController.deleteHobby);
  }
}

export default HobbiesRoute;
