import express from 'express';
import { generateInterviewquestion } from '../controllers/question.controller.js';
import { authmiddlware } from '../middlewares/auth.middleware.js';

const router = express.Router();
export default router;

router.post('/question', authmiddlware, generateInterviewquestion);