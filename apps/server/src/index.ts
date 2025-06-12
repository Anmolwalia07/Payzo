import  express  from "express";
import dot from "dotenv"
dot.config();


const app=express();

app.get('/api/wallet',(req,res)=>{
      res.json({message:"anol"});
})

app.listen(process.env.PORT||3002,()=>{
    console.log(`Server is running at ${process.env.PORT}`)
})