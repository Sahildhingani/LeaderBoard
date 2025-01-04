import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    users: [
        
    ],
};

const leaderboardSlice = createSlice({
    name: 'leaderboard',
    initialState,
    reducers: {
        addUser(state, action) {
            state.users.push(action.payload);
            // Sort users by totalSolved in descending order
            state.users.sort((a, b) => b.totalSolved - a.totalSolved);
        },
        setUsers(state, action) {
            state.users = action.payload;
            // Sort users by totalSolved in descending order
            state.users.sort((a, b) => b.totalSolved - a.totalSolved);
        },
    },
});

export const { addUser, setUsers } = leaderboardSlice.actions;

export default leaderboardSlice.reducer;


