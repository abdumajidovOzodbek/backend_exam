import express, { urlencoded } from "express";
import { PORT } from "./configure.js";
import { resolve } from "path";
import cookieParser from "cookie-parser";
import route from "./routers/admin.router.js";
import swaggerUi from './swagger.js'
const app = express();
app.use(express.json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(route);
app.use(express.static(resolve('uploads')))
app.use(express.static(resolve('avatar')))
app.use((err, req, res, next) => {
 res.status(400).json({status:400,message: err.message})
 console.log(err);
});
app.use('/api-docs',swaggerUi)
app.listen(PORT, console.log(`server running on port ${PORT}`));
