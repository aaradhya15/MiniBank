const express = require("express");
const router = express.Router();

const validateTransactionData = require("../../validation/transaction");
const authorizeToken = require("../../middlewares/authorization");
const adminAuthorizeToken = require("../../middlewares/adminAuthorization");



const Transaction = require("../../models/transaction");
const User = require("../../models/user");

//@route POST api/transactions/deposit
//@desc depositing money
router.post('/deposit', [authorizeToken, adminAuthorizeToken] , (req,res) => {

    //validation
    const { errors, isValid} = validateTransactionData(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }
    //Check if creditAccountNumber exists or not
    User.findOne({accountNo: req.body.creditAccountNo})
        .then(user => {if(!user){
            return res.status(400)
            .json({creditAccountNo: "Credit Account Number doesn't exist"})
        } else{
            const newTransaction = new Transaction({
                creditAccountNo : req.body.creditAccountNo,
                debitAccountNo : "1532338663407273",
                transactionType : req.body.transactionType,
                transactionAmount : req.body.transactionAmount,
                transactionDescription : req.body.transactionDescription,
                transactionStatus : 'completed' //Set the transaction status to completed
            });

            //saving the new transaction to db
            newTransaction.save()
            .then(transaction => res.json(transaction))
            .catch(err => console.log(err));

            //Updating the credit account number's balance after the transaction
            User.findOneAndUpdate({accountNo: req.body.creditAccountNo}, {$inc:{availableBalance: req.body.transactionAmount}}, {new: true})
            .then(res=> console.log(res))
            .catch(err=>console.log(err));
            User.findOneAndUpdate({accountNo: "1532338663407273"}, {$inc:{availableBalance: req.body.transactionAmount}}, {new: true})
            .then(res=> console.log(res))
            .catch(err=>console.log(err));
        }
    });

});


//@route POST api/transactions/withdrawal
//@desc withdrawing money
router.post('/withdraw', [authorizeToken, adminAuthorizeToken] ,(req,res) => {

    //validation
    const { errors, isValid} = validateTransactionData(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }
    //Check if debitAccountNumber exists or not
    User.findOne({accountNo: req.body.debitAccountNo})
        .then(user => {if(!user){
            return res.status(400)
            .json({debitAccountNo: "Debit Account Number doesn't exist"})
        }
        //check if the balance is sufficient to make the transaction
        else if(user.availableBalance < req.body.transactionAmount){
            return res.status(400)
            .json({availableBalance: " Insufficient Balance"})
        }
            else {
            const newTransaction = new Transaction({
                debitAccountNo : req.body.debitAccountNo,
                creditAccountNo : "1532338663407273",
                transactionType : req.body.transactionType,
                transactionAmount : req.body.transactionAmount,
                transactionDescription : req.body.transactionDescription,
                transactionStatus : 'completed' //Set the transaction status to completed
            });

            //saving the new transaction to db
            newTransaction.save()
            .then(transaction => res.json(transaction))
            .catch(err => console.log(err));

            //Updating the debit account number's balance after the transaction
            User.findOneAndUpdate({accountNo: req.body.debitAccountNo}, {$inc:{availableBalance: req.body.transactionAmount*(-1)}}, {new: true})
            .then(res=> console.log(res))
            .catch(err=>console.log(err));
            User.findOneAndUpdate({accountNo: "1532338663407273"}, {$inc:{availableBalance: req.body.transactionAmount*(-1)}}, {new: true})
            .then(res=> console.log(res))
            .catch(err=>console.log(err));
        }
    });

});

//@route POST api/transactions/transfer
//@desc transfering money
router.post('/transfer', [authorizeToken] ,(req,res) => {

    //validation
    const { errors, isValid} = validateTransactionData(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }
    //Check if creditAccountNumber exists or not
    User.findOne({accountNo: req.body.creditAccountNo})
        .then(user => {if(!user){
            return res.status(400)
            .json({creditAccountNo: "Credit Account Number doesn't exist"});
        }})

        //check if debitAccountNumber exists or not
        User.findOne({accountNo: req.body.debitAccountNo})
        .then(user => {if(!user){
        return res.status(400)
        .json({debitAccountNo: "Debit Account Number doesn't exist"})
        }
        
        //check if the balance is sufficient to make the transaction
        else if(user.availableBalance < req.body.transactionAmount){
            return res.status(400)
            .json({availableBalance: " Insufficient Balance"})
        }
            else {
            const newTransaction = new Transaction({
                debitAccountNo : req.body.debitAccountNo,
                creditAccountNo : req.body.creditAccountNo,
                transactionType : req.body.transactionType,
                transactionAmount : req.body.transactionAmount,
                transactionDescription : req.body.transactionDescription,
                transactionStatus : 'completed' //Set the transaction status to completed
            });

            //saving the new transaction to db
            newTransaction.save()
            .then(transaction => {res.json(transaction)

            //Updating the debit account number's balance after the transaction
            User.findOneAndUpdate({accountNo: req.body.debitAccountNo}, {$inc:{availableBalance: req.body.transactionAmount*(-1)}}, {new: true})
            .then(res=> console.log(res))
            .catch(err=>console.log(err));

            //Updating the credit account number's balance after the transaction
            User.findOneAndUpdate({accountNo: req.body.creditAccountNo}, {$inc:{availableBalance: req.body.transactionAmount}}, {new: true})
            .then(res=> console.log(res))
            .catch(err=>console.log(err));

            })
            .catch(err => console.log(err));

            
           
        }
    
    });

});

//@route /api/transactions
//@desc get all the transactions
router.get('/', (req,res)=>{
    Transaction.find()
    .then(transactions => { 
        if(!transactions){
            return res.status(400).json({noTransactions : "No transactions found!"});
        }
        res.send(transactions);
    })
    .catch(err => { res.status(400).send(err)});
})


//@route /api/transactions/accountNo
//@desc transactions from a particular account
router.get('/:accountNo', [authorizeToken], (req,res)=>{

    const { accountNo } = req.params;
    Transaction.find().or([{ 'creditAccountNo': accountNo }, { 'debitAccountNo': accountNo }])
    .then(transactions => { 
        if(!transactions){
            return res.status(400).json({noTransactions : "No transactions found!"});
        }
        res.status(200).json({transactions: transactions});
    })
    .catch(err => { res.status(400).send(err)});
})



module.exports = router;