const express = require('express');
const router = express.Router({ mergeParams: true });
const { Account } = require('../Models/Database');

router.post('/', async (req, res) => {
  try {
    if (!req.body.email || !req.body.account_name) {
      return res.status(400).json({ 
        error: 'Email and account_name are required' 
      });
    }

    const account = await Account.create(req.body);
    res.status(201).json(account);
  } catch (error) {
    res.status(400).json({ 
      error: error.errors?.map(e => e.message) || error.message 
    });
  }
});

router.get('/:accountId', async (req, res) => {
  try {
    const account = await Account.findByPk(req.params.accountId);
    if (!account) return res.status(404).json({ error: 'Account not found' });
    res.json(account);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put('/:accountId', async (req, res) => {
  try {
    const [updated] = await Account.update(req.body, {
      where: { id: req.params.accountId }
    });
    if (!updated) return res.status(404).json({ error: 'Account not found' });
    const account = await Account.findByPk(req.params.accountId);
    res.json(account);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete('/:accountId', async (req, res) => {
  try {
    const deleted = await Account.destroy({
      where: { id: req.params.accountId }
    });
    if (!deleted) return res.status(404).json({ error: 'Account not found' });
    res.json({message:"Data Deleted Successfully"});
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;