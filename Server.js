const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { initializeDatabase } = require('./Models/Database');
const accountRoutes = require('./Routes/Accounts');
const destinationRoutes = require('./Routes/Destinations');
const dataRoutes = require('./Routes/Data');

const app = express();
const PORT = process.env.PORT || 8000;

const corsOptions = {
  origin: '*', 
  allowedHeaders: ['Content-Type', 'CL-X-TOKEN'] 
};

app.use(bodyParser.json());

app.use('/accounts', accountRoutes);
app.use('/accounts/:accountId/destinations', destinationRoutes);
app.use('/server', dataRoutes);
app.use((req, res, next) => {
  res.status(404).send('URL was wrong - Please check the endpoint');
});
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

async function startServer() {
  await initializeDatabase();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();