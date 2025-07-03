import express from "express";
import { balanceUpadateInAccount, offRamping } from "../controller/merchantController";


const router = express.Router();

router.post('/withdraw', balanceUpadateInAccount);
router.put('/offRamping', offRamping);



export default router;
