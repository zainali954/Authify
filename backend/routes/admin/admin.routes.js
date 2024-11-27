import { dashboard, getAllUsers,deleteUser } from "../../controllers/admin.controller.js";
import isAdmin from "../../middlewares/isAdmin.js";
import verifyAuth from "../../middlewares/verifyAuth.js";

import express from 'express'
const router = express.Router()

router.post('/dashboard',verifyAuth, isAdmin, dashboard )
router.get('/get-all-users',verifyAuth, isAdmin, getAllUsers )

router.post('/delete-user/:id', verifyAuth, isAdmin, deleteUser)

export default router;