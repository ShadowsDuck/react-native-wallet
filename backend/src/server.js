import express from "express";
import rateLimiter from "./middleware/rateLimiter.js";
import transactionsRoute from "./routes/transactionsRoute.js";

const app = express();
const PORT = process.env.PORT || 3000;

// middleware
app.use(rateLimiter);
app.use(express.json());

app.use("/api/transactions", transactionsRoute);

app.listen(PORT, () => {
  console.log("Server is running on PORT:", PORT);
});
