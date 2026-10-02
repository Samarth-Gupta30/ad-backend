 const dns = require('node:dns').promises;
 dns.setServers(["1.1.1.1", "8.8.8.8"]);

require('dotenv').config();
const app = require('./src/app');
const connectToDB = require('./src/config/db');

connectToDB();



const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});