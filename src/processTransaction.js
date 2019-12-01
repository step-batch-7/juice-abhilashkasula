const utils = require("./utils.js");
const pairUserEnteredValues = utils.pairUserEnteredValues;
const updateBeverageEntry = require("./updateBeveragesEntry.js")
  .updateBeverageEntry;
const query = require("./query.js").query;
const writeBeverages = utils.writeBeverages;
const getAsMessage = utils.getAsMessage;
const areArgsNotValid = utils.areArgsNotValid;
const getUsage = utils.getUsage;
const loadTransactions = utils.loadTransactions;

const processTransaction = function(fileSystem, path, userArgs, getDate) {
  const operations = {
    "--save": [updateBeverageEntry, "save"],
    "--query": [query, "query"]
  };
  const transaction = operations[userArgs[0]];
  const pairedUserEnteredValues = pairUserEnteredValues(userArgs.slice(1));
  if (
    transaction == undefined ||
    areArgsNotValid(transaction[1], pairedUserEnteredValues)
  ) {
    return getUsage();
  }
  const prevTransactions = loadTransactions(
    fileSystem.read,
    path,
    fileSystem.isExists
  );
  const beveragesDataAndTransactionDetails = transaction[0](
    prevTransactions,
    pairedUserEnteredValues,
    getDate
  );
  const transactionsToBeSaved =
    beveragesDataAndTransactionDetails.beveragesData;
  const transactionsMadeNow =
    beveragesDataAndTransactionDetails.transactionDetails;
  transactionsToBeSaved.length &&
    writeBeverages(transactionsToBeSaved, path, fileSystem.write);
  return getAsMessage(transactionsMadeNow);
};

exports.processTransaction = processTransaction;
