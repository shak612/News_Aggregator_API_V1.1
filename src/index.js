const express = require('express');
const router = require('./routes/allRoutes');
const app = express();
const dotenv = require('dotenv');

dotenv.config();

// const PORT = 3000;

app.use(express.json());

app.use('/api', router);



app.listen(process.env.PORT, (err) => {
    if(!err){
        console.log(`Server is running on port ${process.env.PORT}`)
    }else{
        console.log("error:-", err)
    }
})


