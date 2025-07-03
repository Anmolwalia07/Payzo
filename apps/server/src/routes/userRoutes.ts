import express from "express";
import { offRamping, addByRazorpay, withdrawFromWallet, addtoWallet, onRamping } from "../controller/userController"


const router = express.Router();

router.post('/bank-webhook', addtoWallet);
router.put('/offRamping', offRamping);
router.put('/onRamping',onRamping);
router.post("/withdraw/bank-webhook",withdrawFromWallet)
router.post("/razorpay-webhook",addByRazorpay);



export default router;
