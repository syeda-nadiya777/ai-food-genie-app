const Stripe = require("stripe");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
console.log("Stripe Secret:", process.env.STRIPE_SECRET_KEY);

exports.processPayment = catchAsyncErrors(async (req, res, next) => {
  const { items } = req.body;
  console.log("FRONTEND_URL:", process.env.FRONTEND_URL);

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],

    line_items: items.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: item.name,
          images: [item.images[0]?.url],
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    })),

    mode: "payment",

    success_url: `${process.env.FRONTEND_URL}/success`,
    cancel_url: `${process.env.FRONTEND_URL}/cart`,
  });

  res.status(200).json({
    success: true,
    url: session.url,
  });
});
exports.sendStripeAPI = catchAsyncErrors(async (req, res, next) => {
  res.status(200).json({
    stripeApiKey: process.env.STRIPE_API_KEY,
  });
});