import express from 'express';
import fileUpload from 'express-fileupload';
import cookieParser from 'cookie-parser';
import postsRoutes from './routes/posts.routes.js'
import userRoutes from './routes/users.routes.js'
import notificationsRoutes from './routes/notifications.routes.js'
import path from 'path'
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Configuración de CORS
const allowedOrigins = [
    process.env.CLIENT_URL_DEV || 'http://localhost:5173',
    process.env.CLIENT_URL_PROD
];

//middlewares
app.use(express.json())
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: './upload'
}))
app.use(cookieParser())

app.use((req, res, next) => {
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
});

//routes
app.use('/api', postsRoutes)
app.use('/api', userRoutes)
app.use('/api', notificationsRoutes)

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, '../client/dist')));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../client/dist', 'index.html'));
    });
}

export default app;