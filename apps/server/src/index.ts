import express from "express";
import dot from "dotenv";
dot.config();
import razorpayRoutes from "./config/razorpay"
import userRoutes from "./routes/userRoutes"
import bankAccountRoutes from "./routes/bankAcount"
import merchantRoutes from "./routes/merchantRoutes"
import database from "./database/db"

database();
import cors from "cors"


const app = express();
app.use(express.json());
app.use(cors({ credentials:true}))
app.use(express.urlencoded({extended:true}))

app.get('/',(req,res)=>{
  res.json({message:"hello world"})
})

 

app.use("/api",userRoutes)
app.use('/api/razorpay',razorpayRoutes);
app.use("/api/bankaccount",bankAccountRoutes)
app.use("/api/merchant",merchantRoutes)





app.listen(process.env.PORT, () => {
  console.log(`Server is running at ${process.env.PORT}`);
});