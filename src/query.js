const utils = require(`./utils.js`);
const getBeveragesOnEmpIdDateAndBeverages =
  utils.getBeveragesOnEmpIdDateAndBeverages;
const getTotal = utils.getTotal;

const generateQueryMessage = function(transactions, transactionMadeNow) {
  return {
    beveragesData: transactions,
    transactionDetails: [
      `Employee ID,Beverage,Quantity,Date`,
      transactionMadeNow,
      `\nTotal:${getTotal(transactionMadeNow)} Juices`
    ]
  };
};

const query = function(transactions, pairedOptions) {
  const userEnteredEmpId = pairedOptions[`--empId`];
  const userEnteredDate = pairedOptions[`--date`];
  const userEnteredBeverage = pairedOptions[`--beverage`];
  let transactionMadeNow = getBeveragesOnEmpIdDateAndBeverages(
    transactions,
    userEnteredEmpId,
    userEnteredDate,
    userEnteredBeverage
  );
  return generateQueryMessage(transactions, transactionMadeNow);
};
exports.query = query;
