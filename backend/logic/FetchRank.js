const axios = require('axios');

const fetchLeetCodeUserRanking = async (name) => {
    // Ensure 'name' is provided and is a valid string
    if (!name || typeof name !== 'string') {
        return 'Invalid username';
    }

    const query = `
        query userPublicProfile($username: String!) {
          matchedUser(username: $username) {
            profile {
              ranking
            }
          }
        }
    `;

    const variables = { username: name };

    try {
        const response = await axios.post(
            'https://leetcode.com/graphql',
            { query, variables },
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        );

        // Extract and return the ranking, ensuring proper structure
        const ranking = response?.data?.data?.matchedUser?.profile?.ranking;

        if (ranking) {
            console.log("Your rank is:", ranking); // Log ranking before returning
            return ranking;
        } else {
            console.log("Ranking not available");
            return 'Ranking not available';
        }
    } catch (error) {
        console.error('Error fetching ranking:', error.message);
        return 'Error fetching ranking';
    }
};

module.exports = fetchLeetCodeUserRanking;

