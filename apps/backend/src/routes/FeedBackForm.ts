import { FeedBack } from 'common/src/Feedback.ts';
import express, { Router, Request, Response } from 'express';
import logger from 'morgan';

const router: Router = express.Router();

const feedbacks: Array<FeedBack> = [
    { name: 'Alice', feedback: 'I love this app!' },
    { name: 'Bob', feedback: 'I hate this app!' },
];

function logFeedback(feedbacks: Array<FeedBack>) {
    console.log('---');
    feedbacks.forEach((feedback) => {
        console.log(feedback);
    });
    console.log('---');
}

router.get('/last', (req: Request, res: Response) => {
    const last = feedbacks[feedbacks.length - 1];
    if (last) {
        res.status(200).json(last);
    }
    logFeedback(feedbacks);
});

router.get('/all', (req: Request, res: Response) => {
    res.status(200).json(feedbacks);
});

router.patch('/:name', (req: Request, res: Response) => {
    const name = req.params.name;
    const feedback = req.body.feedback;

    const existing_record = feedbacks.find((feedback) => feedback.name === name);

    if (existing_record) {
        existing_record.feedback = feedback;
        res.status(200).json({ message: 'Feedback updated' });
    } else {
        res.status(404).json({ message: 'Feedback not found' });
    }

    logFeedback(feedbacks);
});

router.post('/', (req: Request, res: Response) => {
    const { name, feedback } = req.body;
    feedbacks.push({ name, feedback });
    res.status(200).json({ message: 'Feedback added' });

    logFeedback(feedbacks);
});

router.delete('/:name', (req: Request, res: Response) => {
    const name = req.params.name;
    const existing_record = feedbacks.find((feedback) => feedback.name === name);
    if (existing_record) {
        feedbacks.splice(feedbacks.indexOf(existing_record), 1);
        res.status(200).json({ message: 'Feedback deleted' });
    } else {
        res.status(404).json({ message: 'Feedback not found' });
    }
});

export default router;
