import express from 'express';
import fileUpload from 'express-fileupload';
import cookieParser from 'cookie-parser';
import postsRoutes from './routes/posts.routes.js'
import userRoutes from './routes/users.routes.js'
import notificationsRoutes from './routes/notifications.routes.js'
import { createServer } from 'http';
import { PORT } from './config/config.js'

const app = express();

//middlewares
app.use(express.json())
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: './upload'
}))
app.use(cookieParser())

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
});

//routes
app.use(postsRoutes)
app.use(userRoutes)
app.use(notificationsRoutes)

const server = app.listen(PORT, () => {
    console.log('Server on port', PORT);
});

export default server;
