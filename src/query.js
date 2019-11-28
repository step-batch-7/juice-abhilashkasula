const getBeveragesData = require("./utils.js").getBeveragesData;
const loadBeveragesOnEmpIdDateAndBeverages = require("./utils.js")
  .loadBeveragesOnEmpIdDateAndBeverages;
const getTotal = require("./utils.js").getTotal;

const query = function(read, path, isExists, pairedOptions) {
  const userEnteredEmpId = pairedOptions["--empId"];
  const userEnteredDate = pairedOptions["--date"];
  const userEnteredBeverage = pairedOptions["--beverage"];
  let prevTransactions = getBeveragesData(read, path, isExists);
  let beveragesOnEmpIdAndDate = loadBeveragesOnEmpIdDateAndBeverages(
    prevTransactions,
    userEnteredEmpId,
    userEnteredDate,
    userEnteredBeverage
  );
  if (beveragesOnEmpIdAndDate.length == 0) {
    beveragesOnEmpIdAndDate = false;
  }
  return {
    beveragesData: prevTransactions,
    transactionDetails: [
      "Employee ID,Beverage,Quantity,Date\n",
      beveragesOnEmpIdAndDate,
      "\nTotal:" + getTotal(beveragesOnEmpIdAndDate)
    ]
  };
};

exports.query = query;
