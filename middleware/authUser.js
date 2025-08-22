const jwt = require("jsonwebtoken");
const UserRegister = require("../routes/userRoute");

const AuthUserMiddlware = async (req, res, next) => {
	const { username, email, password } = req.body;

	if (username != "" && email != "" && password != "") {
		next();
	} else {
		return res.status(401).json({ success: false, message: "Invalid credentials" })
	}
}

const userAuthToken = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        //console.log("Received Auth Header:", authHeader); // Debugging

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ success: false, message: "No token provided" });
        }

        const token = authHeader.split(" ")[1];
        //console.log("Extracted Token:", token); // Debugging

        const verified = jwt.verify(token, "abdulsaboor");
        //console.log("Decoded Token:", decoded); // Debugging
        req.user = verified;
        next();
    } catch (err) {
        console.error("JWT Error:", err.message);
        return res.status(500).json({ success: false, message: "Authentication failed" });
    }
};

// Middleware for Admin Access
const isAdmin = (req, res, next) => {
    if (req.user.role !== "admin") {
        return res.status(403).json({ message: "Admin Access Required" });
    }
    next();
};

module.exports = { isAdmin };