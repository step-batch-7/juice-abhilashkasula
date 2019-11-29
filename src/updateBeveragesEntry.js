const generateUpdateBeverageMessage = function(
  transactions,
  transactionMadeNow
) {
  return {
    beveragesData: transactions,
    transactionDetails: [
      "Transaction Recorded:\nEmployee ID,Beverage,Quantity,Date",
      [transactionMadeNow]
    ]
  };
};

const updateBeverageEntry = function(
  transactions,
  pairedUserEnteredValues,
  getDate
) {
  const userEnteredEmpId = pairedUserEnteredValues["--empId"];
  const userEnteredBeverage = pairedUserEnteredValues["--beverage"];
  const userEnteredQty = pairedUserEnteredValues["--qty"];
  let transactionMadeNow = {
    empId: userEnteredEmpId,
    beverage: userEnteredBeverage,
    qty: userEnteredQty,
    date: getDate()
  };
  transactions.push(transactionMadeNow);
  return generateUpdateBeverageMessage(transactions, transactionMadeNow);
};

exports.updateBeverageEntry = updateBeverageEntry;
