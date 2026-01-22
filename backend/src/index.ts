import express from 'express';
import connection from './utils/Db.js';
import config from './config/config.js';
import authRoutes from './routes/auth.routes.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import pathRoutes from './routes/path.routes.js';
import interviewRoutes from './routes/questions.routes.js';
import {startCron} from './cron/plan.cron.js';




const app=express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));


app.use('/api/v1/auth',authRoutes);
app.use('/api/v1/path',pathRoutes);
app.use('/api/v1/interview',interviewRoutes);



startCron();

app.listen(config.port,()=>{
    console.log('server is listening on port',config.port);
    connection();
});