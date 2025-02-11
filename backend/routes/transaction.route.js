const express = require('express');
const router = express.Router();
const TransactionCtrl = require("../controllers/transaction.controller");


router.get('/',TransactionCtrl.viewTransaction);

router.post('/',TransactionCtrl.addTransaction);

router.delete('/:id',TransactionCtrl.deleteTransaction);

module.exports = router;