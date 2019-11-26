const processTransaction = require("./src/processTransaction.js")
  .processTransaction;
const fs = require("fs");

const main = function() {
  const userArgs = process.argv.slice(2);
  const transactionDetails = processTransaction(
    fs.readFileSync,
    "./src/beveragesData.json",
    userArgs,
    fs.writeFileSync,
    fs.existsSync,
    function() {
      return new Date().toJSON();
    }
  );
  console.log(transactionDetails);
};

main();
