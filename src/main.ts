import App from './app';
import { errorMiddleware } from './middlewares/error.middleware';
import logger from './utils/logger';
import { config } from './config/env';
import { rawBodyMiddleware } from './middlewares/raw-body.middleware';
import express, { type Application } from 'express';

const app = new App();
// app.getApp().use(express.raw({ type: 'application/json' }));
app.getApp().use(rawBodyMiddleware);
app.getApp().use(errorMiddleware);

const port = config.port;

app.getApp().listen(port, () => {
  logger.info(`Server is running on port ${port}`);
});
