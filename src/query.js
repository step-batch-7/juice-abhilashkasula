const getBeveragesData = require("./utils.js").getBeveragesData;

const query = function(read, path, isExists, pairedOptions) {
  const userEnteredEmpId = pairedOptions["--empId"];
  let prevTransactions = getBeveragesData(read, path, isExists);
  let empBeverages = prevTransactions[userEnteredEmpId];
  if (!empBeverages) {
    return false;
  }
  let total = empBeverages.reduce(function(total, obj) {
    let value = +obj.qty;
    return total + value;
  }, 0);
  return {
    beveragesData: prevTransactions,
    transactionDetails: [
      "Employee ID,Beverage,Quantity,Date\n",
      empBeverages,
      "\nTotal:" + total
    ]
  };
};

exports.query = query;
