import User from "../model/user.model.js";
import bcryptjs from "bcryptjs";
export const signup = async(req, res) => {
    try {
        const { fullname, email, password } = req.body;
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }
        const hashPassword = await bcryptjs.hash(password, 10);
        const createdUser = new User({
            fullname: fullname,
            email: email,
            password: hashPassword,
        });
        await createdUser.save();
        res.status(201).json({
            message: "User created successfully",
            user: {
                _id: createdUser._id,
                fullname: createdUser.fullname,
                email: createdUser.email,
            },
        });
    } catch (error) {
        console.log("Error: " + error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};
export const login = async(req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({email});
        const isMatch = await bcryptjs.compare(password, user.password);
        if (!user || !isMatch) {
            return res.status(400).json({ message: "Invalid username or password", email: email, password: password });
        } else {
            res.status(200).json({
                message: "Login successful",
                user: {
                    _id: user._id,
                    fullname: user.fullname,
                    email: user.email,
                },
            });
        }
    } catch (error) {
        console.log("Error: " + error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

const userData = async(req, res) =>  {
    try {
        const user = await User.find();      
        res.status(200).json({user});
    } catch (error) {
        console.log("Error: " + error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

export {userData}


export const updateUser = async(req, res) => {
    try {
        const userId = req.params.id;
        const updatedData = req.body;
        const updatedUser = await User.findByIdAndUpdate(userId, updatedData, { new: true });
        
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json({ message: "User updated successfully", book: updatedBook });
    } catch (error) {
        console.log("Error: " + error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};


export const deleteUser = async(req, res) => {
    try {
        const userId = req.params.id;
        const deleteBook = await User.findByIdAndDelete(userId);
        
        if (!deleteBook) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json({ message: "User deleted successfully", book: deleteBook });
    } catch (error) {
        console.log("Error: " + error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};