const express = require('express');

const dotenv = require('dotenv');

const cors = require('cors');

const connectDB = require('./config/db');

const logger = require('./middleware/logger');

const weatherRoutes = require('./routes/weatherRoutes');

dotenv.config();

connectDB();

const app = express();

app.use(express.json());

app.use(cors());

app.use(logger);

app.use('/weather', weatherRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT,"0.0.0.0", () => {

    console.log(`Server running on port ${PORT}`);
});
