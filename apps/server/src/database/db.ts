import mongoose,{Document,Schema,Model} from "mongoose";


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


export type TransactionType = 'DEBIT' | 'CREDIT';

export interface TransactionDocument extends Document {
  userId:number;
  amount: number;
  type: TransactionType;
  createdAt: Date;
}

const TransactionSchema: Schema<TransactionDocument> = new Schema(
  {
    userId: {
      type:Number,
      ref: 'BankAccount', 
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    type: {
      type: String,
      enum: ['DEBIT', 'CREDIT'],
      required: true,
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

export const TransactionModel: Model<TransactionDocument> =
  mongoose.models.Transaction || mongoose.model('Transaction', TransactionSchema);

export const BankAccountModel= mongoose.model('bankAccount',BankAccountSchema);

export default db

