import express  from "express";
import { register, login, google} from '../controllers/user.controller.js';

const router = express.Router();

router.post('/register', register)
router.post('/login', login)
router.post('/google', google)

export default router;