const assert = require("assert");
const processTransaction = require("../src/processTransaction")
  .processTransaction;

describe("processTransaction", function() {
  it("should return a string with transaction recorded for --save option for no emp found", function() {
    const read = function(data) {
      return data;
    };
    const write = function(data) {};
    const getDate = function() {
      return "2019-11-24T07:43:28.618Z";
    };
    const data = "{}";
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
      processTransaction(read, data, userArgs, write, getDate),
      expected
    );
  });
  it("should return a string with transaction recorded for --save option for emp found", function() {
    const read = function(data) {
      return data;
    };
    const write = function(data) {};
    const getDate = function() {
      return "2019-11-24T07:43:28.618Z";
    };
    const data =
      '{"11111":[{"empId":11111,"beverage":"orange","qty":1,"date":"2019-11-23T04:06:35.711Z"}]}';
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
      processTransaction(read, data, userArgs, write, getDate),
      expected
    );
  });
  it("should return a string consists of employee beverages and total beverages for --query", function() {
    const read = function(data) {
      return data;
    };
    const write = function(data) {};
    const getDate = function() {
      return "2019-11-24T07:43:28.618Z";
    };
    const data =
      '{"11111":[{"empId":11111,"beverage":"orange","qty":1,"date":"2019-11-23T04:06:35.711Z"}]}';
    const userArgs = ["--query", "--empId", "11111"];
    const expected =
      "Employee ID,Beverage,Quantity,Date\n11111,orange,1,2019-11-23T04:06:35.711Z\nTotal:1";
    assert.deepStrictEqual(
      processTransaction(read, data, userArgs, write, getDate),
      expected
    );
  });
  it("should return a string consists of employee beverages and total beverages for --query when there are more than one beverages", function() {
    const read = function(data) {
      return data;
    };
    const write = function(data) {};
    const getDate = function() {
      return "2019-11-24T07:43:28.618Z";
    };
    const data =
      '{"11111":[{"empId":11111,"beverage":"orange","qty":1,"date":"2019-11-23T04:06:35.711Z"},{"empId":11111,"beverage":"pineapple","qty":5,"date":"2019-11-23T04:06:35.800Z"}]}';
    const userArgs = ["--query", "--empId", "11111"];
    const expected =
      "Employee ID,Beverage,Quantity,Date\n11111,orange,1,2019-11-23T04:06:35.711Z\n11111,pineapple,5,2019-11-23T04:06:35.800Z\nTotal:6";
    assert.deepStrictEqual(
      processTransaction(read, data, userArgs, write, getDate),
      expected
    );
  });
  it("should return no data found for --query when there is no employee", function() {
    const read = function(data) {
      return data;
    };
    const write = function(data) {};
    const getDate = function() {
      return "2019-11-24T07:43:28.618Z";
    };
    const data = "{}";
    const userArgs = ["--query", "--empId", "11111"];
    const expected = "no data found";
    assert.deepStrictEqual(
      processTransaction(read, data, userArgs, write, getDate),
      expected
    );
  });
});
