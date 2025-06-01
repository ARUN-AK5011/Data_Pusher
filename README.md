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
```

## 🔧 API Endpoints

### Account Management
| Method | Endpoint               | Description                              |
|--------|------------------------|------------------------------------------|
| POST   | `/accounts`            | Create new account                       |
| GET    | `/accounts/:id`        | Get account details                      |
| PUT    | `/accounts/:id`        | Update account                           |
| DELETE | `/accounts/:id`        | Delete account (and all its destinations) |

### Destination Management
| Method | Endpoint                               | Description                |
|--------|----------------------------------------|----------------------------|
| POST   | `/accounts/:id/destinations`           | Add new destination        |
| GET    | `/accounts/:id/destinations`           | List all destinations      |
| PUT    | `/accounts/:id/destinations/:destId`   | Update destination         |
| DELETE | `/accounts/:id/destinations/:destId`   | Remove destination         |

### Data Handling
| Method | Endpoint               | Description                              |
|--------|------------------------|------------------------------------------|
| POST   | `/server/incoming_data`| Forward JSON data to all destinations    |


## 🛠 Setup & Installation

### Prerequisites
- Node.js v18+
- npm v9+
- SQLite3 (comes bundled with Node.js)

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/data-pusher.git
cd data-pusher
```
### 2. Run the Project
```bash
npm install
npm start
```
## 📚 Postman Collection

## 📚 Postman Collection
[![Run in Postman](https://run.pstmn.io/button.svg)](https://www.postman.com/dark-star-200065/workspace/my-workspace/collection/32014271-13d9b1f3-a98f-419f-82fc-089393f7eadd)
*One-click import to your Postman workspace*

