import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import './helpers/configEnvironment';
import { logger } from './helpers/logger';
import { router } from './router';
import { errorHandler } from './middlewares/errorHandler';
import { checkApiKeyAuthOrFirebaseAuth } from './middlewares/checkApiKeyAuthOrFirebaseAuth';
import './database';
import './associations';

const app: Express = express();
const port = process.env.PORT;

app.disable('x-powered-by');
app.use(
  cors({
    allowedHeaders: ['Content-Type', 'Authorization', 'X-API-Key'],
  }),
);
app.use(express.json());
app.get('/', (_req: Request, res: Response) => {
  res.send(`bed-sheets Server ver: ${process.env.npm_package_version}`);
});

app.use(checkApiKeyAuthOrFirebaseAuth());
app.use(router);
app.use(errorHandler);

const server = app.listen(port, () => {
  logger.info(`server is running at port ${port}`);
});

export { server, app };
