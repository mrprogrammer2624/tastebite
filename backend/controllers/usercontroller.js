const User = require('../models/User');
const bcrypt = require('bcrypt');
const generateTokenAndSetCookie = require('../config/generateToken');
module.exports.regster = async (req, res) => {
    try {
        if (req.body) {
            const { email, name, password, cPass } = req.body;

            if (!email || !name || !password || !cPass) return res.status(400), json({ message: "required field Missing" })

            const user = await User.findOne({ email });
            if (user) return res.status(400).json({ message: "User already exist" });
            if (password !== cPass) return res.status(400), json({ message: "Password & confirm Password are not match" });

            req.body.password = await bcrypt.hash(password, 10);
            req.body.currentDate = new Date().toLocaleString();
            req.body.updateDate = new Date().toLocaleString();
            const newUser = await User.create(req.body)
            return res.status(201).json({ success: true, data: newUser, message: 'User created successfully' });

        } else {
            return res.status(400), json({ message: "Error accuired on form submit" })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server eroor" });
    }
}

module.exports.viewDetail = async (req, res) => {
    try {
        const { id } = req.params ? req.params : '';
        var user;
        if (id) user = await User.findOne({ id: id, isActive: true });
        user = await User.find({ isActive: true });
        if (user !== '') return res.status(201).json({ message: "user data fetched successfully", data: user });
        return res.status(400).json({ message: "No data found" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server eroor" });
    }
}

module.exports.editDetail = async (req, res) => {
    try {
        const { id } = req.params;
        if (id) {
            if (req.body) {
                req.body.updateDate = new Date().toLocaleString();
                const updateData = await User.findByIdAndUpdate(id);
                if (updateData) return res.status(201).json({ message: 'Data update successfully', data: updateData });
            }
            return res.status(400).json({ message: "Something went wrong" });
        }
        return res.status(400).json({ message: "Something went wrong" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server eroor" });
    }
}

module.exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        if (id) {
            const user = await User.findById(id);
            user.isActive = false;
            const deleteUser = User.findByIdAndUpdate(id, user);
            if (deleteUser) return res.status(201).json({ message: "Data delete succesfully" })
        }
        return res.status(400).json({ message: "Something went wrong" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server eroor" });
    }
}

module.exports.loginUser = async (req, res) => {
    try {
        if (req.body) {
            const { email, password } = req.body;
            if (!email || !password) return res.status(400), json({ message: "required field Missing" })

            let user = await User.findOne({ email });
            if (!user) return res.status(400).json({ message: "User not found" });

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ message: 'Invalid password' });
            }
            // Generate a token and set it as a cookie
            const token = generateTokenAndSetCookie(user._id, res);
            if (!token) return res.status(400).json({ message: 'Token generation failed"' });

            return res.status(200).json({ token: token });
        } else {
            return res.status(400), json({ message: "Error accuired on form submit" })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server eroor" });
    }
}