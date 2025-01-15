const axios = require('axios');

const fetchSubmissions = async (req, resp) => {
    const username = req.body.name; // Assuming the username is sent in the request body
    const query = `
        query userSessionProgress($username: String!) {
            matchedUser(username: $username) {
                submitStats {
                    totalSubmissionNum {
                        difficulty
                        count
                        submissions
                    }
                }
            }
        }
    `;
    const variables = { username };

    try {
        const response = await axios.post('https://leetcode.com/graphql', {
            query: query,
            variables: variables
        });

        // Extracting the total submissions from the response
        const totalSubmissions = response.data.data.matchedUser.submitStats.totalSubmissionNum[0].submissions;

        resp.json({ totalSubmissions }); // Sending the total submissions back in the response
    } catch (error) {
        console.error(error);
        resp.status(500).send('Error fetching user submissions');
    }
};

module.exports = fetchSubmissions;
