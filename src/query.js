const query = function(beveragesData, empId) {
  let empBeverages = beveragesData[empId];
  return [beveragesData, empBeverages];
};

exports.query = query;
