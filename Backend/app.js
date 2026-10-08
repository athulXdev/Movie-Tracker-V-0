const cookieParser = require("cookie-parser");
const express = require("express");
const cors = require('cors')
const movieRouter = require('./routes/movieRoutes');
const reportRoute = require('./routes/reportRoute')
const userRouter = require('./routes/userRoute')
const adminRouter = require('./routes/adminRoutes')
const reviewRouter = require('./routes/reviewRoutes')
const { userAuthintication } = require("./middlewares/auth");
const app = express();


app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(cors({
    origin:'http://localhost:5173',
    credentials:true
}))

app.use('/api/v0/movie', movieRouter);
app.use('/api/v0/user',userRouter);
app.use('/api/v0/review',reviewRouter)
app.use('/api/v0/report',reportRoute)
app.use('/api/v0/admin',adminRouter)
module.exports = app;

