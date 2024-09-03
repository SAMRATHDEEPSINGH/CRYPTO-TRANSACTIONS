import { Router } from "express";
import { createTransaction,getexpenses } from "../controllers/Transaction.controller.js";

const router=Router();
router.route("/").post(createTransaction);
router.route("/expenses").get(getexpenses);

export default router;