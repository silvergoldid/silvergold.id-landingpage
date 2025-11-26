# SilverGold.id Backend API

Express.js backend API for the SilverGold.id landing page, providing shipping cost calculation, location search, and product management features.

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

## 🏃 Running the Server

### Development

```bash
npm start
```

The server will start on `http://localhost:4000` (or the port specified in your `.env` file).

## 📡 API Endpoints

### 1. Health Check

**GET** `/`

Test endpoint to verify the server is running.

**Response:**

```
Hello, welcome to the backend using Express.js and Supabase!
```

---

### 2. Get Products

**GET** `/v1/products`

Fetch all products from the Supabase database.

**Response:**

```json
[
  {
    "id": 1,
    "name": "Gold Bar 1g",
    "price": 950000
    // ... other product fields
  }
]
```

**Error Response:**

```json
{
  "error": "Error message"
}
```

---

### 3. Search Locations

**POST** `/v1/list-location`

Search for locations using autocomplete.

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
      // ... location details
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
  "error": "An error occurred while fetching the location data."
}
```

---

### 4. Check Shipping Cost

**POST** `/v1/check-ongkir`

Calculate shipping costs for a delivery.

**Request Body:**

```json
{
  "weight": "1",
  "zipcode_pickup": "12345",
  "destination": "Jakarta Selatan",
  "zipcode_destination": "54321"
}
```

**Response:**

```json
[
  {
    "serviceName": "Same Day",
    "price": "Rp 25.000",
    "link": "https://...",
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
  "error": "An error occurred while checking the shipping cost."
}
```

---

### 5. Track Shipment

**POST** `/v1/check-resi`

Track a shipment using its tracking code.

**Request Body:**

```json
{
  "shipment_code": "PAXEL123456789"
}
```

**Response:**

```json
{
  // Tracking information from the external API
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
  "error": "An error occurred while tracking the shipment."
}
```

## 🔒 CORS Configuration

The API is configured to accept requests from:

- `https://silvergold-id-landingpage.vercel.app` (Production)
- `http://localhost:3000` (Development)

To add more allowed origins, update the `allowedOrigins` array in `index.js`:

```javascript
const allowedOrigins = [
  "https://silvergold-id-landingpage.vercel.app",
  "http://localhost:3000",
  // Add more origins here
];
```

## ⚡ Performance Optimizations

- **Connection Pooling**: Axios instances use HTTP/HTTPS agents with `keepAlive` enabled
- **Request Timeout**: 10-second timeout on external API calls
- **Max Sockets**: Up to 50 concurrent connections

## 🏗️ Project Structure

```
backend/
├── index.js          # Main application file
├── package.json      # Dependencies and scripts
├── .env             # Environment variables (not committed)
└── README.md        # This file
```

## 🛡️ Security

- **Helmet.js**: Adds security headers to all responses
- **CORS**: Restricts cross-origin requests to allowed domains only
- **Environment Variables**: Sensitive tokens stored in `.env` file

## 🐛 Error Handling

All endpoints include try-catch blocks and return appropriate HTTP status codes:

- `200` - Success
- `400` - Bad Request (missing parameters)
- `500` - Internal Server Error

## 📝 Notes

- The shipping cost and tracking endpoints integrate with Paxel's API
- HTML parsing is used to extract shipping information from the Paxel response
- Credentials are enabled in CORS to support authenticated requests

## 🤝 Contributing

When adding new endpoints:

1. Add appropriate error handling
2. Validate all required parameters
3. Use the shared `axiosInstance` for external API calls
4. Document the endpoint in this README

## 📄 License

Private project for SilverGold.id

---

**Last Updated:** November 26, 2025
