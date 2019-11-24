const createNewUserTransaction = function(prevTransactions, userEnteredEmpId) {
  prevTransactions[userEnteredEmpId] = [];
  return prevTransactions[userEnteredEmpId];
};

const saveBeverageEntry = function(
  read,
  write,
  path,
  pairedOptions,
  getDate,
  date
) {
  let prevTransactions = {};
  const userEnteredEmpId = pairedOptions["--empId"];
  const userEnteredBeverage = pairedOptions["--beverage"];
  const userEnteredQty = pairedOptions["--qty"];
  try {
    prevTransactions = read(path);
  } catch (e) {}
  let empBeverages = prevTransactions[userEnteredEmpId];
  if (!empBeverages) {
    empBeverages = createNewUserTransaction(prevTransactions, userEnteredEmpId);
  }
  let transaction = {
    beverage: userEnteredBeverage,
    qty: userEnteredQty,
    date: getDate(date)
  };
  empBeverages.push(transaction);
  write(path, prevTransactions);
  return {
    "transaction status": "Transaction Recorded",
    "transaction details": transaction
  };
};

exports.saveBeverageEntry = saveBeverageEntry;
