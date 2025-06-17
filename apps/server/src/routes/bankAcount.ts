import express from "express";
import {
  blockAccount,
  getAccountDetail,
  createAccountDetail,
  updateAccountDetail,
  deleteAccount
} from "../controller/bankAccountController";

const router = express.Router();

router.get('/', getAccountDetail);
router.post('/', createAccountDetail);
router.put('/:id', updateAccountDetail);
router.patch('/block/:id', blockAccount);
router.delete('/:id', deleteAccount)    ;

export default router;
