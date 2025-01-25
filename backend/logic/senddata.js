// send all the backend data on front end 
const User = require("../model/usermodel");

async function senddata(req, resp) {
    try {
        // Await the result of the database query
        const data = await User.find({});
         // Extract only the 'Fullname' field
         const fullnames = data.map((user) => user.
         Leetuser);

         // Send the fullnames array in the response
         resp.json({ data: fullnames });
    } catch (error) {
        // Handle any errors that occur during the database query
        console.error(error);
        resp.status(500).json({ message: "Something went wrong", error: error.message });
    }
}

module.exports = senddata;
