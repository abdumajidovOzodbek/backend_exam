import { Router } from "express";
import {  GLOBAL_GET, POST_CONTENT, SINGLE_PAGE } from "../global/global.interface.js";
import { upload } from "../utils/multer.js";
import validate from '../middlewares/validate.js';
import { NOT_VERIFICATE_USERS, POST, VERIFICATE } from "../admin/admin.controller.js";
import CHECKTOKEN from "../middlewares/checktoken.js";


const route = Router();
route.get('/', GLOBAL_GET)
route.post('/upload',upload.single('image'),validate,POST_CONTENT);
route.post('/login',validate,POST);
route.get('/single/:id', SINGLE_PAGE )
route.get('/verificate/:id/:status',CHECKTOKEN,VERIFICATE)
route.get('/verificate',CHECKTOKEN,NOT_VERIFICATE_USERS)
export default route;
