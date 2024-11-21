import { dashboard } from "../../controllers/admin.controller.js";
import isAdmin from "../../middlewares/isAdmin.js";
import verifyAuth from "../../middlewares/verifyAuth.js";

import express from 'express'
const router = express.Router()

router.post('/dashboard',verifyAuth, isAdmin, dashboard )

export default router;