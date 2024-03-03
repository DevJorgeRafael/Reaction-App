import express from 'express';
import fileUpload from 'express-fileupload';
import cookieParser from 'cookie-parser';
import postsRoutes from './routes/posts.routes.js'
import userRoutes from './routes/users.routes.js'
import notificationsRoutes from './routes/notifications.routes.js'
import path from 'path'
import { createServer } from 'http';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

//middlewares
app.use(express.json())
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: './upload'
}))
app.use(cookieParser())

app.use((req, res, next) => {
    const allowedOrigins = ['http://localhost:5173', 'https://reaction-app.up.railway.app'];
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
    // Sirve los archivos estáticos desde la carpeta 'dist' de tu aplicación Vite
    app.use(express.static(path.resolve(__dirname, '../client/dist')));

    // Asegúrate de que todas las rutas no manejadas sirvan tu archivo index.html
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../client/dist', 'index.html'));
    });
}

export default app;
