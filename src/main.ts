import App from './app';
import { errorMiddleware } from './middlewares/error.middleware';
import logger from './utils/logger';
import { config } from './config/env';

const app = new App();

app.getApp().use(errorMiddleware);

const port = config.port;

app.getApp().listen(port, () => {
  logger.info(`Server is running on port ${port}`);
});
