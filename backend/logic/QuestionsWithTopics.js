const axios = require('axios');

const fetchQuestionsWithTopics = async (req, resp) => {
  const username = req.body.name;
  
  const query = `
    query skillStats($username: String!) {
      matchedUser(username: $username) {
        tagProblemCounts {
          advanced {
            tagName
            problemsSolved
          }
          intermediate {
            tagName
            problemsSolved
          }
          fundamental {
            tagName
            problemsSolved
          }
        }
      }
    }
  `;
  
  const variables = { username };

  try {
    const response = await axios.post('https://leetcode.com/graphql', {
      query: query,
      variables: variables,
    });

    const tagProblemCounts = response.data.data.matchedUser.tagProblemCounts;

    resp.json({ tagProblemCounts });
  } catch (error) {
    console.error('Error fetching user questions by topics:', error);
    resp.status(500).send('Error fetching user questions by topics');
  }
};

module.exports = fetchQuestionsWithTopics;
