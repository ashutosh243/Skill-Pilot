import express from 'express';
import { pathDetails, pathGenerate, pathDecision, startPath, getPath, getSinglepath } from '../controllers/path.controller.js';
import { authmiddlware } from '../middlewares/auth.middleware.js';


const router = express.Router();

router.post('/path-details', authmiddlware, pathDetails);
router.post('/path-generate', authmiddlware, pathGenerate)
router.post('/path-decision', authmiddlware, pathDecision);
router.post('/path-start', authmiddlware, startPath);
router.get('/all-path', authmiddlware, getPath);
router.get('/:id', authmiddlware, getSinglepath);

export default router;

