import { InterviewPrepQuestion } from "../models/interview.preparetion.question.model.js";


//get all questions - public route
export const getQuestions =async (req , res) =>{
    try {
        const { category } = req.query;
        let questions;
        if (category === 'All') {
          questions = await InterviewPrepQuestion.find(); // Fetch all questions
        } else {
          questions = await InterviewPrepQuestion.find({ category });
        }
    
        res.status(200).json(questions);
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch questions' });
      }
};

//get single question by id - public route
export const getQuestionById =async (req , res) =>{
    try {
        const { id } = req.params;  // Extracting ID from request parameters
    
        // Find the question by its ID
        const question = await InterviewPrepQuestion.findById(id);
    
        // Check if question exists
        if (!question) {
          return res.status(404).json({ error: 'Question not found' });
        }
    
        // Send the question as a response
        res.status(200).json(question);
      } catch (error) {
        // Handle any errors during the process
        res.status(400).json({ error: error.message });
      }
   }

// add question - admin route
export const addQuestion =async (req , res) =>{
    try {
        const { question, answer, category, difficulty } = req.body;
    
        // Validate the required fields
        if (!question || !answer || !category || !difficulty) {
          return res.status(400).json({ error: 'All fields are required' });
        }
    
        const newQuestion = new InterviewPrepQuestion({
          question,
          answer,
          category,
          difficulty,
        });
    
        await newQuestion.save();
        res.status(201).json({ message: 'Question added successfully', newQuestion });
      }catch (error) {
        res.status(500).json({ error: 'Failed to add question' });
      }
};
