const userModel = require("../models/userModels");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//register callback
const registerController = async(req,res) => {
    try{
        const existingUser = await userModel.findOne({email:req.body.email});
        if(existingUser){
            return res.status(200).send({message:`User Already Exist`,success:false})            
        }
        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const HashedPassword = await bcrypt.hash(password,salt);
        req.body.password = HashedPassword;
        const newUser = new userModel(req.body);
        await newUser.save();
        res.status(201).send({message:`Register Successfully`,success:true});
        
    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message: `Register Controller ${error.message}`
        })
    }
}


//login callback
const loginController = async (req,res) => {
    try {
        const user = await userModel.findOne({email:req.body.email});
        if(!user){
            return res.status(200).send({message:`User not found`,success:false});
        }
        const isMatch = await bcrypt.compare(req.body.password,user.password);
        if(!isMatch){
            return res.status(200).send({message:`Invalid Email or Password`,success:false});
        }
        const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"1d"});     
        res.status(200).send({
            message:`Login Successfully`,
            success:true,
            token,
            email:user.email,
            name:user.name,
            role:user.role
        });
    } catch(error) {
        console.log(error);
        res.status(500).send({
            success:false, 
            message:`Login Controller ${error.message}`
        });
    }
}

const authController = async(req,res) => {
    try {
        const user = await userModel.findOne({_id:req.body.userId});
        if(!user){
            return res.status(200).send({message:"User not found",success:false});
        }else{
            res.status(200).send({
                message:"Auth Success",
                success:true,
                data:{
                    name:user.name,
                    email:user.email,
                    role:user.role
                }
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({message:"Auth Failed",success:false});
    }
}

const getUserProfileController = async (req, res) => {
    try {
        const user = await userModel.findById(req.body.userId).select('-password');
        res.status(200).send({
            success: true,
            data: user
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error fetching user profile'
        });
    }
};

const updateUserProfileController = async (req, res) => {
    try {
        const user = await userModel.findById(req.body.userId);
        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'User not found'
            });
        }

        // Verify current password if provided
        if (req.body.currentPassword) {
            const isMatch = await bcrypt.compare(req.body.currentPassword, user.password);
            if (!isMatch) {
                return res.status(400).send({
                    success: false,
                    message: 'Current password is incorrect'
                });
            }
        }

        // Update user data
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;

        // Update password if new password is provided
        if (req.body.newPassword) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(req.body.newPassword, salt);
        }

        await user.save();

        res.status(200).send({
            success: true,
            message: 'Profile updated successfully'
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error updating profile'
        });
    }
};

module.exports = {
    loginController,
    registerController,
    authController,
    getUserProfileController,
    updateUserProfileController
};
