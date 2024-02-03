import express from 'express';
import { DBconnect } from './src/utils/dbConnect.js';
import { user } from './src/routes/userRoutes.js';
import cors from 'cors'
import { productRoutes } from './src/routes/productRoutes.js';
import { OrderRoutes } from './src/routes/orderRoutes.js';
import morgan from 'morgan';
import { couponRoutes } from './src/routes/couponRoutes.js';
import { config } from 'dotenv';


const app=express();
config({
    path:".env"
})
config.get
//middlewarw
app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(morgan("dev"))
app.use(cors());
app.use("/uploads",express.static("uploads"))
DBconnect();
let base ={};

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