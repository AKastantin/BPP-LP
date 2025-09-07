# API Setup Instructions

## Overview
This API provides the following functionality:
- Form submission handling with Telegram notifications
- Address autocomplete for property searches
- Property search with dummy results
- Email request storage and Telegram notifications

## Environment Variables Setup

Create a `.env` file in the root directory with the following variables:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Telegram Bot Configuration
TELEGRAM_BOT_TOKEN=your_bot_token_here
TELEGRAM_CHAT_ID=your_chat_id_here
```

## Telegram Bot Setup

### Step 1: Create a Telegram Bot
1. Open Telegram and search for `@BotFather`
2. Start a conversation and send `/newbot`
3. Follow the instructions to create your bot
4. Copy the bot token provided by BotFather

### Step 2: Get Your Chat ID
1. Start a conversation with your newly created bot
2. Send any message to your bot
3. Visit this URL in your browser (replace `YOUR_BOT_TOKEN` with your actual token):
   ```
   https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getUpdates
   ```
4. Look for `"chat":{"id": YOUR_CHAT_ID}` in the JSON response
5. Copy the chat ID number

### Step 3: Configure Environment Variables
Add both the bot token and chat ID to your `.env` file.

## API Endpoints

### 1. Address Autocomplete
- **GET** `/api/addresses?q=search_term`
- Returns a list of addresses for autocomplete
- Query parameter `q` is optional for filtering

### 2. Property Search
- **POST** `/api/property-search`
- Body: `{ "address": "string", "property_type": "string", "bedrooms": "string" }`
- Returns dummy property valuation results

### 3. Email Results Request
- **POST** `/api/email-results`
- Body: `{ "email": "string", "property_address": "string", "property_results": object }`
- Stores email request and sends Telegram notification

### 4. Existing Form Endpoints (Updated with Telegram notifications)
- **POST** `/api/leads` - Contact form submissions
- **POST** `/api/property-forecast` - Property forecast requests
- **POST** `/api/survey` - Survey responses
- **POST** `/api/demo-request` - Demo requests
- **POST** `/api/newsletter` - Newsletter signups

## Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables as described above

3. Start the development server:
   ```bash
   npm run dev
   ```

## Testing the API

You can test the endpoints using curl or any API client:

### Test Address Autocomplete
```bash
curl "http://localhost:5000/api/addresses?q=london"
```

### Test Property Search
```bash
curl -X POST http://localhost:5000/api/property-search \
  -H "Content-Type: application/json" \
  -d '{"address": "123 Baker Street, London", "property_type": "house", "bedrooms": "3"}'
```

### Test Email Results Request
```bash
curl -X POST http://localhost:5000/api/email-results \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "property_address": "123 Baker Street, London", "property_results": {"currentValue": 500000}}'
```

## Notes

- All form submissions and email requests will trigger Telegram notifications if properly configured
- The API uses dummy data for property valuations and address autocomplete
- In production, you would replace the dummy data with real property data sources
- The storage is currently in-memory (MemStorage) - for production, implement a proper database storage class
