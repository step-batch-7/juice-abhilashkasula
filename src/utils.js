const fs = require("fs");

const getDate = function() {
  return new Date().toJSON();
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

const getBeveragesData = function(read, path) {
  let prevTransactions = {};
  try {
    prevTransactions = JSON.parse(read(path, "utf8"));
  } catch (e) {}
  return prevTransactions;
};

const writeBeverages = function(beveragesData, path, write) {
  const dataToBeWritten = JSON.stringify(beveragesData);
  write(path, dataToBeWritten);
};

const getAsMessage = function(transactionDetails) {
  const message = transactionDetails[0];
  let transactionValues = transactionDetails[1].reduce(function(a, obj) {
    a.push(Object.values(obj));
    return a;
  }, []);
  const remaining = transactionDetails.slice(2);
  return message + transactionValues.join("\n") + remaining;
};

exports.getDate = getDate;
exports.pairUserEnteredValues = pairUserEnteredValues;
exports.getBeveragesData = getBeveragesData;
exports.writeBeverages = writeBeverages;
exports.getAsMessage = getAsMessage;