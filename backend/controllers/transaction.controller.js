const Transaction = require('../models/transaction.model');

const TransactionCtrl = {
    addTransaction: async (req,res) => {
        try {
            const { name, price, datetime } = req.body;
            if (!name || !price || !datetime) {
                return res.status(404).send({ message : "Send all required fields" });
            }

            const transaction = await Transaction.create({ name, price, datetime });

            res.status(200).send(transaction);
        } catch (e) {
            console.log(e.message);
            res.status(500).send({ message : e.message });
        }
    },
    viewTransaction: async (req,res) => {
        try {
            const transaction = await Transaction.find({});
            res.status(200).send(transaction);
        } catch (e) {
            console.log(e.message);
            res.status(500).send({ message : e.message });
        }
        
    },
    deleteTransaction: async (req,res) => {
        try {
            const { id } = req.params;
            const transaction = await Transaction.findByIdAndDelete(id);

            if (!transaction) {
                return res.status(404).send("Transaction not found");
            }

            res.status(200).send({message : "Transaction deleted successfully"});
        } catch (e) {
            console.log(e.message);
            res.status(500).send({ message : e.message });
        }
    },
}

module.exports = TransactionCtrl;