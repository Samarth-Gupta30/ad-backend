const dns = require('node:dns').promises;
dns.setServers(["1.1.1.1", "8.8.8.8"]);
require('dotenv').config();
const app = require('./src/app');
const connectToDB = require('./src/config/db');

connectToDB();



app.listen(3000, () => {
    console.log('Server running on port 3000');
});