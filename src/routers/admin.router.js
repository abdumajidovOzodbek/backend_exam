import { Router } from "express";
import {  GLOBAL_GET, POST_CONTENT,VERIFICATE,NOT_VERIFICATE_USERS } from "../global/global.interface.js";
import { upload } from "../utils/multer.js";
import validate from '../middlewares/validate.js';
import { POST } from "../admin/admin.controller.js";


const route = Router();
route.post('/post',upload.single('image'),validate,POST_CONTENT);
route.post('/login',validate,POST);
route.get('/', GLOBAL_GET)
route.get('/verificate/:id/:status',VERIFICATE)
route.get('/verificate',NOT_VERIFICATE_USERS)
export default route;
