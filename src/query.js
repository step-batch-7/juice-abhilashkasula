const getBeveragesData = require("./utils.js").getBeveragesData;
const loadBeveragesOnEmpIdAndDate = require("./utils.js")
  .loadBeveragesOnEmpIdAndDate;
const combineBeverages = require("./utils.js").combineBeverages;
const getTotal = require("./utils.js").getTotal;

const query = function(read, path, isExists, pairedOptions) {
  const userEnteredEmpId = pairedOptions["--empId"];
  const userEnteredDate = pairedOptions["--date"];
  let prevTransactions = getBeveragesData(read, path, isExists);
  const beveragesOnEmpIdAndDate = loadBeveragesOnEmpIdAndDate(
    prevTransactions,
    userEnteredEmpId,
    userEnteredDate
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
