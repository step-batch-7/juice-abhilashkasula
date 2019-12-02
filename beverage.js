const processTransaction = require("./src/processTransaction.js")
  .processTransaction;
const { getDate, getFilePath } = require("./src/config.js");
const fs = require("fs");

const main = function() {
  const timeStamp = getDate.bind(null, process.env);
  const filePath = getFilePath(process.env);
  const userArgs = process.argv.slice(2);
  const transactionDetails = processTransaction(userArgs, {
    read: fs.readFileSync,
    write: fs.writeFileSync,
    isExists: fs.existsSync,
    path: filePath,
    date: timeStamp
  });
  console.log(transactionDetails);
};

main();
