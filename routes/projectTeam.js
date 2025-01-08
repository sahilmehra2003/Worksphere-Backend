import express from 'express';
import { createTeam } from '../controllers/teamController.js'; 
const router=express.Router();

router.post("/teams/create",createTeam);
router.put("/teams/update",)
export default router;