import { Router } from 'express';
import { answer_question_rt_server } from '../../app/ws/matches_socket';
import { eWs } from '../../server';

const ANSWER_QUESTION = '/answer-question-rt';
const router = Router();

router.ws(ANSWER_QUESTION, answer_question_rt_server);

export const answerQuestionServer = eWs.getWss(ANSWER_QUESTION);
export default router;
