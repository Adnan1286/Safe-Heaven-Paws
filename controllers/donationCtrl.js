const DonationBalance = require("../models/donationBalanceModel");
const donationRequestModel = require("../models/donationRequestModel");

// Initialize or get donation balance
const initializeDonationBalance = async () => {
    let balance = await DonationBalance.findOne();
    if (!balance) {
        balance = new DonationBalance();
        await balance.save();
    }
    return balance;
};

// Submit new donation request
const submitRequest = async (req, res) => {
    try {
        const { name, reason, amountNeeded, contact } = req.body;
        
        // Validate required fields
        if (!name || !reason || !amountNeeded || !contact) {
            return res.status(400).send({
                success: false,
                message: "All fields are required"
            });
        }

        // Get userId from auth middleware
        const userId = req.body.userId;

        const newRequest = new donationRequestModel({
            name,
            reason,
            amountNeeded,
            contact,
            userId,
            status: 'pending' // Add default status
        });

        await newRequest.save();
        res.status(200).send({
            success: true,
            message: "Request submitted successfully",
            request: newRequest
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: "Error in submitting request",
            error: error.message
        });
    }
};

// Get all requests (for admin)
const getAllRequests = async (req, res) => {
    try {
        const requests = await donationRequestModel.find({});
        res.status(200).send({
            success: true,
            requests
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in getting requests",
            error
        });
    }
};

// Get user's requests
const getUserRequests = async (req, res) => {
    try {
        const requests = await donationRequestModel.find({ userId: req.body.userId });
        res.status(200).send({
            success: true,
            requests
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in getting user requests",
            error
        });
    }
};

// Approve request
const approveRequest = async (req, res) => {
    try {
        const request = await donationRequestModel.findById(req.params.id);
        if (!request) {
            return res.status(404).send({
                success: false,
                message: "Request not found"
            });
        }

        const balance = await initializeDonationBalance();
        
        if (balance.totalBalance < request.amountNeeded) {
            return res.status(400).send({
                success: false,
                message: "Insufficient donation balance"
            });
        }

        // Add withdrawal transaction
        balance.transactions.push({
            type: 'withdrawal',
            amount: request.amountNeeded,
            userId: request.userId,
            requestId: request._id,
            description: `Approved donation request: ${request.reason}`
        });

        // Update balance
        balance.totalBalance -= request.amountNeeded;
        await balance.save();

        // Update request status
        request.status = 'approved';
        await request.save();

        res.status(200).send({
            success: true,
            message: "Request approved successfully",
            newBalance: balance.totalBalance
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in approving request",
            error
        });
    }
};

// Reject request
const rejectRequest = async (req, res) => {
    try {
        const request = await donationRequestModel.findByIdAndUpdate(
            req.params.id,
            { status: 'rejected' },
            { new: true }
        );
        res.status(200).send({
            success: true,
            message: "Request rejected successfully",
            request
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in rejecting request",
            error
        });
    }
};

// Get donation balance
const getDonationBalance = async (req, res) => {
    try {
        const balance = await initializeDonationBalance();
        res.status(200).send({
            success: true,
            balance: balance.totalBalance
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in getting balance",
            error
        });
    }
};

// Add donation
const addDonation = async (req, res) => {
    try {
        const { amount } = req.body;
        if (!amount || amount <= 0) {
            return res.status(400).send({
                success: false,
                message: "Invalid donation amount"
            });
        }

        const balance = await initializeDonationBalance();
        
        // Add transaction and update balance
        balance.transactions.push({
            type: 'donation',
            amount: amount,
            userId: req.body.userId,
            description: 'User donation'
        });
        
        balance.totalBalance += Number(amount);
        await balance.save();

        res.status(200).send({
            success: true,
            message: "Donation added successfully",
            newBalance: balance.totalBalance
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error processing donation",
            error
        });
    }
};

// Get transaction history
const getTransactionHistory = async (req, res) => {
    try {
        const balance = await initializeDonationBalance();
        const transactions = await DonationBalance.findOne()
            .populate('transactions.userId', 'name')
            .populate('transactions.requestId', 'reason');

        res.status(200).send({
            success: true,
            transactions: transactions.transactions.sort((a, b) => b.timestamp - a.timestamp)
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error getting transaction history",
            error
        });
    }
};

module.exports = {
    submitRequest,
    getAllRequests,
    getUserRequests,
    approveRequest,
    rejectRequest,
    getDonationBalance,
    addDonation,
    getTransactionHistory
}; 