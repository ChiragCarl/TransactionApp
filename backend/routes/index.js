import express from "express";
 
import { 
    getAllTransaction,
    insertTransaction
} from "../controller/Transactions.js";
 
const router = express.Router();
 
router.get('/', getAllTransaction);



router.post('/', insertTransaction);

export default router;