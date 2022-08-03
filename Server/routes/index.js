import express from "express";
 
import { 
    getAllTransaction,
    insertTransaction,
    getProductById,
    updateProduct,
    deleteProduct
} from "../controller/Transactions.js";
 
const router = express.Router();
 
router.get('/', getAllTransaction);
router.get('/:id', getProductById);
router.post('/', insertTransaction);
router.patch('/:id', updateProduct);
router.delete('/:id', deleteProduct);
 
export default router;