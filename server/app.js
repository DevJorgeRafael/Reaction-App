import express from 'express';
import path from 'path';
import fileUpload from 'express-fileupload';
import cookieParser from 'cookie-parser';
import postsRoutes from './routes/posts.routes.js'
import userRoutes from './routes/users.routes.js'
import notificationsRoutes from './routes/notifications.routes.js'
import { createServer } from 'http';

const app = express();
const server = createServer(app);

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


// Serve static files from the React frontend app
app.use(express.static(path.resolve(__dirname, '../client/dist')))

// Anything that doesn't match the above, send back the index.html file
app.get('*', (req, res) => {
    const history = createMemoryHistory();
    const location = history.location;
    const context = {};
    if (context.url) {
        res.redirect(301, context.url);
    } else {
        res.sendFile(path.resolve(__dirname, '../client/dist/index.html'));
    }
});


export { app, server }