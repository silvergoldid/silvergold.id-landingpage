# silvergold.id Backend API

Express.js backend API for the silvergold.id landing page, providing product management, warehouse inventory, shipping cost calculation, location search, and shipment tracking features.

## 🚀 Tech Stack

- **Node.js** with **Express.js** - Web framework
- **Supabase** - Database and backend service
- **Axios** - HTTP client with connection pooling
- **Cheerio** - HTML parsing for web scraping
- **Helmet** - Security middleware
- **CORS** - Cross-origin resource sharing

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn package manager
- Supabase account and project

## 🛠️ Installation

1. Navigate to the backend directory:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the backend directory with the following variables:

```env
PORT=4000
SUPABASE_URL=your_supabase_project_url
SUPABASE_KEY=your_supabase_anon_key
LIST_LOCATION_TOKEN=your_location_api_token
CHECK_ONGKIR_TOKEN=your_shipping_api_token
CHECK_RESI_TOKEN=your_tracking_api_token
MARKET_PRICE_ID=your_market_price_row_id
```

## 🔐 Environment Variables

| Variable              | Description                                 | Required |
| --------------------- | ------------------------------------------- | -------- |
| `PORT`                | Server port (default: 4000)                 | No       |
| `SUPABASE_URL`        | Your Supabase project URL                   | Yes      |
| `SUPABASE_KEY`        | Your Supabase anonymous/public key          | Yes      |
| `LIST_LOCATION_TOKEN` | Session token for location autocomplete API | Yes      |
| `CHECK_ONGKIR_TOKEN`  | Token for shipping cost calculation API     | Yes      |
| `CHECK_RESI_TOKEN`    | Token for shipment tracking API             | Yes      |
| `MARKET_PRICE_ID`     | ID of the row in `market_prices` table      | Yes      |

## 🏃 Running the Server

### Development

```bash
npm start
```

The server will start on `http://localhost:4000` (or the port specified in your `.env` file).

## 📡 API Endpoints

### 1. Root / Health Check

**GET** `/`

Returns API information and status.

**Response:**

```json
{
  "message": "silvergold.id API",
  "version": "1.0.0",
  "status": "running"
}
```

---

### 2. Get Featured Products

**GET** `/v1/product`

Fetch a curated selection of products (2 gold and 2 silver items) for display on the landing page.

**Response:**

```json
[
  {
    "id": "c93c7ca9-4172-45b5-999c-14024aa2fe06",
    "metal": "Gold",
    "name": "Gold Bar 1g",
    "weight": "1 gram",
    "purity": "99.99%",
    "price": "Rp 950.000",
    "description": "24K pure gold bar",
    "condition": "Baru"
  },
  {
    "id": "...",
    "metal": "Silver",
    "name": "Silver Bar 1g",
    "weight": "1 gram",
    "purity": "99.9%",
    "price": "Rp 32.000",
    "description": "Fine silver bar",
    "condition": "Baru"
  }
]
```

**Note:** Returns exactly 2 gold products and 2 silver products (4 total).

**Error Response:**

```json
{
  "error": "Error message"
}
```

---

### 3. Get All Products

**GET** `/v1/products`

Fetch all products from the Supabase database with selected fields.

**Response:**

```json
[
  {
    "id": "c93c7ca9-4172-45b5-999c-14024aa2fe06",
    "metal": "Gold",
    "name": "Gold Bar 1g",
    "weight": "1 gram",
    "purity": "99.99%",
    "price": "Rp 950.000",
    "description": "24K pure gold bar",
    "condition": "Baru"
  }
]
```

**Fields Returned:**

- `id` - Product UUID
- `metal` - Metal type (Gold/Silver)
- `name` - Product name
- `weight` - Product weight
- `purity` - Metal purity
- `price` - Product price
- `description` - Product description
- `condition` - Product condition

**Error Response:**

```json
{
  "error": "Error message"
}
```

---

### 4. Get Warehouse Stock by Product ID

**GET** `/v1/warehouse/:id`

Fetch warehouse stock for a specific product by its ID.

**Example:**

```
GET /v1/warehouse/c93c7ca9-4172-45b5-999c-14024aa2fe06
```

**Response:**

```json
{
  "Gudang_Tangerang": 50,
  "Gudang_Medan": 25
}
```

Returns an object with warehouse locations as keys and stock quantities as values. Returns empty object `{}` if no warehouse data exists.

**Error Responses:**

404 Not Found:

```json
{
  "error": "Product not found"
}
```

500 Internal Server Error:

```json
{
  "error": "Error message"
}
```

---

### 5. Search Locations

**POST** `/v1/list-location`

Search for locations using autocomplete (Paxel API integration).

**Request Body:**

```json
{
  "searchstr": "Jakarta"
}
```

**Response:**

```json
{
  "predictions": [
    {
      "description": "Jakarta, Indonesia",
      "place_id": "..."
      // ... additional location details from Paxel API
    }
  ]
}
```

**Error Responses:**

400 Bad Request:

```json
{
  "error": "Missing searchstr parameter"
}
```

500 Internal Server Error:

```json
{
  "error": "Failed to fetch location data"
}
```

---

### 6. Check Shipping Cost

**POST** `/v1/check-ongkir`

Calculate shipping costs for a delivery via Paxel.

**Request Body:**

