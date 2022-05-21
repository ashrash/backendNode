
import { Router } from 'express';
import UsersController from '../controllers/user.controller';
import { Routes } from '../interfaces/routes.interface';
import validationMiddleware from '../middleware/validation.middleware';
import { CreateUserDto } from '../dtos/users.dto';

class UsersRoute implements Routes {
  public route = '/users';
  public router = Router();
  public usersController = new UsersController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.route}`, this.usersController.getUsers);
    this.router.get(`${this.route}/:_id`, this.usersController.getUserById);
    this.router.post(`${this.route}`,  validationMiddleware(CreateUserDto, 'body'), this.usersController.createUser);
    this.router.put(`${this.route}`, validationMiddleware(CreateUserDto, 'body'), this.usersController.updateUser);
    this.router.delete(`${this.route}/:_id`, this.usersController.deleteUser);
  }
}

export default UsersRoute;
