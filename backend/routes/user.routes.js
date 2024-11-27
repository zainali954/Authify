import { changeUserDetails } from "../controllers/user.controller.js";
import express from 'express'
import verifyAuth from "../middlewares/verifyAuth.js";
const router = express.Router()

router.put('/edit-details', verifyAuth, changeUserDetails)

export default router;