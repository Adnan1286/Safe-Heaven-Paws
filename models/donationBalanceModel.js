const mongoose = require("mongoose");

const donationBalanceSchema = new mongoose.Schema({
    totalBalance: {
        type: Number,
        required: true,
        default: 2000 // Initial balance
    },
    transactions: [{
        type: {
            type: String,
            enum: ['donation', 'withdrawal'],
            required: true
        },
        amount: {
            type: Number,
            required: true
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users',
            required: true
        },
        requestId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'donationRequests'
        },
        description: String,
        timestamp: {
            type: Date,
            default: Date.now
        }
    }]
}, { timestamps: true });

const DonationBalance = mongoose.model('donationBalance', donationBalanceSchema);
module.exports = DonationBalance;