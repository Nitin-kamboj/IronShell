import express from "express";
import Stripe from "stripe";
import cors from "cors";
import "dotenv/config"; // Ensure your .env has STRIPE_SECRET_KEY and STRIPE_WEBHOOK_SECRET

const app = express();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

app.use(cors({
    origin: "http://localhost:5173" 
}));

// --- WEBHOOK (Must be ABOVE express.json) ---
app.post("/webhook", express.raw({ type: "application/json" }), (req, res) => {
    const sig = req.headers["stripe-signature"];
    let event;

    try {
        event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
    } catch (err) {
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // This is the event triggered when a Checkout Session is paid
    if (event.type === "checkout.session.completed") {
        const session = event.data.object;
        console.log(`💰 Payment successful for User: ${session.metadata.userId}`);
        // TODO: Update your MariaDB status here
    }

    res.json({ received: true });
});

app.use(express.json());

// --- CHECKOUT ROUTE ---
app.post("/create-checkout-session", async (req, res) => {
    try {
        const { planName, amount, userId } = req.body;

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: [{
                price_data: {
                    currency: "usd",
                    product_data: { name: planName },
                    unit_amount: amount, // e.g., 4900 for $49.00
                },
                quantity: 1,
            }],
            mode: "payment",
            metadata: { userId: userId }, // Links the payment to your member
            success_url: "http://localhost:5173/success", // Redirect after success
            cancel_url: "http://localhost:5173/plans",    // Redirect if they quit
        });

        res.json({ url: session.url });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(3000, () => console.log("Server running on port 3000"));