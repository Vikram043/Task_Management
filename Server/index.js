import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';


import route from './routes/todo-route.js';
import Connection from './config/db.js';



const app = express();


app.use(cors());

app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/', route);

const PORT = 8000;



app.listen(PORT, async() =>{
    try {
        Connection() 
        console.log(`Your server is running successfully on PORT ${PORT}`);
    } catch (error) {
        console.log(error.message)
    }
})
  