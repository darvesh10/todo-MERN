const dotenv = require('dotenv');
const express = require('express');
const app = express();
const {notFound,errorHandler} = require('./middleware/errorHandling');
const {connectDB} = require('./config/db')


dotenv.config();
connectDB();

app.get('/',(req,res)=>{
    res.send("this is a page");
})


app.use(notFound);
app.use(errorHandler);

app.listen(process.env.PORT,()=>{
    console.log(`server is live ${process.env.PORT}`);
})