```json
{
  "weight": "1",
  "zipcode_pickup": "12530",
  "destination": "Jakarta Selatan",
  "zipcode_destination": "12160"
}
```

**Response:**

```json
[
  {
    "serviceName": "Same Day",
    "price": "Rp 25.000",
    "link": "https://paxel.co/...",
    "availability": "Available"
  },
  {
    "serviceName": "Express",
    "price": null,
    "link": null,
    "availability": "Tidak tersedia"
  }
]
```

**Error Responses:**

400 Bad Request:

```json
{
  "error": "Missing required parameters"
}
```

500 Internal Server Error:

```json
{
  "error": "Failed to check shipping rates"
}
```

---

### 7. Track Shipment

**POST** `/v1/check-resi`

Track a shipment using its tracking code via Paxel.

**Request Body:**

```json
{
  "shipment_code": "PAXEL123456789"
}
```

**Response:**

```json
{
  // Tracking information from Paxel API
}
```

**Error Responses:**

400 Bad Request:

```json
{
  "error": "Missing shipment_code parameter"
}
```

500 Internal Server Error:

```json
{
  "error": "Failed to track shipment"
}
```

---

### 8. Get Market Prices

**GET** `/v1/market-prices`

Fetch current market prices for gold and silver.

**Response:**

```json
{
  "gold_price": 2360000,
  "silver_price": 32000,
  "last_updated": "2023-11-28T07:00:00.000Z"
}
```

**Error Responses:**

500 Internal Server Error:

```json
{
  "error": "Error message"
}
```

---

### 9. Update Market Prices

**PUT** `/v1/market-prices`

Update market prices for gold and silver.

**Request Body:**

```json
{
  "gold": 2360000,
  "silver": 32000
}
```

**Response:**

```json
{
  "message": "Prices updated successfully",
  "data": {
    "id": "...",
    "gold_price": 2360000,
    "silver_price": 32000,
    "last_updated": "..."
  }
}
```

**Error Responses:**

400 Bad Request:

```json
{
  "error": "Gold and Silver prices are required"
}
```

500 Internal Server Error:

```json
{
  "error": "Error message"
}
```

---

### 10. Get Knowledge Base Articles

**GET** `/v1/knowledge`

Fetch all knowledge base articles from the Supabase database.

**Response:**

```json
[
  {
    "id": "...",
    "title": "Cara Investasi Emas untuk Pemula",
    "content": "...",
    "category": "Investment Guide",
    "created_at": "2023-11-28T07:00:00.000Z",
    "updated_at": "2023-11-28T07:00:00.000Z"
  }
]
```

**Note:** Returns all columns from the knowledge table. Actual fields may vary based on your database schema.

**Error Response:**

```json
{
  "error": "Error message"
}
```

---

## 🔒 CORS Configuration

The API is configured to accept requests from:

- `https://silvergold-id-landingpage.vercel.app` (Production)
- `http://localhost:3000` (Development)

To add more allowed origins, update the `ALLOWED_ORIGINS` array in `index.js`:

```javascript
const ALLOWED_ORIGINS = [
  "https://silvergold-id-landingpage.vercel.app",
  "http://localhost:3000",
  // Add more origins here
];
```

## ⚡ Performance Optimizations

- **Connection Pooling**: Axios instances use HTTP/HTTPS agents with `keepAlive` enabled
- **Request Timeout**: 10-second timeout on external API calls
- **Max Sockets**: Up to 50 concurrent connections per protocol

## 🏗️ Code Structure

The backend code is organized into clear sections:

```javascript
// ============================================================================
// CONFIGURATION
// ============================================================================
// Environment variables, constants, axios instance, Supabase client

// ============================================================================
// MIDDLEWARE SETUP
// ============================================================================
// CORS, Helmet, body parsers

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================
// Utility functions like HTML parsing

// ============================================================================
// ROUTES
// ============================================================================
// All API endpoints

// ============================================================================
// START SERVER
// ============================================================================
// Server initialization
```

## 🏗️ Project Structure

```
backend/
├── index.js          # Main application file (refactored, organized)
├── package.json      # Dependencies and scripts
├── .env              # Environment variables (not committed)
└── README.md         # This file
```

## 🛡️ Security

- **Helmet.js**: Adds security headers to all responses
- **CORS**: Restricts cross-origin requests to allowed domains only
- **Environment Variables**: Sensitive tokens stored in `.env` file
- **Input Validation**: All endpoints validate required parameters

## 🐛 Error Handling

All endpoints include try-catch blocks and return appropriate HTTP status codes:

- `200` - Success
- `400` - Bad Request (missing or invalid parameters)
- `404` - Not Found (resource doesn't exist)
- `500` - Internal Server Error

Error responses are logged to console with descriptive messages for debugging.

## 📝 Notes

- The shipping cost and tracking endpoints integrate with **Paxel's API**
- **HTML parsing** (Cheerio) is used to extract shipping information from Paxel responses
- Product data is fetched from **Supabase** with specific field selection for efficiency
- Warehouse stock is stored as JSONB in the `warehouse_stock` column

## 🤝 Contributing

When adding new endpoints:

1. Add appropriate error handling with try-catch
2. Validate all required parameters
3. Use the shared `axiosInstance` for external API calls
4. Return consistent error responses
5. Log errors with descriptive context
6. Document the endpoint in this README

## 📄 License

Private project for silvergold.id

---

**Last Updated:** November 28, 2025
