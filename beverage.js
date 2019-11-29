const processTransaction = require("./src/processTransaction.js")
  .processTransaction;
const fs = require("fs");

const main = function() {
  const userArgs = process.argv.slice(2);
  const transactionDetails = processTransaction(
    { read: fs.readFileSync, write: fs.writeFileSync, isExists: fs.existsSync },
    "./src/beveragesData.json",
    userArgs,
    function() {
      return new Date().toJSON();
    }
  );
  console.log(transactionDetails);
};

main();
