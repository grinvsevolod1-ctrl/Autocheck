const express = require('express');
const { getTopFloodCars } = require('./services/copartApi');
const { describeVin } = require('./utils/aiDescribeVin');

const router = express.Router();

router.get('/cars', async (req, res) => {
  const cars = await getTopFloodCars();
  const enriched = await Promise.all(
    cars.map(async (car) => {
      const ai = await describeVin(car);
      return { ...car, ...ai };
    })
  );
  res.json(enriched);
});

module.exports = router;