import { NextFunction, Request, Response } from 'express';

class HealthController {
  public healthCheck = async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.status(200).json({ data: new Date() });
    } catch (error) {
      next(error);
    }
  };

}

export default HealthController;
