import express from 'express';
import connectDB from './Config/db.js'
import {  configDotenv  } from 'dotenv'
import productsRouter from './routes/Product.route.js'

app.use(express.json());
app.use('/api/products', productsRouter)
configDotenv();
const PORT = process.env.PORT;

const app = express();


app.listen(PORT, ()=> {
    // connectDB();
    console.log("The server is started at http://localhost:" + PORT)
})