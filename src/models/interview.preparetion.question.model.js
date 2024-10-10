import mongoose from "mongoose";

const interviewPrepQuestionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ['HTML', 'CSS', 'JavaScript', 'ReactJS', 'NextJS', 'Express', 'NodeJS', 'MongoDB', 'SQL'],  // Fixed categories
    required: true,
  },
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],  // Optional: to classify questions based on difficulty
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const InterviewPrepQuestion = mongoose.model('InterviewQuestion', interviewPrepQuestionSchema);
