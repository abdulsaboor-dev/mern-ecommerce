const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');

const UserRegister = require("../models/userRegisterModal");

const { isAdmin } = require("../middleware/authUser");
const verfiyJwtToken = require("../utils/VerfiyToken");
const {controllerRegister, login} = require("../controllers/Auth");
const userController = require("../controllers/User");
// const authController = require("../controllers/Auth");

const sendOtp = require("../utils/sendOPT");
const upload = require('../middleware/upload');

router.post('/register',upload.single('profileImage'), controllerRegister);

router.post('/login', login);

router.get("/getAllRegisterUser", verfiyJwtToken, async (req, res) => {
    try {
        const registerUsers = await UserRegister.find({});
        res.status(200).json({
            status: true,
            registerUsers
        });
        
        // Delay response by 1 minute
        // setTimeout(() => {
        //     res.status(200).json({
        //         status: true,
        //         registerUsers
        //     });
        // }, 6000);
    } catch (err) {
        res.status(400).json({
            status: false,
            message: err.message
        });
    }
})

router.patch("/updateUserRegisterRecord/:id", verfiyJwtToken, isAdmin, async (req, res) => {
    const updateRegisterUser = await UserRegister.findByIdAndUpdate(req.params.id, req.body,
        { new: true, runValidators: true });

    try {
        res.status(200).json({
            status: true,
            data: {
                updateRegisterUser
            }
        })
    } catch (err) {
        res.status(400).json({
            status: false,
            message: err
        })
    }
});

// router.delete("/deleteRegisterUser/:id", verfiyJwtToken, async (req, res) => {
//     const removeRegisterUser = await UserRegister.findByIdAndDelete(req.params.id);

//     try {
//         res.status(200).json({
//             status: true,
//             data: {
//                 removeRegisterUser
//             }

//         })
//     } catch (error) {
//         res.status(400).json({
//             status: false,
//             message: error
//         })
//     }

// });

router.delete("/deleteRegisterUser/:id", verfiyJwtToken, userController.removeUser);

module.exports = router;
