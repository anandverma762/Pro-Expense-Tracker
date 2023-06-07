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
    console.log("we reached here"+ req.body)
    const order = await Order.findOne({ where: { orderId: orderId } });
    await order.update({ paymentId: paymentId, status: "SUCCESS" });

    await req.user.update({ ispremiumuser: true });

    res.status(202).json({ message: "Transaction Successful" });
  } catch (error) {
    console.log(error);
  }
};
