// import { instance } from "../server.js";
const instance = require("../../server.js");
const crypto = require("crypto");
const { Payment } = require("../../models/paymentModel.js");

const checkout = async (req, res) => {

    const options = {
        amount: Number(req.body.amount * 100),
        currency: "USD",
    };

    console.log(options);

    try {
        const order = await instance.orders.create(options);
        res.status(200).json({
            success: true,
            order,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: error.error,
        });
    };

};

const paymentVerification = async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
        req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_APT_SECRET)
        .update(body.toString())
        .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
        // Database comes here

        await Payment.create({
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            txn_amount: req.body.amount,
        });

        res.redirect(
            `http://localhost:3000/paymentsuccess?reference=${razorpay_payment_id}`
        );
    } else {
        res.status(400).json({
            success: false,
        });
    }
};

module.exports = {
    checkout,
    paymentVerification
}
