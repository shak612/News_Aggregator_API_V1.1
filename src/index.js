const express = require('express');
const router = require('./routes/allRoutes');
const app = express();
const dotenv = require('dotenv');
dotenv.config();

//************************Morgan************************//
require('./utils/logReports/logger')(app);


// const PORT = 3000;

app.use(express.json());

app.use('/api', router);

console.log("process.env.NODE_ENV-From APP", process.env.NODE_ENV)
const server = app.listen(3000, (err) => {
    if(!err){
        console.log(`Server is running on port 3000`)
    }else{
        console.log("error:-", err)
    }
})


module.exports = server;