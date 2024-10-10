import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { getRecruiterJobs, getAllJobs, getJobById, postJob, saveJob, unsaveJob, isJobSaved, getSavedJobs } from "../controllers/job.controller.js";

const router = express.Router();

router.route("/post").post(isAuthenticated, postJob);
router.route("/get").get( getAllJobs);
router.route("/recruiter-jobs").get(isAuthenticated, getRecruiterJobs);
router.route("/get/:id").get(getJobById);
// Route for saving a job
router.route('/save-job').post(saveJob);
// Route for unsaving a job
router.route('/unsave-job').post(unsaveJob);
router.route('/is-saved').post(isJobSaved);
router.route('/get-saved-jobs/:userId').get(getSavedJobs);

export default router;
