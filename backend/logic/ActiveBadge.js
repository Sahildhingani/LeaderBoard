const axios = require('axios');

const fetchActiveBadges = async (req, resp) => {
    const username = req.body.name; // Assuming the username is sent in the request body
    const query = `
        query getUserProfile($username: String!) {
            matchedUser(username: $username) {
                activeBadge {
                    displayName
                    icon
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

        const activeBadge = response.data.data.matchedUser.activeBadge;
        resp.json(activeBadge); // Sending the active badge data back in the response
    } catch (error) {
        console.error(error);
        resp.status(500).send('Error fetching active badges');
    }
};

module.exports = fetchActiveBadges;

