const chai = require("chai");
const assert = chai.assert;
const pairUserEnteredValues = require("../src/utils.js").pairUserEnteredValues;
const loadTransactions = require("../src/utils.js").loadTransactions;
const getAsMessage = require("../src/utils.js").getAsMessage;
const areArgsValid = require("../src/utils.js").areArgsValid;
const getBeveragesOnEmpIdDateAndBeverages = require("../src/utils.js")
  .getBeveragesOnEmpIdDateAndBeverages;
const getTotal = require("../src/utils.js").getTotal;

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

describe("loadTransactions", function() {
  it("should read the given string as object", function() {
    const read = function(path) {
      return path;
    };
    const isExists = function(path) {
      return true;
    };
    const data =
      '[{"empId":"25323","beverage":"orange","qty":"1","date":"2019-11-25T18:27:52.164Z"}]';
    const expected = [
      {
        empId: "25323",
        beverage: "orange",
        qty: "1",
        date: new Date("2019-11-25T18:27:52.164Z")
      }
    ];
    assert.deepStrictEqual(loadTransactions(read, data, isExists), expected);
  });
});

describe("getAsMessage", function() {
  it("should return a string for transaction details for save command", function() {
    const transactionDetails = [
      "Transaction Recorded:\nEmployee ID,Beverage,Quantity,date",
      [
        {
          empId: "25323",
          beverage: "orange",
          qty: 1,
          date: new Date("2019-11-25T18:27:52.164Z")
        }
      ]
    ];
    const expected =
      "Transaction Recorded:\nEmployee ID,Beverage,Quantity,date\n25323,orange,1,2019-11-25T18:27:52.164Z";
    assert.equal(getAsMessage(transactionDetails), expected);
  });
  it("should return a string for transaction details for query command", function() {
    const transactionDetails = [
      "Employee ID,Beverage,Quantity,date",
      [
        {
          empId: "25323",
          beverage: "orange",
          qty: 1,
          date: new Date("2019-11-25T18:27:52.164Z")
        }
      ],
      "\nTotal:1 Juices"
    ];
    const expected =
      "Employee ID,Beverage,Quantity,date\n25323,orange,1,2019-11-25T18:27:52.164Z\nTotal:1 Juices";
    assert.equal(getAsMessage(transactionDetails), expected);
  });
});

describe("areArgsValid", function() {
  it("should determine true for valid values given in any order for save", function() {
    const transaction = "save";
    let pairedUserEnteredValues = {
      "--empId": "11111",
      "--beverage": "orange",
      "--qty": "1"
    };
    assert.ok(areArgsValid(transaction, pairedUserEnteredValues));
    pairedUserEnteredValues = {
      "--qty": "1",
      "--beverage": "orange",
      "--empId": "11111"
    };
    assert.ok(areArgsValid(transaction, pairedUserEnteredValues));
  });
  it("should determine true for valid values for query", function() {
    const transaction = "query";
    let pairedUserEnteredValues = { "--empId": "11111" };
    assert.ok(areArgsValid(transaction, pairedUserEnteredValues));
  });
  it("should determine false for any value missing for save", function() {
    const transaction = "save";
    let pairedUserEnteredValues = {
      "--empId": "11111",
      "--beverage": "orange"
    };
    assert.ok(!areArgsValid(transaction, pairedUserEnteredValues));
  });
  it("should determine false for any value missing for query", function() {
    const transaction = "query";
    let pairedUserEnteredValues = {};
    assert.ok(!areArgsValid(transaction, pairedUserEnteredValues));
  });
  it("should determine false for command other than save", function() {
    const transaction = undefined;
    pairedUserEnteredValues = {
      "--qty": "1",
      "--beverage": "orange",
      "--empId": "11111"
    };
    assert.ok(!areArgsValid(transaction, pairedUserEnteredValues));
  });
  it("should determine false for values other than empId,qty and beverage for save", () => {
    const transaction = "save";
    const pairedUserEnteredValues = {
      "--empId": "11111",
      "--beverage": "Orange",
      "--qty": "1",
      "--hello": "hello"
    };
    assert.ok(!areArgsValid(transaction, pairedUserEnteredValues));
  });
  it("should determine false for values other than empId,date and beverage for query", () => {
    const transaction = "query";
    const pairedUserEnteredValues = {
      "--empId": "11111",
      "--beverage": "Orange",
      "--date": "2019-12-02",
      "--hello": "hello"
    };
    assert.ok(!areArgsValid(transaction, pairedUserEnteredValues));
  });
});

