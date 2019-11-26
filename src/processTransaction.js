const pairUserEnteredValues = require("./utils.js").pairUserEnteredValues;
const saveBeverageEntry = require("./saveBeveragesEntry").saveBeverageEntry;
const query = require("./query.js").query;
const writeBeverages = require("./utils.js").writeBeverages;
const getAsMessage = require("./utils.js").getAsMessage;

const processTransaction = function(read, path, userArgs, write, getDate) {
  const operations = { "--save": saveBeverageEntry, "--query": query };
  const transaction = operations[userArgs[0]];
  const pairedUserEnteredValues = pairUserEnteredValues(userArgs.slice(1));
  const beveragesDataAndTransactionDetails = transaction(
    read,
    path,
    pairedUserEnteredValues,
    getDate
  );
  const beveragesDataToBeSaved =
    beveragesDataAndTransactionDetails["beveragesData"];
  const transactionDetails =
    beveragesDataAndTransactionDetails["transactionDetails"];
  if (!transactionDetails) {
    return "no data found";
  }
  writeBeverages(beveragesDataToBeSaved, path, write);
  return getAsMessage(transactionDetails);
};

exports.processTransaction = processTransaction;
