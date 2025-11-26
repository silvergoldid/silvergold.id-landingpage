require("dotenv").config(); // Load environment variables from .env file
const cors = require("cors");
const axios = require("axios");
const helmet = require("helmet");
const cheerio = require("cheerio");
const express = require("express");
const http = require("http");
const https = require("https");
const { createClient } = require("@supabase/supabase-js"); // Supabase client

// Create axios instance with connection pooling for better performance
const axiosInstance = axios.create({
  httpAgent: new http.Agent({ keepAlive: true, maxSockets: 50 }),
  httpsAgent: new https.Agent({ keepAlive: true, maxSockets: 50 }),
  timeout: 10000, // 10 seconds timeout
});

// Initialize the Express app
const allowedOrigins = [
  "https://silvergold-id-landingpage.vercel.app/",
  "http://localhost:3000",
];
const app = express();
const port = 4000;

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
app.use(helmet());
app.use(express.json());

// Function to extract data from the HTML response
function extractDataFromHTML(html) {
  const extractedData = [];

  // Load the HTML into Cheerio for parsing
  const $ = cheerio.load(html);

  // Target the section with the id 'check-rates-result'
  const section = $("#check-rates-result");

  // Iterate through each 'li' element in the 'ul' inside the section
  section.find("ul li.service").each((i, el) => {
    const serviceName = $(el).find(".service-name").text().trim();
    const link = $(el).find(".send-now a").attr("href");

    // Check if service is not available
    const notAvailableDiv = $(el).find(".service-not-available");
    const isNotAvailable = notAvailableDiv.length > 0;

    let price = null;
    let availability = "Available";

    if (isNotAvailable) {
      // Service is not available
      price = null;
      availability = "Tidak tersedia";
    } else {
      // Service is available, get the price
      price = $(el).find(".price").text().trim();
      availability = "Available";
    }

    // Add each service with its availability status
    extractedData.push({
      serviceName,
      price,
      link: link || null,
      availability,
    });
  });

  return extractedData;
}

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

app.post("/v1/list-location", async (req, res) => {
  const { searchstr } = req.body; // Get search term from the request

  if (!searchstr) {
    return res.status(400).json({ error: "Missing searchstr parameter" });
  }

  try {
    // Call the external API (similar to the one shown in the image)
    const response = await axiosInstance.post(
      "https://paxel.co/api/v1/internal-autocomplete",
      {
        searchstr: searchstr,
        session_token: process.env.LIST_LOCATION_TOKEN, // Hardcoded session token
        use_db_only: "0", // Hardcoded
      }
    );
    // Send the response back to the client
    res.status(200).json(response.data);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching the location data." });
  }
});

app.post("/v1/check-ongkir", async (req, res) => {
  const { weight, zipcode_pickup, destination, zipcode_destination } = req.body;

  // Ensure all required parameters are provided
  if (!weight || !zipcode_pickup || !destination || !zipcode_destination) {
    return res.status(400).json({ error: "Missing required parameters" });
  }

  try {
    // Prepare form data (like Postman's form-data)
    const formData = new URLSearchParams();
    formData.append("_token", process.env.CHECK_ONGKIR_TOKEN);
    formData.append("weight", weight);
    formData.append("validation_value", "pass");
    formData.append("pickup", "rens garage");
    formData.append("zipcode_pickup", zipcode_pickup);
    formData.append("destination", destination);
    formData.append("zipcode_destination", zipcode_destination);
    formData.append("destination_counter", "0");
    formData.append("button", "");

    // Call the external API with form data using connection pooling
    const response = await axiosInstance.post(
      "https://paxel.co/id/check-rates",
      formData,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const extractedData = extractDataFromHTML(response.data);

    // Send the extracted data back to the client
    res.status(200).json(extractedData);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while checking the shipping cost." });
  }
});

app.post("/v1/check-resi", async (req, res) => {
  const { shipment_code } = req.body;

  // Ensure the shipment_code is provided
  if (!shipment_code) {
    return res.status(400).json({ error: "Missing shipment_code parameter" });
  }

  try {
    // Call the external API to track the shipment using connection pooling
    const response = await axiosInstance.post(
      "https://paxel.co/en/track-shipments",
      null,
      {
        params: {
          _token: process.env.CHECK_RESI_TOKEN, // Hardcoded token
          shipment_code: shipment_code, // Get shipment_code from the request
          button: "", // Hardcoded button field (if needed for the API)
        },
      }
    );

    // Send the response back to the client with the data from the external API
    res.status(200).json(response.data);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while tracking the shipment." });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
