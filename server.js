import express from 'express';
import middlewares from './app/route/middleware';
import route from './app/route';

const app = express();

middlewares(app);
route(app);
app.listen(process.env.PORT,(err)=>{
    if(err) throw err;
    console.log(`====== Connection started on ${process.env.PORT} ===========`);
});