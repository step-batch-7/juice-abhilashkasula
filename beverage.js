const processTransaction = require("./src/processTransaction.js")
  .processTransaction;
const { getDate, getFilePath } = require("./src/config.js");
const fs = require("fs");

const main = function() {
  const timeStamp = getDate.bind(null, process.env);
  const path = getFilePath(process.env);
  const userArgs = process.argv.slice(2);
  const transactionDetails = processTransaction(
    { read: fs.readFileSync, write: fs.writeFileSync, isExists: fs.existsSync },
    path,
    userArgs,
    timeStamp
  );
  console.log(transactionDetails);
};

main();
