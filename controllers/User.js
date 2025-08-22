const UserRegister = require("../models/userRegisterModal");

exports.removeUser = async (req, res) => {
    const removeRegisterUser = await UserRegister.findByIdAndDelete(req.params.id);

    try {
        res.status(200).json({
            status: true,
            message: "User remove is successfully!"

        })
    } catch (error) {
        res.status(400).json({
            status: false,
            message: error
        })
    }

}