import axios from 'axios';

// Fetch historical IoT data from backend
export const getHistoryData = async () => {
    const response = await axios.get('/api/history');
    return response.data;
};
