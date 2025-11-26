require("dotenv").config(); // Load environment variables from .env file
const express = require("express");
const cors = require("cors");
const { createClient } = require("@supabase/supabase-js"); // Supabase client

// Initialize the Express app
const allowedOrigins = [
  "https://silvergold-id-landingpage.vercel.app/",
  "http://localhost:3000",
];
const app = express();
const port = 5000;

// Initialize Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

// Middleware
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error("CORS: Origin not allowed"));
    },
    credentials: true,
  })
);
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("Hello, welcome to the backend using Express.js and Supabase!");
});

// Example route to fetch data from Supabase
app.get("/v1/products", async (req, res) => {
  const { data, error } = await supabase
    .from("products") // Replace with your actual table name
    .select("*");

  if (error) {
    res.status(500).json({ error: error.message });
  } else {
    res.json(data);
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
