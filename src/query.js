const getBeveragesData = require("./utils.js").getBeveragesData;
const loadBeveragesOnEmpIdDateAndBeverages = require("./utils.js")
  .loadBeveragesOnEmpIdDateAndBeverages;
const combineBeverages = require("./utils.js").combineBeverages;
const getTotal = require("./utils.js").getTotal;

const query = function(read, path, isExists, pairedOptions) {
  const userEnteredEmpId = pairedOptions["--empId"];
  const userEnteredDate = pairedOptions["--date"];
  const userEnteredBeverage = pairedOptions["--beverage"];
  let prevTransactions = getBeveragesData(read, path, isExists);
  const beveragesOnEmpIdAndDate = loadBeveragesOnEmpIdDateAndBeverages(
    prevTransactions,
    userEnteredEmpId,
    userEnteredDate,
    userEnteredBeverage
  );
  let combinedBeverages = [];
  let totalBeverages = 0;
  if (Object.keys(beveragesOnEmpIdAndDate).length != 0) {
    combinedBeverages = combineBeverages(beveragesOnEmpIdAndDate);
    totalBeverages = getTotal(combinedBeverages);
  } else {
    combinedBeverages = false;
  }
  return {
    beveragesData: prevTransactions,
    transactionDetails: [
      "Employee ID,Beverage,Quantity,Date\n",
      combinedBeverages,
      "\nTotal:" + totalBeverages
    ]
  };
};

exports.query = query;
