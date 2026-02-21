import logger from '../utils/logger';
import { Request, Response, NextFunction } from 'express';

export function errorMiddleware(err: any, _req: Request, res: Response, _next: NextFunction) {
  // console.error(err);
  logger.error(`[ErrorMiddleware] ${err.stack || err.message || err}`);

  return res.status(err.statusCode ?? 500).json({
    message: err.message ?? 'Internal server error',
  });
}
