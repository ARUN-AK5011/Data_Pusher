const express = require('express');
const router = express.Router({ mergeParams: true });
const { Account, Destination } = require('../Models/Database');

router.post('/', async (req, res) => {
  try {
    const account = await Account.findByPk(req.params.accountId);
    if (!account) return res.status(404).json({ error: 'Account not found' });
    
    const destination = await Destination.create({
      ...req.body,
      AccountId: req.params.accountId
    });
    
    res.status(201).json(destination);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const account = await Account.findByPk(req.params.accountId, {
      include: Destination
    });
    if (!account) return res.status(404).json({ error: 'Account not found' });
    res.json(account.Destinations);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put('/:destinationId', async (req, res) => {
  try {
    const [updated] = await Destination.update(req.body, {
      where: { id: req.params.destinationId, AccountId: req.params.accountId }
    });
    if (!updated) return res.status(404).json({ error: 'Destination not found' });
    const destination = await Destination.findByPk(req.params.destinationId);
    res.json(destination);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete('/:destinationId', async (req, res) => {
  try {
    const deleted = await Destination.destroy({
      where: { id: req.params.destinationId, AccountId: req.params.accountId }
    });
    if (!deleted) return res.status(404).json({ error: 'Destination not found' });
    res.status(204).end();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;