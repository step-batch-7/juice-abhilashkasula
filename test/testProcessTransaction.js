const assert = require("assert");
const processTransaction = require("../src/processTransaction")
  .processTransaction;

describe("processTransaction", function() {
  it("should give a message with transaction recorded to print for --save option for no emp found", function() {
    const read = function(data) {
      return data;
    };
    const write = function(data) {};
    const getDate = function() {
      return new Date("2019-11-24T07:43:28.618Z");
    };
    const isExists = function(data) {
      return true;
    };
    const requiredProperties = {
      read: read,
      write: write,
      isExists: isExists,
      path: "[]",
      date: getDate
    };
    const userArgs = [
      "--save",
      "--beverage",
      "orange",
      "--empId",
      "11111",
      "--qty",
      "1"
    ];
    const expected =
      "Transaction Recorded:\nEmployee ID,Beverage,Quantity,Date\n11111,orange,1,2019-11-24T07:43:28.618Z";
    assert.deepStrictEqual(
      processTransaction(userArgs, requiredProperties),
      expected
    );
  });
  it("should give a message with transaction recorded for --save option for emp found", function() {
    const read = function(data) {
      return data;
    };
    const isExists = function(data) {
      return true;
    };
    const write = function(data) {};
    const getDate = function() {
      return new Date("2019-11-24T07:43:28.618Z");
    };
    const requiredProperties = {
      read: read,
      write: write,
      isExists: isExists,
      path:
        '[{"empId":11111,"beverage":"orange","qty":1,"date":"2019-11-23T04:06:35.711Z"}]',
      date: getDate
    };
    const userArgs = [
      "--save",
      "--beverage",
      "orange",
      "--empId",
      "11111",
      "--qty",
      "1"
    ];
    const expected =
      "Transaction Recorded:\nEmployee ID,Beverage,Quantity,Date\n11111,orange,1,2019-11-24T07:43:28.618Z";
    assert.deepStrictEqual(
      processTransaction(userArgs, requiredProperties),
      expected
    );
  });
  it("should give a message consists of employee beverages and total beverages for --query on emp", function() {
    const read = function(data) {
      return data;
    };
    const isExists = function(data) {
      return true;
    };
    const write = function(data) {};
    const getDate = function() {
      return "2019-11-24T07:43:28.618Z";
    };
    const requiredProperties = {
      read: read,
      write: write,
      isExists: isExists,
      path:
        '[{"empId":11111,"beverage":"orange","qty":1,"date":"2019-11-23T04:06:35.711Z"}]',
      date: getDate
    };
    const userArgs = ["--query", "--empId", "11111"];
    const expected =
      "Employee ID,Beverage,Quantity,Date\n11111,orange,1,2019-11-23T04:06:35.711Z\nTotal:1 Juice";
    assert.deepStrictEqual(
      processTransaction(userArgs, requiredProperties),
      expected
    );
  });
  it("should give a string consists of employee beverages and total beverages for --query on date", function() {
    const read = function(data) {
      return data;
    };
    const isExists = function(data) {
      return true;
    };
    const write = function(data) {};
    const getDate = function() {
      return new Date("2019-11-24T07:43:28.618Z");
    };
    const requiredProperties = {
      read: read,
      write: write,
      isExists: isExists,
      path:
        '[{"empId":11111,"beverage":"orange","qty":1,"date":"2019-11-23T04:06:35.711Z"}]',
      date: getDate
    };
    const userArgs = ["--query", "--date", "2019-11-23"];
    const expected =
      "Employee ID,Beverage,Quantity,Date\n11111,orange,1,2019-11-23T04:06:35.711Z\nTotal:1 Juice";
    assert.deepStrictEqual(
      processTransaction(userArgs, requiredProperties),
      expected
    );
  });
  it("should give a string consists of employee beverages and total beverages for --query on beverage", function() {
    const read = function(data) {
      return data;
    };
    const isExists = function(data) {
      return true;
    };
    const write = function(data) {};
    const getDate = function() {
      return "2019-11-24T07:43:28.618Z";
    };
    const requiredProperties = {
      read: read,
      write: write,
      isExists: isExists,
      path:
        '[{"empId":11111,"beverage":"orange","qty":1,"date":"2019-11-23T04:06:35.711Z"}]',
      date: getDate
    };
    const userArgs = ["--query", "--beverage", "orange"];
    const expected =
      "Employee ID,Beverage,Quantity,Date\n11111,orange,1,2019-11-23T04:06:35.711Z\nTotal:1 Juice";
    assert.deepStrictEqual(
      processTransaction(userArgs, requiredProperties),
      expected
    );
  });
  it("should give a string consists of employee beverages and total beverages for --query on all three filters", function() {
    const read = function(data) {
      return data;
    };
    const isExists = function(data) {
      return true;
    };
    const write = function(data) {};
    const getDate = function() {
      return "2019-11-24T07:43:28.618Z";
    };
    const requiredProperties = {
      read: read,
      write: write,
      isExists: isExists,
      path:
        '[{"empId":11111,"beverage":"orange","qty":1,"date":"2019-11-23T04:06:35.711Z"},{"empId":11111,"beverage":"pineapple","qty":1,"date":"2019-11-25T04:06:35.711Z"},{"empId":11111,"beverage":"water melon","qty":1,"date":"2019-11-27T04:06:35.711Z"}]',
      date: getDate
    };
    const userArgs = [
      "--query",
      "--beverage",
      "pineapple",
      "--empId",
      "11111",
      "--date",
      "2019-11-25"
    ];
    const expected =
      "Employee ID,Beverage,Quantity,Date\n11111,pineapple,1,2019-11-25T04:06:35.711Z\nTotal:1 Juice";
    assert.deepStrictEqual(
      processTransaction(userArgs, requiredProperties),
      expected
    );
  });
  it("should give a string consists of employee beverages and total beverages for --query on emp when there are more than one beverages", function() {
    const read = function(data) {
      return data;
    };
    const isExists = function(data) {
      return true;
    };
    const write = function(data) {};
    const getDate = function() {
      return "2019-11-24T07:43:28.618Z";
    };
    const requiredProperties = {
      read: read,
      write: write,
      isExists: isExists,
      path:
        '[{"empId":11111,"beverage":"orange","qty":1,"date":"2019-11-23T04:06:35.711Z"},{"empId":11111,"beverage":"pineapple","qty":5,"date":"2019-11-23T04:06:35.800Z"}]',
      date: getDate
    };
    const userArgs = ["--query", "--empId", "11111"];
    const expected =
      "Employee ID,Beverage,Quantity,Date\n11111,orange,1,2019-11-23T04:06:35.711Z\n11111,pineapple,5,2019-11-23T04:06:35.800Z\nTotal:6 Juices";
    assert.deepStrictEqual(
      processTransaction(userArgs, requiredProperties),
      expected
    );
  });
  it("should give no data for --query when there is no employee", function() {
    const read = function(data) {
      return data;
    };
    const isExists = function(data) {
      return true;
    };
    const write = function(data) {};
    const getDate = function() {
      return "2019-11-24T07:43:28.618Z";
    };
    const requiredProperties = {
      read: read,
      write: write,
      isExists: isExists,
      path: "[]",
      date: getDate
    };
    const userArgs = ["--query", "--empId", "11111"];
    const expected = "Employee ID,Beverage,Quantity,Date\nTotal:0 Juices";
    assert.deepStrictEqual(
      processTransaction(userArgs, requiredProperties),
      expected
    );
  });
  it("should give usage when there command other than --save or --query", function() {
    const read = function(data) {
      return data;
    };
    const isExists = function(data) {
      return true;
    };
    const write = function(data) {};
    const getDate = function() {
      return "2019-11-24T07:43:28.618Z";
    };
    const requiredProperties = {
      read: read,
      write: write,
      isExists: isExists,
      path: "[]",
      date: getDate
    };
    const userArgs = ["get", "--empId", "11111"];
    const expected =
      "node beverage.js --save --beverage [beverage value]--empId [empId value] --qty [qty value]\n\t\t--query --empId[empId value]";
    assert.deepStrictEqual(
      processTransaction(userArgs, requiredProperties),
      expected
    );
  });
});
