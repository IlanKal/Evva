# Evva Backend

This is the backend for **Evva**, a smart event-planning platform for companies.  
Built with **Node.js**, it connects to a **PostgreSQL** database using **Sequelize**.

The backend receives event preferences collected via a built-in chatbot interface, filters relevant suppliers (e.g., venues, catering, DJs, photographers), and uses a custom optimization algorithm to recommend the best supplier combination that fits the user's budget and needs.

## Prerequisites
- **Node.js** and **npm** installed on your machine.
  - Check by running:
    ```bash
    node -v
    npm -v
    ```
- **Database Connection**: Ensure you have the correct database credentials in `db.ts` or `.env`.(hosted on Render)

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

## Project Structure

src/
├── config/         # Database connection settings
├── constants/      # Enums and constants (regions, weekdays, etc.)
├── controllers/    # Handles API requests
├── middlewares/    # Auth and error handling middleware
├── models/         # Sequelize models (tables)
├── repositories/   # DB interaction logic
├── routes/         # API endpoints
├── services/       # Business logic, including optimization algorithm
├── types/          # TypeScript interfaces and definitions
├── utils/          # Utility functions (e.g., JWT helpers)
├── app.ts          # Express app setup
└── server.ts       # Entry point


