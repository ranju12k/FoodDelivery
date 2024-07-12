const express = require('express');
const router = express.Router();
const Order = require('../models/Orders');

router.post('/orderData', async (req, res) => {
    try {
        let data = [...req.body.order_data]; // Create a copy of the array

        // Add order_date to the beginning of the array
        data.unshift({ Order_date: req.body.order_date });

        let eId = await Order.findOne({ 'email': req.body.email });

        console.log(eId);

        if (eId == null) {
            await Order.create({
                email: req.body.email,
                order_data: [data],
            });
            res.json({ success: true });
        } else {
            await Order.findOneAndUpdate(
                { email: req.body.email },
                { $push: { order_data: data } }
            );
            res.json({ success: true });
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error: " + error.message);
    }
});

router.post('/orders', async (req, res) => {
    try {
        let myData = await Order.findOne({ 'email': req.body.email });
        res.json({ orderData: myData ? myData.order_data : [] });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error: " + error.message);
    }
});

module.exports = router;
