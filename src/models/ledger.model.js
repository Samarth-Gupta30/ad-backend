const mongoose = require('mongoose');


const ledgerSchema = new mongoose.Schema(
    {
        account: { 
            type: mongoose.Schema.Types.ObjectId,
            ref: 'account',
            required: [true, 'Account is required'],
            index: true,
            immutable: true,
        },
       
        amount: {
            type: Number,
            required: [true, 'Amount is required'],
            immutable: true,
            min: [0, 'Amount must be greater than 0'],
        },
         transaction: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'transaction',
            required: [true, 'Transaction is required'],
            index: true,
            immutable: true,
        },
        type: {
            type: String,
            enum: {
                values: ['DEBIT', 'CREDIT'],
                message: 'Type must be DEBIT or CREDIT',
            },
            required: [true, 'Type is required'],
            immutable: true,
        },

    },
    
);

function preventLedgerModification() {
    throw new Error('Ledger modification is not allowed');
}

ledgerSchema.pre('save', preventLedgerModification);
ledgerSchema.pre('updateOne', preventLedgerModification);
ledgerSchema.pre('findOneAndUpdate', preventLedgerModification);
ledgerSchema.pre('updateMany', preventLedgerModification);
ledgerSchema.pre('findOneAndDelete', preventLedgerModification);
ledgerSchema.pre('deleteOne', preventLedgerModification);
ledgerSchema.pre('deleteMany', preventLedgerModification);
ledgerSchema.pre('remove', preventLedgerModification);
ledgerSchema.pre('updateMany', preventLedgerModification);
ledgerSchema.pre('findOneAndReplace', preventLedgerModification);




const ledgerModel = mongoose.model('ledger', ledgerSchema);

module.exports = ledgerModel;