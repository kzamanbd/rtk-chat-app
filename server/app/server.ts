// Import packages
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express, { Express } from 'express';
import http from 'http';
import mongoose from 'mongoose';
import { Server } from 'socket.io';
import swaggerUi from 'swagger-ui-express';
import { socketConnection } from './controllers/socket.controller';
import { errorHandler, notFoundHandler, requestHandler } from './middleware/errorHandler';
import routes from './routes';
import swaggerDocument from './swagger.json';
import { errorLogger, infoLogger, logger } from './utils/logger';

dotenv.config();
// Middleware
const app: Express = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const httpServer = http.createServer(app);

(async () => {
    const MONGO_URI: string = process.env.MONGO_URI || 'http://localhost:27017';
    // connect mongoDB
    try {
        await mongoose.connect(MONGO_URI);
        console.log('MongoDB connected ✅');
    } catch (err) {
        console.log(err);
    }
})();

// request handler
app.use(infoLogger);
app.use(requestHandler);

// add socket.io
const io = new Server(httpServer, {
    cors: {
        origin: '*', // process.env.CLIENT_URL,
        methods: ['GET', 'POST']
    }
});

// set cors
app.use(cors({ credentials: true, origin: true }));
app.set('trust proxy', true);

// parse cookies
app.use(cookieParser(process.env.COOKIE_SECRET));

const chat = io.of('/chat');
(global as any).chat = chat;
chat.on('connection', socketConnection);

// Routes
app.use('/', routes);
// not found handler
app.use(notFoundHandler);
// error logger
app.use(errorLogger);
// error handler
app.use(errorHandler);

const options = {
    customCss: '.swagger-ui .topbar { display: none }'
};

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));
// connection
const port = process.env.PORT || 9001;
httpServer.listen(port, async () => {
    logger.info(`⚡️[server]: Server is running at http://localhost:${port}`);
});
