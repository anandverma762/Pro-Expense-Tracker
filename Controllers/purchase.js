const Order = require('../Models/order');
const Razorpay = require('razorpay');

exports.purchaseOrder = async (req, res, next) => {
  try {
    const rzp = new Razorpay({
      key_id: 'rzp_test_bpMfYbqTtdxILu',
      key_secret: 'LQFnTL1JdSDLeDsmLv3WFRRW'
    });

    const amount = 29900;

    const order = await new Promise((resolve, reject) => {
      rzp.orders.create({ amount, currency: 'INR' }, (err, order) => {
        if (err) {
          reject(err);
        } else {
          resolve(order);
        }
      });
    });

    await req.user.createOrder({ orderId: order.id, status: 'PENDING' });

    res.status(201).json({ order, key_id: rzp.key_id });
  } catch (err) {
    res.status(403).json({ message: "Something went wrong", error: err });
  }
};

exports.updatePurchase = async (req, res, next) => {
  try {
    const paymentId = req.body.payment_id;
    const orderId = req.body.order_id;
    const order = await Order.findOne({ where: { orderId: orderId } });

    if (order) {
      await order.update({ paymentId: paymentId, status: "SUCCESS" });
      await req.user.update({ ispremiumuser: true });
      res.status(202).json({ message: "Transaction Successful" });
    } else {
      console.log("hello i am here")
      res.status(400).json({ message: "Invalid order ID" });
    }
  } catch (error) {
    console.log(error);
    try {
      const orderId = req.body.order_id;
      const order = await Order.findOne({ where: { orderId: orderId } });
      if (order) {
        await order.update({ paymentId: null, status: "FAILED" });
        res.status(500).json({ message: "Transaction Failed" });
      } else {
        res.status(400).json({ message: "Invalid order ID" });
      }
    } catch (error) {
      console.error("Failed to update purchase status:", error);
      res.status(500).json({ message: "Transaction Failed" });
    }
  }
}

