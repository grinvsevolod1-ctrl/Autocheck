const mongoose = require('mongoose');

const trackedVinSchema = new mongoose.Schema({
  vin: { type: String, unique: true },
  addedAt: { type: Date, default: Date.now }
});

const TrackedVin = mongoose.model('TrackedVin', trackedVinSchema);

const addTrackedVin = async (vin) => {
  try {
    await TrackedVin.updateOne({ vin }, { vin }, { upsert: true });
  } catch (err) {
    console.error('❌ Ошибка сохранения VIN', err);
  }
};

module.exports = { TrackedVin, addTrackedVin };