const fs = require("fs");

const getTotal = function(beveragesData) {
  return beveragesData.reduce(function(total, obj) {
    let value = +obj.qty;
    return total + value;
  }, 0);
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

const getBeveragesData = function(read, path, isExists) {
  let prevTransactions = {};
  if (isExists(path)) {
    prevTransactions = JSON.parse(read(path, "utf8"));
  }
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

const loadBeveragesOnId = function(beveragesDate, empId) {
  let empBeverages = {};
  if (empId == undefined) {
    return beveragesDate;
  }
  let beverage = beveragesDate[empId];
  if (beverage != undefined) {
    empBeverages[empId] = beverage;
  }
  return empBeverages;
};

const loadBeveragesOnDate = function(beveragesData, userEnteredDate) {
  let employees = Object.keys(beveragesData);
  if (userEnteredDate == undefined) {
    return beveragesData;
  }
  return employees.reduce(function(addedEmployees, employee) {
    let beveragesOnDate = beveragesData[employee].reduce(function(
      addedBeverages,
      beverages
    ) {
      if (beverages["date"].includes(userEnteredDate)) {
        addedBeverages.push(beverages);
      }
      return addedBeverages;
    },
    []);
    if (beveragesOnDate != 0) {
      addedEmployees[employee] = beveragesOnDate;
    }
    return addedEmployees;
  }, {});
};

const loadBeveragesOnBeverage = function(beveragesData, userEnteredBeverage) {
  let employees = Object.keys(beveragesData);
  if (userEnteredBeverage == undefined) {
    return beveragesData;
  }
  return employees.reduce(function(addedEmployees, employee) {
    let beveragesOnEnteredBeverage = beveragesData[employee].reduce(function(
      addedBeverages,
      beverages
    ) {
      if (beverages["beverage"].includes(userEnteredBeverage)) {
        addedBeverages.push(beverages);
      }
      return addedBeverages;
    },
    []);
    if (beveragesOnEnteredBeverage != 0) {
      addedEmployees[employee] = beveragesOnEnteredBeverage;
    }
    return addedEmployees;
  }, {});
};

const loadBeveragesOnEmpIdDateAndBeverages = function(
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
    return {};
  }
  return loadBeveragesOnBeverage(
    loadBeveragesOnDate(
      loadBeveragesOnId(beveragesData, userEnteredId),
      userEnteredDate
    ),
    userEnteredBeverage
  );
};

const combineBeverages = function(beveragesData) {
  const employees = Object.keys(beveragesData);
  return employees.reduce(function(combinedBeverages, emp) {
    combinedBeverages = combinedBeverages.concat(beveragesData[emp]);
    return combinedBeverages;
  }, []);
};

const areKeysValidForSave = function(pairedUserEnteredValues) {
  const userKeys = Object.keys(pairedUserEnteredValues);
  return ["--empId", "--beverage", "--qty"].every(function(key) {
    return userKeys.includes(key);
  });
};

const areKeysValidForQuery = function(pairedUserEnteredValues) {
  const userKeys = Object.keys(pairedUserEnteredValues);
  return ["--empId", "--date", "--beverage"].some(function(key) {
    return userKeys.includes(key);
  });
};

const areArgsNotValid = function(transaction, pairedUserEnteredValues) {
  const builtinTransactions = {
    save: areKeysValidForSave,
    query: areKeysValidForQuery
  };
  const areKeysValid = builtinTransactions[transaction];
  if (!areKeysValid) {
    return true;
  }
  return !areKeysValid(pairedUserEnteredValues);
};

const getUsage = function() {
  return "node beverage.js --save --beverage [beverage value]--empId [empId value] --qty [qty value]\n\t\t--query --empId[empId value]";
};

exports.pairUserEnteredValues = pairUserEnteredValues;
exports.getBeveragesData = getBeveragesData;
exports.writeBeverages = writeBeverages;
exports.getAsMessage = getAsMessage;
exports.areArgsNotValid = areArgsNotValid;
exports.getUsage = getUsage;
exports.loadBeveragesOnEmpIdDateAndBeverages = loadBeveragesOnEmpIdDateAndBeverages;
exports.combineBeverages = combineBeverages;
exports.getTotal = getTotal;
