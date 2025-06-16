import Razorpay from "razorpay";
import crypto from "crypto"
import express from "express"

const router=express.Router();


const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// **1. Create Order API**
router.post("/create-order", async (req, res) => {
  try {
    const { amount, currency } = req.body;
    const options = {
      amount:Math.floor( amount * 100), // Convert to paisa
      currency,
      receipt: `receipt_${Date.now()}`,
      payment_capture: 1, // Auto-capture payment
    };

    const order = await razorpay.orders.create(options);
    res.json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal error"});
  }
});

// **2. Verify Payment API**
router.post("/verify-payment", async (req, res) => {
  try {
    console.log("jh")
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET || "")
      .update(body)
      .digest("hex");

    if (expectedSignature === razorpay_signature) {
      res.json({ success: true, message: "Payment Verified Successfully", razorpay_payment_id });
    } else {
      res.status(400).json({ success: false, message: "Invalid Signature" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal error"});
  }
});

// **3. Capture Payment API**
router.post("/capture-payment", async (req, res) => {
  try {
    const { razorpay_payment_id, amount,currency } = req.body;

    const payment = await razorpay.payments.capture(razorpay_payment_id, amount * 100,currency); // Amount in paisa

    res.json({ success: true, payment });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal error"});
  }
});

// **4. Refund Payment API**
router.post("/refund-payment", async (req, res) => {
  try {
    const { razorpay_payment_id, amount } = req.body; // Amount should be in paisa

    const refund = await razorpay.payments.refund(razorpay_payment_id, {
      amount: amount * 100, // Refund in paisa
    });

    res.json({ success: true, refund });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal error"});
  }
});

// **5. Fetch Order Details API**
router.get("/order/:order_id", async (req, res) => {
  try {
    const { order_id } = req.params;
    const order = await razorpay.orders.fetch(order_id);

    res.json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal error"});
  }
});

// **6. Get Payment Details API**
router.get("/payment/:payment_id", async (req, res) => {
  try {
    const { payment_id } = req.params;
    const payment = await razorpay.payments.fetch(payment_id);

    res.json({ success: true, payment });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal error"});
  }
});



router.post("/create-payment-link", async (req, res) => {
  try {
    const { amount, currency, description,customer } = req.body;

    const paymentLink = await razorpay.paymentLink.create({
      amount,
      currency,
      description,
      customer
    });

    res.json({ success: true, paymentLink });
  } catch (error) {
    res.status(500).json({ success: false, message: error });
  }
});

// **8. Webhook for Payment Confirmation**
router.post("/razorpay-webhook", async (req, res) => {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET || "";
  const signature = req.headers["x-razorpay-signature"];
  const body = JSON.stringify(req.body);

  const expectedSignature = crypto
    .createHmac("sha256", secret)
    .update(body)
    .digest("hex");

  if (signature === expectedSignature) {
    const event = req.body.event;

    // Handle different events here
    switch (event) {
      case "payment.captured":
        console.log("Payment Captured: ", req.body.payload.payment);
        break;
      case "payment.failed":
        console.log("Payment Failed: ", req.body.payload.payment);
        break;
      case "refund.processed":
        console.log("Refund Processed: ", req.body.payload.refund);
        break;
      default:
        console.log("Event Received: ", req.body);
        break;
    }

    res.status(200).send("Webhook received and processed");
  } else {
    res.status(400).send("Invalid Signature");
  }
});


export default router