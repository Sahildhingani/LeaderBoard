import { configureStore } from '@reduxjs/toolkit';
import leaderboardReducer from '../redux/slice';

const store = configureStore({
    reducer: {
        leaderboard: leaderboardReducer,
    },
});

export default store;