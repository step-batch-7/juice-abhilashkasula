const utils = require("./utils.js");
const pairUserEnteredValues = utils.pairUserEnteredValues;
const updateBeverageEntry = require("./updateBeveragesEntry.js")
  .updateBeverageEntry;
const query = require("./query.js").query;
const writeBeverages = utils.writeBeverages;
const getAsMessage = utils.getAsMessage;
const areArgsValid = utils.areArgsValid;
const getUsage = utils.getUsage;
const loadTransactions = utils.loadTransactions;

const processTransaction = function(userArgs, requiredProperties) {
  const { read, write, isExists, path, date } = requiredProperties;
  const operations = {
    "--save": [updateBeverageEntry, "save"],
    "--query": [query, "query"]
  };
  const transaction = operations[userArgs[0]];
  const pairedUserEnteredValues = pairUserEnteredValues(userArgs.slice(1));
  if (
    transaction == undefined ||
    !areArgsValid(transaction[1], pairedUserEnteredValues)
  ) {
    return getUsage();
  }
  const prevTransactions = loadTransactions(read, path, isExists);
  const beveragesDataAndTransactionDetails = transaction[0](
    prevTransactions,
    pairedUserEnteredValues,
    date
  );
  const transactionsToBeSaved =
    beveragesDataAndTransactionDetails.beveragesData;
  const transactionsMadeNow =
    beveragesDataAndTransactionDetails.transactionDetails;
  transactionsToBeSaved.length &&
    writeBeverages(transactionsToBeSaved, path, write);
  return getAsMessage(transactionsMadeNow);
};

exports.processTransaction = processTransaction;
