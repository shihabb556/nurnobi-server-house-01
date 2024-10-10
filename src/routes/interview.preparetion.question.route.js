import express from 'express';
import { addQuestion, getQuestions,getQuestionById } from '../controllers/interview.preparetion.question.controller.js';


const router = express.Router();


// get all question - public route 
router.route('/').get(getQuestions);

// get single question by id - public route 
router.route('/:id').get(getQuestions);

// add question - admin route 
router.route('/').post(addQuestion);



export default router;
