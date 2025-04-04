import express, { Router, Request, Response } from 'express';
import { FeedBack } from 'common/src/Feedback.ts';
const router: Router = express.Router();

router.get('/', (req: Request, res: Response) => {
    res.status(200).json({ status: 'ok' });
});

router.put('/', (req: Request, res: Response) => {
    res.status(200).json({ status: 'ok' });
});

export default router;
