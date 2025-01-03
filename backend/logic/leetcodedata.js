const axios = require('axios');

const fetchLeetCodeUserProgress = async (req, resp) => {
    const query = `
        query userProfileUserQuestionProgressV2($userSlug: String!) {
            userProfileUserQuestionProgressV2(userSlug: $userSlug) {
                numAcceptedQuestions {
                    count
                    difficulty
                }
            }
        }
    `;

    // Extract `Leetuser` from the request body
    const { name } = req.body; // Use 'name' as the key since that's what the client sends

    if (!name) {
        return resp.status(400).json({ error: 'Leetuser is required' });
    }

    const variables = { userSlug: name };

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

        const data = response.data.data?.userProfileUserQuestionProgressV2;

        if (!data) {
            return resp.status(400).json({ error: 'Failed to fetch valid data from LeetCode' });
        }

        return resp.status(200).json({ progress: data });
    } catch (error) {
        console.error('Error fetching user progress:', error.response?.data || error.message);
        return resp.status(500).json({ error: error.response?.data || 'Failed to fetch user progress' });
    }
};

module.exports = fetchLeetCodeUserProgress;


