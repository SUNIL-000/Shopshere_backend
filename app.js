import express from 'express';
import morgan from 'morgan';
import cors from 'cors'
import { config } from 'dotenv';
import { DBconnect } from './src/utils/dbConnect.js';
import { user } from './src/routes/userRoutes.js';
import { productRoutes } from './src/routes/productRoutes.js';
import { OrderRoutes } from './src/routes/orderRoutes.js';
import { couponRoutes } from './src/routes/couponRoutes.js';
import bodyParser from 'body-parser'
import Stripe from 'stripe';

const app=express();
config({
    path:".env"
})
const stripeKey = process.env.STRIPE_KEY;
//middleware
DBconnect();
export const stripe =new Stripe(stripeKey);
app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(express.json({ limit: "100mb"}));
app.use(bodyParser.urlencoded({ extended: true }))

app.use(morgan("dev"))
app.use(cors());
app.use("/uploads",express.static("uploads"))


//routes users
app.use('/api/v1/user',user)

//products routes
app.use("/api/v1/product",productRoutes)

//Order routes
app.use("/api/v1/order",OrderRoutes)

//coupon routes
app.use("/api/v1/coupon",couponRoutes)

const port = process.env.PORT || 3000;
// console.log(port)
app.listen(port,()=>{
console.log(`server listen at ${port}`)
})