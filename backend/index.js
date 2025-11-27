require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const axios = require("axios");
const cheerio = require("cheerio");
const http = require("http");
const https = require("https");
const { createClient } = require("@supabase/supabase-js");

// ============================================================================
// CONFIGURATION
// ============================================================================

const PORT = process.env.PORT || 4000;
// const NODE_ENV = process.env.NODE_ENV || "development";

const ALLOWED_ORIGINS = [
  "https://silvergold-id-landingpage.vercel.app",
  "http://localhost:3000",
];

// Axios instance with connection pooling
const axiosInstance = axios.create({
  httpAgent: new http.Agent({ keepAlive: true, maxSockets: 50 }),
  httpsAgent: new https.Agent({ keepAlive: true, maxSockets: 50 }),
  timeout: 10000,
});

// Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

// ============================================================================
// MIDDLEWARE SETUP
// ============================================================================

const app = express();

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (ALLOWED_ORIGINS.includes(origin)) return callback(null, true);
      return callback(new Error("CORS: Origin not allowed"));
    },
    credentials: true,
  })
);

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Extract shipping service data from Paxel HTML response
 */
function extractShippingServicesFromHTML(html) {
  const services = [];
  const $ = cheerio.load(html);
  const section = $("#check-rates-result");

  section.find("ul li.service").each((i, el) => {
    const serviceName = $(el).find(".service-name").text().trim();
    const link = $(el).find(".send-now a").attr("href");
    const notAvailable = $(el).find(".service-not-available").length > 0;

    services.push({
      serviceName,
      price: notAvailable ? null : $(el).find(".price").text().trim(),
      link: link || null,
      availability: notAvailable ? "Tidak tersedia" : "Available",
    });
  });

  return services;
}

// ============================================================================
// ROUTES
// ============================================================================

// Root endpoint
app.get("/", (req, res) => {
  res.json({
    message: "silvergold.id API",
    version: "1.0.0",
    status: "running",
  });
});

// Get all products
app.get("/v1/products", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("products")
      .select("id, metal, name, weight, purity, price, description, condition");

    if (error) throw error;

    res.json(data);
  } catch (error) {
    console.error("Products error:", error);
    res.status(500).json({ error: error.message });
  }
});

// example: GET /v1/warehouse/c93c7ca9-4172-45b5-999c-14024aa2fe06
app.get("/v1/warehouse/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from("products")
      .select("warehouse_stock")
      .eq("id", id)
      .single();

    if (error) throw error;

    res.json(data.warehouse_stock || {});
  } catch (error) {
    console.error("Warehouse error:", error);
    if (error.code === "PGRST116") {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(500).json({ error: error.message });
  }
});

// Location autocomplete
app.post("/v1/list-location", async (req, res) => {
  try {
    const { searchstr } = req.body;

    if (!searchstr) {
      return res.status(400).json({ error: "Missing searchstr parameter" });
    }

    const response = await axiosInstance.post(
      "https://paxel.co/api/v1/internal-autocomplete",
      {
        searchstr,
        session_token: process.env.LIST_LOCATION_TOKEN,
        use_db_only: "0",
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error("Location autocomplete error:", error);
    res.status(500).json({ error: "Failed to fetch location data" });
  }
});

// Check shipping rates
app.post("/v1/check-ongkir", async (req, res) => {
  try {
    const { weight, zipcode_pickup, destination, zipcode_destination } =
      req.body;

    if (!weight || !zipcode_pickup || !destination || !zipcode_destination) {
      return res.status(400).json({ error: "Missing required parameters" });
    }

    const formData = new URLSearchParams({
      _token: process.env.CHECK_ONGKIR_TOKEN,
      weight,
      validation_value: "pass",
      pickup: "rens garage",
      zipcode_pickup,
      destination,
      zipcode_destination,
      destination_counter: "0",
      button: "",
    });

    const response = await axiosInstance.post(
      "https://paxel.co/id/check-rates",
      formData,
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );

    const services = extractShippingServicesFromHTML(response.data);
    res.json(services);
  } catch (error) {
    console.error("Check rates error:", error);
    res.status(500).json({ error: "Failed to check shipping rates" });
  }
});

// Track shipment
app.post("/v1/check-resi", async (req, res) => {
  try {
    const { shipment_code } = req.body;

    if (!shipment_code) {
      return res.status(400).json({ error: "Missing shipment_code parameter" });
    }

    const response = await axiosInstance.post(
      "https://paxel.co/en/track-shipments",
      null,
      {
        params: {
          _token: process.env.CHECK_RESI_TOKEN,
          shipment_code,
          button: "",
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error("Track shipment error:", error);
    res.status(500).json({ error: "Failed to track shipment" });
  }
});

// ============================================================================
// START SERVER
// ============================================================================

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  // console.log(`📦 Environment: ${NODE_ENV}`);
});
