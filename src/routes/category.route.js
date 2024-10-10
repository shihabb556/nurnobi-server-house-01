import express from 'express';
import { addCategory , getCategories} from '../controllers/category.controller.js';
import isAuthenticated from '../middlewares/isAuthenticated.js';


const router = express.Router();

//route for creating category
router.route('/').post(addCategory);

//route for getall category
router.route('/').get(getCategories);


export default router;