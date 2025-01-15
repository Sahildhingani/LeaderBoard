const User = require("../model/usermodel");

const handlesignup = async (req, resp) => {
  try {
    const { Fullname, Email, Leetuser, Password,Gender} = req.body;

    // Await the asynchronous User.create call
    const data = await User.create({ Fullname, Email, Leetuser, Password, Gender });

    if (data) {
      // Successful user creation
      resp.status(201).json({ success: true, msg: "User Created Successfully" });
    } else {
      // In case user creation fails, though unlikely with a create function
      resp.status(400).json({ success: false, msg: "User Not Created" });
    }
  } catch (error) {
    console.error("Error during signup:", error);

    // Respond with an error status and message if something goes wrong
    resp.status(500).json({ success: false, msg: "An error occurred during signup" });
  }
};

module.exports = handlesignup;

