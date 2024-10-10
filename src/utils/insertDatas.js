import { InterviewPrepQuestion } from "../models/interview.preparetion.question.model.js";
import { Job } from "../models/job.model.js";

import connectDB from "./db.js";
import mongoose from "mongoose";

connectDB();
  
export const insertQNA = async () => {  // Insert the data
InterviewPrepQuestion.insertMany(qnaData)
.then((docs) => {
  console.log('QnA data inserted successfully:', docs);
})
.catch((err) => {
  console.error('Error inserting QnA data:', err);
})
}



const jobs = [
  {
    "_id": new mongoose.Types.ObjectId(),
    "title": "QA Engineer",
    "description": "Ensure the quality of software products through testing and bug tracking.",
    "category": "QA Engineer",
    "requirements": [
      "Experience with manual and automated testing",
      "Knowledge of QA methodologies and tools",
      "Ability to identify and document bugs"
    ],
    "salary": 130,
    "experienceLevel": 3,
    "location": "Dhaka",
    "jobType": "Full-time",
    "position": 1,
    "company": new mongoose.Types.ObjectId("66d668786aad1da8b6cea296"),  // JobHunt
    "created_by": new mongoose.Types.ObjectId("66d661b36aad1da8b6cea21a"),  // Recruiter 2
    "applications": [],
    "createdAt": new Date(),
    "updatedAt": new Date(),
    "__v": 0
  },
  {
    "_id": new mongoose.Types.ObjectId(),
    "title": "Test Automation Engineer",
    "description": "Develop automated test scripts and frameworks to enhance software quality.",
    "category": "Test Automation Engineer",
    "requirements": [
      "Experience with test automation tools and frameworks",
      "Knowledge of scripting languages and test case design",
      "Ability to integrate automated tests into CI/CD pipelines"
    ],
    "salary": 150,
    "experienceLevel": 4,
    "location": "Chattogram",
    "jobType": "Contract",
    "position": 1,
    "company": new mongoose.Types.ObjectId("66a649d1141ac1dde226cb1e"),  // Google
    "created_by": new mongoose.Types.ObjectId("66a61a850e14354e93434571"),  // Recruiter 1
    "applications": [],
    "createdAt": new Date(),
    "updatedAt": new Date(),
    "__v": 0
  },
  {
    "_id": new mongoose.Types.ObjectId(),
    "title": "Performance Tester",
    "description": "Conduct performance testing to ensure application scalability and stability.",
    "category": "Performance Tester",
    "requirements": [
      "Experience with performance testing tools and techniques",
      "Knowledge of performance metrics and optimization",
      "Ability to analyze and report performance issues"
    ],
    "salary": 140,
    "experienceLevel": 4,
    "location": "Sylhet",
    "jobType": "Full-time",
    "position": 1,
    "company": new mongoose.Types.ObjectId("66deedc6ed7d4d85764e9b13"),  // Advance AI Inc.
    "created_by": new mongoose.Types.ObjectId("66d661b36aad1da8b6cea21a"),  // Recruiter 2
    "applications": [],
    "createdAt": new Date(),
    "updatedAt": new Date(),
    "__v": 0
  },
  {
    "_id": new mongoose.Types.ObjectId(),
    "title": "Manual Tester",
    "description": "Perform manual testing of software applications to identify bugs and ensure quality.",
    "category": "Manual Tester",
    "requirements": [
      "Experience with manual testing methodologies",
      "Knowledge of test case creation and execution",
      "Ability to document and communicate defects"
    ],
    "salary": 120,
    "experienceLevel": 2,
    "location": "Rajshahi",
    "jobType": "Part-time",
    "position": 1,
    "company": new mongoose.Types.ObjectId("66a649d1141ac1dde226cb1e"),  // Google
    "created_by": new mongoose.Types.ObjectId("66a61a850e14354e93434571"),  // Recruiter 1
    "applications": [],
    "createdAt": new Date(),
    "updatedAt": new Date(),
    "__v": 0
  },
  {
    "_id": new mongoose.Types.ObjectId(),
    "title": "Blockchain Developer",
    "description": "Develop and implement blockchain technologies and solutions.",
    "category": "Blockchain Developer",
    "requirements": [
      "Experience with blockchain platforms and technologies",
      "Knowledge of smart contracts and distributed ledger technology",
      "Ability to develop and deploy blockchain solutions"
    ],
    "salary": 180,
    "experienceLevel": 5,
    "location": "Dhaka",
    "jobType": "Full-time",
    "position": 1,
    "company": new mongoose.Types.ObjectId("66d668786aad1da8b6cea296"),  // JobHunt
    "created_by": new mongoose.Types.ObjectId("66d661b36aad1da8b6cea21a"),  // Recruiter 2
    "applications": [],
    "createdAt": new Date(),
    "updatedAt": new Date(),
    "__v": 0
  },
  {
    "_id": new mongoose.Types.ObjectId(),
    "title": "Smart Contract Developer",
    "description": "Design and develop smart contracts for blockchain applications.",
    "category": "Smart Contract Developer",
    "requirements": [
      "Experience with smart contract development and blockchain platforms",
      "Knowledge of Solidity and other smart contract languages",
      "Ability to test and deploy smart contracts"
    ],
    "salary": 195,
    "experienceLevel": 5,
    "location": "Chattogram",
    "jobType": "Full-time",
    "position": 1,
    "company": new mongoose.Types.ObjectId("66deedc6ed7d4d85764e9b13"),  // Advance AI Inc.
    "created_by": new mongoose.Types.ObjectId("66d661b36aad1da8b6cea21a"),  // Recruiter 2
    "applications": [],
    "createdAt": new Date(),
    "updatedAt": new Date(),
    "__v": 0
  },
  {
    "_id": new mongoose.Types.ObjectId(),
    "title": "Web3 Developer",
    "description": "Develop decentralized applications using Web3 technologies.",
    "category": "Web3 Developer",
    "requirements": [
      "Experience with Web3 technologies and decentralized applications",
      "Knowledge of blockchain and smart contracts",
      "Ability to integrate Web3 solutions with existing systems"
    ],
    "salary": 170,
    "experienceLevel": 4,
    "location": "Sylhet",
    "jobType": "Contract",
    "position": 1,
    "company": new mongoose.Types.ObjectId("66a649d1141ac1dde226cb1e"),  // Google
    "created_by": new mongoose.Types.ObjectId("66a61a850e14354e93434571"),  // Recruiter 1
    "applications": [],
    "createdAt": new Date(),
    "updatedAt": new Date(),
    "__v": 0
  },
  {
    "_id": new mongoose.Types.ObjectId(),
    "title": "Crypto Analyst",
    "description": "Analyze cryptocurrency markets and provide insights and recommendations.",
    "category": "Crypto Analyst",
    "requirements": [
      "Experience with cryptocurrency market analysis",
      "Knowledge of blockchain technology and financial markets",
      "Ability to create and present market reports"
    ],
    "salary": 145,
    "experienceLevel": 4,
    "location": "Rajshahi",
    "jobType": "Full-time",
    "position": 1,
    "company": new mongoose.Types.ObjectId("66deedc6ed7d4d85764e9b13"),  // Advance AI Inc.
    "created_by": new mongoose.Types.ObjectId("66d661b36aad1da8b6cea21a"),  // Recruiter 2
    "applications": [],
    "createdAt": new Date(),
    "updatedAt": new Date(),
    "__v": 0
  }
];





export const insertJobs = async ()=>{
  Job.insertMany(jobs)
  .then((docs) => {
    console.log('QnA data inserted successfully:', docs);
  })
  .catch((err) => {
    console.error('Error inserting QnA data:', err);
  })
}