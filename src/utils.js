const fs = require("fs");

const getTotal = function(beveragesData) {
  const total = beveragesData.reduce(function(total, obj) {
    let value = +obj.qty;
    return total + value;
  }, 0);
  return total == 1 ? total + " Juice" : total + " Juices";
};

const pairUserEnteredValues = function(userEnteredValues) {
  let pairs = [];
  for (let index = 0; index < userEnteredValues.length; index += 2) {
    pairs.push(userEnteredValues.slice(index, index + 2));
  }
  return pairs.reduce(function(pairs, values) {
    pairs[values[0]] = values[1];
    return pairs;
  }, {});
};

const loadTransactions = function(read, path, isExists) {
  let transactions = [];
  if (isExists(path)) {
    transactions = JSON.parse(read(path, "utf8"));
    transactions = transactions.map(transaction => {
      transaction["date"] = new Date(transaction.date);
      return transaction;
    });
  }
  return transactions;
};

const writeBeverages = function(beveragesData, path, write) {
  const dataToBeWritten = JSON.stringify(beveragesData);
  write(path, dataToBeWritten);
};

const toRowLine = function(transaction) {
  const fieldNames = "empId,beverage,qty,date".split(",");
  const values = fieldNames.map(name => {
    if (name == "date") {
      return transaction[name].toJSON();
    }
    return transaction[name];
  });
  return values.join(",");
};
const getAsMessage = function(transactions) {
  const header = transactions[0];
  const footer = transactions.slice(2);
  const rowLines = transactions[1].map(toRowLine);
  return [header, ...rowLines].join("\n") + footer;
};

const getBeveragesOnId = function(beveragesData, userEnteredEmpId) {
  const transactionsOfId =
    userEnteredEmpId &&
    beveragesData.filter(function(transaction) {
      return transaction.empId == userEnteredEmpId;
    });
  return transactionsOfId || beveragesData;
};

const getBeveragesOnDate = function(beveragesData, userEnteredDate) {
  const transactionsOnDate =
    userEnteredDate &&
    beveragesData.filter(function(beverageTransaction) {
      return beverageTransaction.date.toJSON().includes(userEnteredDate);
    });
  return transactionsOnDate || beveragesData;
};

const getBeveragesOnBeverage = function(beveragesData, userEnteredBeverage) {
  const transactionsByBeverage =
    userEnteredBeverage &&
    beveragesData.filter(function(transaction) {
      return transaction.beverage == userEnteredBeverage;
    });
  return transactionsByBeverage || beveragesData;
};

const getBeveragesOnEmpIdDateAndBeverages = function(
  beveragesData,
  userEnteredId,
  userEnteredDate,
  userEnteredBeverage
) {
  if (
    userEnteredDate == undefined &&
    userEnteredId == undefined &&
    userEnteredBeverage == undefined
  ) {
    return [];
  }
  return getBeveragesOnBeverage(
    getBeveragesOnDate(
      getBeveragesOnId(beveragesData, userEnteredId),
      userEnteredDate
    ),
    userEnteredBeverage
  );
};

const areKeysValidForSave = function(pairedUserEnteredValues) {
  const userKeys = Object.keys(pairedUserEnteredValues);
  const areEnteredKeysFound = userKeys.every(key =>
    ["--empId", "--qty", "--beverage"].includes(key)
  );
  return (
    areEnteredKeysFound &&
    ["--empId", "--beverage", "--qty"].every(key => userKeys.includes(key))
  );
};

const areKeysValidForQuery = function(pairedUserEnteredValues) {
  const userKeys = Object.keys(pairedUserEnteredValues);
  return (
    userKeys.every(key => ["--empId", "--date", "--beverage"].includes(key)) &&
    ["--empId", "--date", "--beverage"].some(key => userKeys.includes(key))
  );
};

const areArgsValid = function(transaction, pairedUserEnteredValues) {
  const builtinTransactions = {
    save: areKeysValidForSave,
    query: areKeysValidForQuery
  };
  const areKeysValid = builtinTransactions[transaction];
  return areKeysValid && areKeysValid(pairedUserEnteredValues);
};

const getUsage = function() {
  return "node beverage.js --save --beverage [beverage value]--empId [empId value] --qty [qty value]\n\t\t--query --empId[empId value]";
};

exports.pairUserEnteredValues = pairUserEnteredValues;
exports.loadTransactions = loadTransactions;
exports.writeBeverages = writeBeverages;
exports.getAsMessage = getAsMessage;
exports.areArgsValid = areArgsValid;
exports.getUsage = getUsage;
exports.getBeveragesOnEmpIdDateAndBeverages = getBeveragesOnEmpIdDateAndBeverages;
exports.getTotal = getTotal;
