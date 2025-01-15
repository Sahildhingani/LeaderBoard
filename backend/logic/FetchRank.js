const axios = require('axios');

const fetchLeetCodeUserRanking = async (req,resp) => {
    const {name}=req.body



    // Ensure 'name' is provided and is a valid string
    if (!name || typeof name !== 'string') {
        return resp.status(400).json({success:false,message:'Invalid username'});
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
            return resp.status(200).json({success:true,data:ranking});
        } else {
            console.log("Ranking not available");
            return resp.status(404).json({success:false,message:'Ranking not available'});
        }
    } catch (error) {
        console.error('Error fetching ranking:', error.message);
        return resp.status(500).json({success:false,message:'Error fetching ranking'});

    }
};

module.exports = fetchLeetCodeUserRanking;

