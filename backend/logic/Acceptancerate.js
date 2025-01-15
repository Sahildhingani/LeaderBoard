const axios = require('axios');

const fetchAcceptance = async (req, resp) => {
    const username = req.body.name;
    // No need for `username` here as the query does not use it
    const query = `
        query questionOfToday {
            activeDailyCodingChallengeQuestion {
                question {
                    acRate
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

        // Correctly extracting the acceptance rate from the response
        const acceptanceRate = response.data.data.activeDailyCodingChallengeQuestion.question.acRate;

        resp.json({ acceptanceRate }); // Sending the acceptance rate back in the response
    } catch (error) {
        console.error(error);
        resp.status(500).send('Error fetching user acceptance rate');
    }
};

module.exports = fetchAcceptance;

