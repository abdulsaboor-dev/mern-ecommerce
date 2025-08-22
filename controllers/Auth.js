const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');

const UserRegister = require("../models/userRegisterModal");
const sendOtp = require("../utils/sendOPT");

const ADMIN_EMAIL = "abdulsaboor@gmail.com";

const controllerRegister = async (req, res) => {
    // upload.single('profileImage'),
    // const newUserRegister = new UserRegister(req.body);
    // const { username, email, password } = req.body;
    // const newUser = new UserRegister({ username, email, password,});
    // newUser.save()
    //     .then(() => res.json('Note added!'))
    //     .catch(err => res.status(400).json(`Error: ${err}`));
    try {
        const { username, email, password, role } = req.body;

        if (role == "admin") {
            if(email != "abdulsaboor@gmail.com") {
                return res.status(403).json({
                    status: true,
                    message: "Invalid credential for admin register"
                })
            }

            const existingAdmin = await UserRegister.findOne({ role: "admin" });
            if (existingAdmin) {
               return res.status(400).json({
                    status: false,
                    message: "Admin already exist. Only one admin allowed!"
                })
            }
        }

        if (role === "customer" && email === ADMIN_EMAIL) {
            return res.status(400).json({ message: "This email is reserved for Admin and cannot be used for a customer!" });
        }

        const hashPassword = await bcrypt.hash(password, 10);
        //const otpCode = Math.floor(100000 + Math.random() * 900000).toString();

        const profileImage = req.file ? req.file.filename : null; // "url"; //

        //await sendOtp(email, otpCode);
        const newUserRegister = new UserRegister({ username, email, password : hashPassword, role, profileImage });
        await newUserRegister.save();
        res.status(201).json({
            status: true,
            message: `${role} registered successfully`
        })
    } catch (err) {
        res.status(400).json({
            status: false,
            message: err.message 
        })
    }

}

const login = async (req, res) => {
    const { email, password } = req.body;

    const user = await UserRegister.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(400).json({ success: false, message: "Invalid credentials"  });
    }

    const token = jwt.sign({ id: user._id }, "abdulsaboor", { expiresIn: "1h" });

    const expireTime = 3600000;

    return res.status(200).json({ success: true, token, expireTime, user: { name: user.username } })

}

module.exports = {controllerRegister, login};
