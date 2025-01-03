// user signupo logic
const handleLogout = (req, resp) => {
    try {
        // Clear the token cookie
        resp.clearCookie("token");

        return resp.status(200).json({ message: "Logout successful" });
    } catch (error) {
        console.error(error);
        return resp.status(500).json({ message: "Internal server error" });
    }
};

module.exports = handleLogout;
