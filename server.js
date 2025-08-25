const dotenv = require('dotenv');
const express = require('express');
const app = express();
const {notFound,errorHandler} = require('./middleware/errorHandling');
const {connectDB} = require('./config/db')
const authRoutes = require('./routes/authRoutes');
const todoRoutes = require("./routes/todoRoutes");
const cors = require("cors");
const cookieParser = require("cookie-parser");



dotenv.config();
connectDB();


app.use(express.json());
app.use(cors());
app.use(cookieParser());


app.get('/',(req,res)=>{
    res.send("this is a page");
})
app.use("/auth", authRoutes);
app.use("/todo", todoRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(process.env.PORT,()=>{
    console.log(`server is live ${process.env.PORT}`);
})