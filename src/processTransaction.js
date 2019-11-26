const pairUserEnteredValues = require("./utils.js").pairUserEnteredValues;
const saveBeverageEntry = require("./saveBeveragesEntry").saveBeverageEntry;
const query = require("./query.js").query;
const writeBeverages = require("./utils.js").writeBeverages;
const getAsMessage = require("./utils.js").getAsMessage;
const areArgsNotValid = require("./utils.js").areArgsNotValid;
const getUsage = require("./utils.js").getUsage;

const processTransaction = function(read, path, userArgs, write, getDate) {
  const operations = {
    "--save": [saveBeverageEntry, "save"],
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
  const beveragesDataAndTransactionDetails = transaction[0](
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
    return "no previous records found for this employee";
  }
  writeBeverages(beveragesDataToBeSaved, path, write);
  return getAsMessage(transactionDetails);
};

exports.processTransaction = processTransaction;
