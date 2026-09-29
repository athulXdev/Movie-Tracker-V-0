const cookieParser = require("cookie-parser");
const express = require("express");
const movieRouter = require('./routes/movieRoutes');
const userRouter = require('./routes/userRoute')
const reviewRouter = require('./routes/reviewRoutes')
const { userAuthintication } = require("./middlewares/auth");
const app = express();


app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/api/v0/movie', movieRouter);
app.use('/api/v0/user',userRouter);
app.use('/api/v0/review',reviewRouter)

module.exports = app;

