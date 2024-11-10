import {Router} from 'express';
const router = Router();
import { urlShortner, redirect } from './url-controller';

router.route('/shorten').post(urlShortner);
router.route('/:urlId').get(redirect);

export default router;