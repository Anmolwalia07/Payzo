import express from "express";
import {
  blockAccount,
  getAccountDetail,
  createAccountDetail,
  updateAccountDetail,
  deleteAccount,
  decreaseAccountBalance,
  increaseAccountBalance
} from "../controller/bankAccountController";

const router = express.Router();

//@ts-ignore
router.get('/', getAccountDetail);
//@ts-ignore
router.post('/', createAccountDetail);
//@ts-ignore
router.put('/:id', updateAccountDetail);
//@ts-ignore
router.patch('/block/:id', blockAccount);
//@ts-ignore
router.delete('/:id', deleteAccount);

//@ts-ignore
router.put('/updateBalance/:id',decreaseAccountBalance);

//@ts-ignore
router.put('/increaseBalance/:id',increaseAccountBalance);

export default router;
