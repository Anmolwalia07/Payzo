import mongoose from "mongoose";


const db=()=>{
    mongoose.connect(`${process.env.MongoDB_Url}wallet`|| "").then(()=>{
    console.log("Connected to Db")
}).catch((e)=>{
    console.log("error")
})
}

const BankAccountSchema=new mongoose.Schema({
    userId:{
        type:Number,
        required:true,
        unique:true
    },
    name:{
        type:String,
        required:true,
    },
    accountNumber:{
        type:String,
        required:true,
        unique:true
    },
    accountBalance:{
        type:Number,
        required:true,
        default:10000
    },
    createdAt:{
        type:Date,
        default:new Date(),
    },
    status:{
        type:String,
        enum:["opened",'blocked'],
        required:true,
        default:"opened"
    },
    updatedAt:{
        type:Date,
        default:new Date(),
    }
})

export const BankAccountModel= mongoose.model('bankAccount',BankAccountSchema);

export default db

