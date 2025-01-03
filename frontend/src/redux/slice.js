import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    users: [
        { id: 'abc123', name: 'Aman', totalSolved: 50 },
        { id: 'def456', name: 'Kunal', totalSolved: 120 },
        { id: 'ghi789', name: 'Rohit', totalSolved: 75 },
        { id: 'jkl012', name: 'Akash', totalSolved: 200 },
        { id: 'mno345', name: 'Kartik', totalSolved: 90 },
        { id: 'pqr678', name: 'Parag', totalSolved: 130 },
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


