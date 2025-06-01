# Data Pusher - Node.js Webhook Forwarder

![Node.js](https://img.shields.io/badge/Node.js-18.x-green)
![Express](https://img.shields.io/badge/Express-4.x-blue)
![SQLite](https://img.shields.io/badge/SQLite-3-lightgrey)

A robust Express.js application that receives JSON data and forwards it to configurable webhook destinations with authentication support.

## 📌 Key Features

- **Account Management** (CRUD operations)
- **Destination Configuration** (Multiple endpoints per account)
- **Secure Data Forwarding** (Token-based authentication)
- **Multi-Protocol Support** (GET/POST/PUT)
- **Error Resilient** (Continues if some destinations fail)

## 🚀 Workflow Overview

```mermaid
sequenceDiagram
    participant Client
    participant API
    participant Destinations

    Client->>API: 1. Create Account (POST /accounts)
    API-->>Client: Returns app_secret_token
    
    Client->>API: 2. Add Destinations (POST /accounts/:id/destinations)
    API-->>Client: Confirms destination setup
    
    Client->>API: 3. Send Data (POST /server/incoming_data)
    API->>Destinations: 4. Forwards to all registered URLs
    Destinations-->>API: Response from endpoints
    API-->>Client: Forwarding status report
