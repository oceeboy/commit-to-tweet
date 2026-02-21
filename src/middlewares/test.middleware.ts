import logger from '../utils/logger';
import { Request, Response, NextFunction } from 'express';

export const testMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const { method, url } = req;
  logger.info(`[TestMiddleware] ${method} ${url}`);
  next();
};
