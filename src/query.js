const query = function(read, path, pairedOptions) {
  const userEnteredEmpId = pairedOptions["--empId"];
  let prevTransactions = {};
  try {
    prevTransactions = read(path);
  } catch (e) {
    return { "transaction details": [prevTransactions] };
  }
  let empBeverages = prevTransactions[userEnteredEmpId];
  if (!empBeverages) {
    empBeverages = [{}];
  }
  return { "transaction details": empBeverages };
};

exports.query = query;
