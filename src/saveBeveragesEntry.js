const getBeveragesData = require("./utils.js").getBeveragesData;

const createNewUserTransaction = function(prevTransactions, userEnteredEmpId) {
  prevTransactions[userEnteredEmpId] = [];
  return prevTransactions[userEnteredEmpId];
};

const saveBeverageEntry = function(
  read,
  path,
  isExists,
  pairedUserEnteredValues,
  getDate
) {
  const userEnteredEmpId = pairedUserEnteredValues["--empId"];
  const userEnteredBeverage = pairedUserEnteredValues["--beverage"];
  const userEnteredQty = pairedUserEnteredValues["--qty"];
  let prevTransactions = getBeveragesData(read, path, isExists);
  let empBeverages = prevTransactions[userEnteredEmpId];
  if (!empBeverages) {
    empBeverages = createNewUserTransaction(prevTransactions, userEnteredEmpId);
  }
  let transaction = {
    empId: userEnteredEmpId,
    beverage: userEnteredBeverage,
    qty: userEnteredQty,
    date: getDate()
  };
  empBeverages.push(transaction);

  return {
    beveragesData: prevTransactions,
    transactionDetails: [
      "Transaction Recorded:\nEmployee ID,Beverage,Quantity,Date\n",
      [transaction]
    ]
  };
};

exports.saveBeverageEntry = saveBeverageEntry;
