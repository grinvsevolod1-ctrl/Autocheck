const subscriptionSchema = new mongoose.Schema({
  keyword: String,
  chatId: Number,
  createdAt: { type: Date, default: Date.now }
});

const Subscription = mongoose.model('Subscription', subscriptionSchema);

const addSubscription = async (chatId, keyword) => {
  await Subscription.updateOne({ chatId, keyword }, { chatId, keyword }, { upsert: true });
};

const removeSubscription = async (chatId, keyword) => {
  await Subscription.deleteOne({ chatId, keyword });
};

const getSubscriptions = async (chatId) => {
  return await Subscription.find({ chatId });
};

const getAllSubscriptions = async () => {
  return await Subscription.find({});
};

module.exports = {
  TrackedVin,
  addTrackedVin,
  Subscription,
  addSubscription,
  removeSubscription,
  getSubscriptions,
  getAllSubscriptions
};