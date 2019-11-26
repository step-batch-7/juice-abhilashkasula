const assert = require("assert");
const pairUserEnteredValues = require("../src/utils.js").pairUserEnteredValues;
const getBeveragesData = require("../src/utils.js").getBeveragesData;
const getAsMessage = require("../src/utils.js").getAsMessage;
const areArgsNotValid = require("../src/utils.js").areArgsNotValid;

describe("pairUserEnteredValues", function() {
  it("should return a paired object for one pair", function() {
    const userEnteredValues = ["--empId", "11111"];
    const expected = { "--empId": "11111" };
    assert.deepStrictEqual(pairUserEnteredValues(userEnteredValues), expected);
  });
  it("should return a paired object for more than one pair", function() {
    const userEnteredValues = [
      "--beverage",
      "orange",
      "--empId",
      "11111",
      "--qty",
      "1"
    ];
    const expected = {
      "--beverage": "orange",
      "--empId": "11111",
      "--qty": "1"
    };
    assert.deepStrictEqual(pairUserEnteredValues(userEnteredValues), expected);
  });
});

describe("getBeveragesData", function() {
  it("should read the given string as object", function() {
    const read = function(path) {
      return path;
    };
    const isExists = function(path) {
      return true;
    };
    const data =
      '{"25323":[{"empId":"25323","beverage":"orange","qty":"1","date":"2019-11-25T18:27:52.164Z"}]}';
    const expected = {
      "25323": [
        {
          empId: "25323",
          beverage: "orange",
          qty: "1",
          date: "2019-11-25T18:27:52.164Z"
        }
      ]
    };
    assert.deepStrictEqual(getBeveragesData(read, data, isExists), expected);
  });
});

describe("getAsMessage", function() {
  it("should return a string for transaction details for save command", function() {
    const transactionDetails = [
      "Transaction Recorded:\nEmployee ID,Beverage,Quantity,date\n",
      [
        {
          empId: "25323",
          beverage: "orange",
          qty: 1,
          date: "2019-11-25T18:27:52.164Z"
        }
      ]
    ];
    const expected =
      "Transaction Recorded:\nEmployee ID,Beverage,Quantity,date\n25323,orange,1,2019-11-25T18:27:52.164Z";
    assert.equal(getAsMessage(transactionDetails), expected);
  });
  it("should return a string for transaction details for query command", function() {
    const transactionDetails = [
      "Employee ID,Beverage,Quantity,date\n",
      [
        {
          empId: "25323",
          beverage: "orange",
          qty: 1,
          date: "2019-11-25T18:27:52.164Z"
        }
      ],
      "\nTotal:1"
    ];
    const expected =
      "Employee ID,Beverage,Quantity,date\n25323,orange,1,2019-11-25T18:27:52.164Z\nTotal:1";
    assert.equal(getAsMessage(transactionDetails), expected);
  });
});

describe("areArgsNotValid", function() {
  it("should determine false for valid values given in any order for save", function() {
    const transaction = "save";
    let pairedUserEnteredValues = {
      "--empId": "11111",
      "--beverage": "orange",
      "--qty": "1"
    };
    assert.ok(!areArgsNotValid(transaction, pairedUserEnteredValues));
    pairedUserEnteredValues = {
      "--qty": "1",
      "--beverage": "orange",
      "--empId": "11111"
    };
    assert.ok(!areArgsNotValid(transaction, pairedUserEnteredValues));
  });
  it("should determine false for valid values for query", function() {
    const transaction = "query";
    let pairedUserEnteredValues = { "--empId": "11111" };
    assert.ok(!areArgsNotValid(transaction, pairedUserEnteredValues));
  });
  it("should determine true for any value missing for save", function() {
    const transaction = "save";
    let pairedUserEnteredValues = {
      "--empId": "11111",
      "--beverage": "orange"
    };
    assert.ok(areArgsNotValid(transaction, pairedUserEnteredValues));
  });
  it("should determine true for any value missing for query", function() {
    const transaction = "query";
    let pairedUserEnteredValues = {};
    assert.ok(areArgsNotValid(transaction, pairedUserEnteredValues));
  });
  it("should determine true for command other than save", function() {
    const transaction = undefined;
    pairedUserEnteredValues = {
      "--qty": "1",
      "--beverage": "orange",
      "--empId": "11111"
    };
    assert.ok(areArgsNotValid(transaction, pairedUserEnteredValues));
  });
});
