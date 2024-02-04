import { connectDB } from './db.js'
import {PORT} from './config/config.js'
import app from './app.js'

connectDB() 
app.listen(PORT)
console.log('Server on port', PORT)