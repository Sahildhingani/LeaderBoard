const Help=require("../model/helpmodel");
const handleRequest=async (req,resp) => {
    try {
        const { name, Email, Tittle, Report } = req.body;
    
        // Await the asynchronous User.create call
        const data = await Help.create({ name, Email, Tittle, Report });
    
        if (data) {
          // Successful user creation
          resp.status(201).json({ success: true, msg: "Request Created Successfully" });
        } else {
          // In case user creation fails, though unlikely with a create function
          resp.status(400).json({ success: false, msg: "Request Not Created" });
        }
      } catch (error) {
        console.error("Error during Request sent:", error);
    
        // Respond with an error status and message if something goes wrong
        resp.status(500).json({ success: false, msg: "An error occurred during Request" });
      }
    
}
module.exports=handleRequest;