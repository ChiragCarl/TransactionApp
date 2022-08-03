import transactionDB from "../models/TransactionModel.js";
 
//create Transaction
export const insertTransaction= async (req, res) => {
    try {
        await transactionDB.create(req.body);
        res.json({
            "message": "Transaction Saved"
        });
    } catch (error) {
        res.json({ message: error.message });
    }  
}
 

export const getAllTransaction = async (req, res) => {
    try {
        const getData = await transactionDB.findAll();
        res.json(getData);
    } catch (error) {
        res.json({ message: error.message });
    }  
}
