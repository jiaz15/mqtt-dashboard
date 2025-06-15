const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());

const historyRoute = require('./routes/history');
app.use('/api/history', historyRoute);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
