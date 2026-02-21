import logger from '../utils/logger';
import { Request, Response, NextFunction } from 'express';

export function notFoundHandler(req: Request, res: Response, _next: NextFunction) {
  logger.warn(`[NotFoundHandler] ${req.method} ${req.originalUrl} not found`);

  res.status(404).json({
    statusCode: 404,
    error: 'Not Found',
    message: `${req.method} ${req.originalUrl} does not exist`,
  });
}
