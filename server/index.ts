import express from "express";
import next from 'next';
import cors from "cors";
import compression from "compression";
import helmet from "helmet";
import logger from "morgan";

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

export const appUrl = (): string => {
  return typeof process.env.APP_URL === "string" ? process.env.APP_URL : "";
};

const port = process.env.PORT ? process.env.PORT : 3000;

app
  .prepare()
  .then(() => {
    const server = express();

    server.use(
      cors({
        origin: [appUrl()],
        methods: ["GET", "POST", "OPTIONS"]
      })
    );
    server.use(compression());
    server.use(helmet());
    server.use(logger("short"));

    server.get('/users/:id', (req, res) => {
      const actualPage = `/users/${req.params.id}`;
      const queryParams = { id: req.params.id };
      app.render(req, res, actualPage, queryParams);
    });

    server.get('*', (req, res) => {
      return handle(req, res);
    });

    server.listen(port, () => {
      // if (err) throw err;
      console.log(`> Ready on http://localhost:${port}`);
    });
  })
  .catch(reason => {
    console.error(reason.stack);
    process.exit(1);
  });
