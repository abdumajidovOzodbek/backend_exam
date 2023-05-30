import express, { urlencoded } from "express";
import { PORT } from "./configure.js";
import { resolve } from "path";
import cookieParser from "cookie-parser";
import route from "./routers/admin.router.js";

const app = express();
app.use(express.json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(route);
app.use(express.static(resolve('uploads')))
app.use(express.static(resolve('avatar')))
app.use((err, req, res, next) => {
  if(err){
    res.clearCookie("token").redirect('/login')
  }
});

app.listen(PORT, console.log(`server running on port ${PORT}`));
