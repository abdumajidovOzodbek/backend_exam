import { Router } from "express";
import {  GLOBAL_GET, POST_CONTENT } from "../global/global.interface.js";
import { upload } from "../utils/multer.js";

const route = Router();
route.post('/post/content',upload.single('image'),POST_CONTENT);
route.get('/',GLOBAL_GET)
export default route;
