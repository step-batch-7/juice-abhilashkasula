const getDate = env => {
  const stubbedDate = new Date(env.NOW);
  const hasValidStubbedDate = !isNaN(stubbedDate.getTime());
  return hasValidStubbedDate ? stubbedDate : new Date();
};

const getFilePath = env =>
  env.JUICE_TRANSACTIONS_STORE_PATH || "./data/beveragesTransactions.json";

module.exports = { getDate, getFilePath };
