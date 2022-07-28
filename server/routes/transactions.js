const express = require("express");
const router = express.Router();

const { getTransactions,getAllTransactions, postTransaction,deleteTransaction } = require("../controller/transactions");


router.get("/transactions", getTransactions);
router.get("/alltransactions", getAllTransactions);
router.post("/transaction" , postTransaction);
router.delete("/transaction/:id", deleteTransaction)



module.exports = router;