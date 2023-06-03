const express = require('express');
const app = express();
const cors = require('cors');
const Razorpay = require('razorpay');
const shortID = require('shortid');
app.use(cors())
app.use(express.json());

const razorpay = new Razorpay({
    key_id:"rzp_test_PumJ5rfAu4DWEu",
    key_secret:"RamTjF03VFnAO8abBDonZBUe"
})

app.get('/payment',async (req,res)=>{
    const payment_capture = 1
    const amount = 5
    const currency = 'USD'

    const options = {
        amount: (amount * 100),
        currency,
        receipt: shortID.generate(),
        payment_capture
    }

    const response =await razorpay.orders.create(options)
    console.log(response)
    res.json({
        id: response.id,
        currency:response.currency,
        amount: response.amount
    })
})

const port = 5000
app.listen(port,()=>{
    console.log(`Server is running on port ${port}...`)
});