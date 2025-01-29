const express = require('express');
const { getContract } = require('../config/blockchain');
const User = require('../models/User');

const router = express.Router();

// Upload Diamond Details
router.post('/upload', async (req, res) => {
  try {
    const { origin, certificateHash, imageHash } = req.body;
    const contract = await getContract();
    const tx = await contract.addDiamond(origin, certificateHash, imageHash);
    await tx.wait();
    res.json({ success: true, transactionHash: tx.hash });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Verify Diamond
router.get('/verify/:diamondId', async (req, res) => {
  try {
    const { diamondId } = req.params;
    const contract = await getContract();
    const diamond = await contract.getDiamond(diamondId);
    res.json({ diamond });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;