describe("loadBeveragesOnEmpIdDateAndBeverage", function() {
  it("should get beverages of emp when only empId is given", function() {
    const beveragesData = [
      {
        empId: "25323",
        beverage: "orange",
        qty: "1",
        date: new Date("2019-11-25T18:27:52.164Z")
      }
    ];
    const userEnteredId = "25323";
    const userEnteredDate = undefined;
    const expected = [
      {
        empId: "25323",
        beverage: "orange",
        qty: "1",
        date: new Date("2019-11-25T18:27:52.164Z")
      }
    ];
    assert.deepStrictEqual(
      getBeveragesOnEmpIdDateAndBeverages(
        beveragesData,
        userEnteredId,
        userEnteredDate
      ),
      expected
    );
  });
  it("should get beverages on date when only date is given", function() {
    const beveragesData = [
      {
        empId: "25323",
        beverage: "orange",
        qty: "1",
        date: new Date("2019-11-25T18:27:52.164Z")
      }
    ];
    const userEnteredId = undefined;
    const userEnteredDate = "2019-11-25";
    const expected = [
      {
        empId: "25323",
        beverage: "orange",
        qty: "1",
        date: new Date("2019-11-25T18:27:52.164Z")
      }
    ];
    assert.deepStrictEqual(
      getBeveragesOnEmpIdDateAndBeverages(
        beveragesData,
        userEnteredId,
        userEnteredDate
      ),
      expected
    );
  });
  it("should get beverages of emp on date when emp and date is given", function() {
    const beveragesData = [
      {
        empId: "25323",
        beverage: "orange",
        qty: "1",
        date: new Date("2019-11-25T18:27:52.164Z")
      },
      {
        empId: "25555",
        beverage: "orange",
        qty: "1",
        date: new Date("2019-11-25T18:27:52.164Z")
      }
    ];
    const userEnteredId = "25555";
    const userEnteredDate = "2019-11-25";
    const expected = [
      {
        empId: "25555",
        beverage: "orange",
        qty: "1",
        date: new Date("2019-11-25T18:27:52.164Z")
      }
    ];
    assert.deepStrictEqual(
      getBeveragesOnEmpIdDateAndBeverages(
        beveragesData,
        userEnteredId,
        userEnteredDate
      ),
      expected
    );
  });
  it("should get beverages of emps on given beverage", function() {
    const beveragesData = [
      {
        empId: "25323",
        beverage: "orange",
        qty: "1",
        date: new Date("2019-11-25T18:27:52.164Z")
      },
      {
        empId: "25555",
        beverage: "pineapple",
        qty: "1",
        date: new Date("2019-11-25T18:27:52.164Z")
      }
    ];
    const userEnteredId = undefined;
    const userEnteredDate = undefined;
    const userEnteredBeverage = "pineapple";
    const expected = [
      {
        empId: "25555",
        beverage: "pineapple",
        qty: "1",
        date: new Date("2019-11-25T18:27:52.164Z")
      }
    ];
    assert.deepStrictEqual(
      getBeveragesOnEmpIdDateAndBeverages(
        beveragesData,
        userEnteredId,
        userEnteredDate,
        userEnteredBeverage
      ),
      expected
    );
  });
  it("should give beverages of given beverage, emp and date", function() {
    const beveragesData = [
      {
        empId: "25323",
        beverage: "orange",
        qty: "1",
        date: new Date("2019-11-25T18:27:52.164Z")
      },
      {
        empId: "25323",
        beverage: "pineapple",
        qty: "1",
        date: new Date("2019-11-27T18:27:52.164Z")
      },
      {
        empId: "25555",
        beverage: "pineapple",
        qty: "1",
        date: new Date("2019-11-25T18:27:52.164Z")
      }
    ];
    const userEnteredId = "25323";
    const userEnteredDate = "2019-11-27";
    const userEnteredBeverage = "pineapple";
    const expected = [
      {
        empId: "25323",
        beverage: "pineapple",
        qty: "1",
        date: new Date("2019-11-27T18:27:52.164Z")
      }
    ];
    assert.deepStrictEqual(
      getBeveragesOnEmpIdDateAndBeverages(
        beveragesData,
        userEnteredId,
        userEnteredDate,
        userEnteredBeverage
      ),
      expected
    );
  });
  it("shoud give an empty object when both emp and date is not given", function() {
    const beveragesData = [
      {
        empId: "25323",
        beverage: "orange",
        qty: "1",
        date: new Date("2019-11-25T18:27:52.164Z")
      }
    ];
    assert(getBeveragesOnEmpIdDateAndBeverages(beveragesData), {});
  });
});

describe("getTotal", function() {
  it("should get Total of the queried transactions.", function() {
    const beveragesData = JSON.parse(
      '[{"empId":"25323","beverage":"orange","qty":"2","date":"2019-11-25T18:27:52.164Z"},{"empId":"25555","beverage":"orange","qty":"5","date":"2019-11-25T18:27:52.164Z"}]'
    );
    assert.deepStrictEqual(getTotal(beveragesData), 7);
  });
});
