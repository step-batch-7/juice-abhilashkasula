const processTransaction = require("./src/processTransaction.js")
  .processTransaction;
const fs = require("fs");
const getDate = require("./src/utils.js").getDate;
const readFile = fs.readFileSync;
const writeFile = fs.writeFileSync;

const main = function() {
  const userArgs = process.argv.slice(2);
  const transactionDetails = processTransaction(
    readFile,
    "./src/beveragesData.json",
    userArgs,
    writeFile,
    getDate
  );
  console.log(transactionDetails);
};

main();
