# Evva Backend

Backend for the Evva website, built with Node.js. The server connects to a database (PostgreSQL) using Sequelize and interacts with the Copilot API.

## Prerequisites
- **Node.js** and **npm** installed on your machine.
  - Check by running:
    ```bash
    node -v
    npm -v
    ```
- **Database Connection**: Ensure you have the correct database credentials in `db.ts` or `.env`.
- **Copilot API Key**: Obtain an API key and set it in your `.env` file.

## Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd Evva/Backend


2. Install dependencies:
    npm install

3. Set up your .env file with the necessary environment variables.

4. Start the server:
    npx ts-node src/server.ts
    The server will be running at http://localhost:{{PORT}}.


5. ### 📤 Uploading Guests via Excel

The system allows uploading a list of guests for a specific event using an `.xlsx` Excel file.

#### ✅ Requirements:
- The file must be sent as `multipart/form-data` with the field name `file`
- The Excel file should include the following columns (first row as headers):
  - `full_name` (required)
  - `email` (required)
  - `phone` (optional)

#### 📥 Example Request (using Postman or curl):

**Endpoint:**
```
POST /api/guest-upload/upload/:eventId
```

**Headers:**
```
Content-Type: multipart/form-data
```

**Form Data:**

| Key  | Type | Value                |
|------|------|----------------------|
| file | File | your_excel_file.xlsx |




