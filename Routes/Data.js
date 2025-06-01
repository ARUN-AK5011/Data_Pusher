const express = require('express');
const router = express.Router();
const axios = require('axios');
const { Account, Destination } = require('../Models/Database');

router.all('/incoming_data', (req, res, next) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      error: 'Method Not Allowed',
      allowed: ['POST'] 
    });
  }
  next();
});

router.post('/incoming_data', async (req, res) => {
  try {
    if (!req.is('application/json')) {
      return res.status(400).json({ error: 'Invalid Data' });
    }

    const token = req.headers['cl-x-token'] || req.headers['CL-X-TOKEN'];
    if (!token) {
      return res.status(401).json({ error: 'Un Authenticate' });
    }

    const account = await Account.findOne({ 
      where: { app_secret_token: token } 
    });
    if (!account) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    const destinations = await Destination.findAll({ 
      where: { AccountId: account.id }
    });
    if(!destinations){
      return res.status(201).json({ error: 'No destinatins Found' });
    }
    const forwardPromises = destinations.map(async (destination) => {
      try {
        const config = {
          headers: {
            ...destination.headers,
            'Content-Type': 'application/json'
          }
        };

        if (destination.http_method.toUpperCase() === 'GET') {
          const params = new URLSearchParams();
          for (const [key, value] of Object.entries(req.body)) {
            params.append(key, typeof value === 'object' ? JSON.stringify(value) : value);
          }
          return axios.get(`${destination.url}?${params.toString()}`, config);
        } else {
          return axios({
            method: destination.http_method.toLowerCase(),
            url: destination.url,
            data: req.body,
            headers: config.headers
          });
        }
      } catch (error) {
        console.error(`Failed to forward to ${destination.url}:`, error.message);
        return null;
      }
    });

    await Promise.all(forwardPromises);
    res.json({ success: true, forwardedTo: destinations.length });
    
  } catch (error) {
    console.error('Data handling error:', error);
    res.status(500).json({ error: 'Failed to process data' });
  }
});

module.exports = router;