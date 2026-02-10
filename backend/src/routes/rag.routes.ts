import express from 'express';
import { ingestPdf, retrieve } from '../controllers/rag.controller.js';
import upload from '../utils/multer.js';
import { authmiddlware } from '../middlewares/auth.middleware.js';



const router = express.Router();

router.post('/ingest', authmiddlware, upload.single('kb'), ingestPdf);
router.post('/query', authmiddlware, retrieve);

export default router;

