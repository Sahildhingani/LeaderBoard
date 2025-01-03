const User = require("../model/usermodel");
const { sendToken } = require("../session/sessionid");

const handlelogin = async (req, resp) => {
    try {
        const { Email, Password } = req.body;

        // Fetch user from database
        const data = await User.findOne({ Email });
        if (!data) {
            return resp.status(404).json({ success: false, message: "User not found" });
        }

        // Verify the password
        if (data.Password === Password) {
            // Generate the session token
            const Token = sendToken({ data });

            // Set the cookie with proper options
            resp.cookie("token", Token, {
                httpOnly: false,
                secure: process.env.NODE_ENV === "production", // Secure only in production
                sameSite: "Strict", 
                maxAge: 24 * 60 * 60 * 1000 // 1 day
            });

            // Send success response
            return resp.json({ 
                success: true, 
                message: "Login successful", 
                leetuser: data.Leetuser,
                Fullname:data.Fullname,
                token:Token,
            });
        } else {
            // Invalid password
            return resp.status(401).json({ success: false, message: "Invalid credentials" });
        }
    } catch (error) {
        console.error(error);
        resp.status(500).json({ success: false, message: "Internal server error" });
    }
};

module.exports = handlelogin;

