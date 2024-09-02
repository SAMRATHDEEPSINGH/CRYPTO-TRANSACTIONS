import { Router } from "express";
import { createTransaction } from "../controllers/Transaction.controller.js";

const router=Router();
router.route("/").post(createTransaction);

export default router;