const assert = require("assert");
const saveBeverageEntry = require("../src/saveBeveragesEntry.js")
  .saveBeverageEntry;
const fs = require("fs");

const getDate = function() {
  return "2019-11-24T07:43:28.618Z";
};

const isExists = function(data) {
  return data;
};

describe("saveBeverageEntry", function() {
  it("should add new beverage entry and return the added transaction and updated beverages when no data found in the file", function() {
    const read = function(data) {
      return data;
    };

    let data = "[]";
    let pairedOptions = {
      "--beverage": "orange",
      "--qty": 1,
      "--empId": 11111
    };

    let expected = {
      beveragesData: [
        {
          empId: 11111,
          beverage: "orange",
          qty: 1,
          date: "2019-11-24T07:43:28.618Z"
        }
      ],
      transactionDetails: [
        "Transaction Recorded:\nEmployee ID,Beverage,Quantity,Date\n",
        [
          {
            empId: 11111,
            beverage: "orange",
            qty: 1,
            date: "2019-11-24T07:43:28.618Z"
          }
        ]
      ]
    };
    assert.deepStrictEqual(
      saveBeverageEntry(read, data, isExists, pairedOptions, getDate),
      expected
    );
  });
  it("should add new beverage entry and return the added transaction and updated beverages when the entered emp is not found in the file", function() {
    const read = function(data) {
      return data;
    };

    let data =
      '[{"empId":11111,"beverage":"orange","qty":1,"date":"2019-11-23T04:06:35.711Z"}]';
    let pairedOptions = {
      "--beverage": "orange",
      "--qty": 1,
      "--empId": 25323
    };
    let expected = {
      beveragesData: [
        {
          empId: 11111,
          beverage: "orange",
          qty: 1,
          date: "2019-11-23T04:06:35.711Z"
        },
        {
          empId: 25323,
          beverage: "orange",
          qty: 1,
          date: "2019-11-24T07:43:28.618Z"
        }
      ],
      transactionDetails: [
        "Transaction Recorded:\nEmployee ID,Beverage,Quantity,Date\n",
        [
          {
            empId: 25323,
            beverage: "orange",
            qty: 1,
            date: "2019-11-24T07:43:28.618Z"
          }
        ]
      ]
    };
    assert.deepStrictEqual(
      saveBeverageEntry(read, data, isExists, pairedOptions, getDate),
      expected
    );
  });
  it("should add new beverage entry in the existing emp and return the added transaction and updated beverages when the entered emp is found in the file", function() {
    const read = function(data) {
      return data;
    };

    let data =
      '[{"empId":25323,"beverage":"orange","qty":1,"date":"2019-11-23T04:06:35.711Z"}]';
    let pairedOptions = {
      "--beverage": "orange",
      "--qty": 1,
      "--empId": 25323
    };
    let expected = {
      beveragesData: [
        {
          empId: 25323,
          beverage: "orange",
          qty: 1,
          date: "2019-11-23T04:06:35.711Z"
        },
        {
          empId: 25323,
          beverage: "orange",
          qty: 1,
          date: "2019-11-24T07:43:28.618Z"
        }
      ],
      transactionDetails: [
        "Transaction Recorded:\nEmployee ID,Beverage,Quantity,Date\n",
        [
          {
            empId: 25323,
            beverage: "orange",
            qty: 1,
            date: "2019-11-24T07:43:28.618Z"
          }
        ]
      ]
    };

    assert.deepStrictEqual(
      saveBeverageEntry(read, data, isExists, pairedOptions, getDate),
      expected
    );
  });
  it("should create file and add new beverage entry and return the added transaction and updated beverages when there is no sfile", function() {
    const read = function(path) {
      return JSON.parse(fs.readFileSync(path));
    };

    let path = "./file";
    let pairedOptions = {
      "--beverage": "orange",
      "--qty": 1,
      "--empId": 25323
    };
    let expected = {
      beveragesData: [
        {
          empId: 25323,
          beverage: "orange",
          qty: 1,
          date: "2019-11-24T07:43:28.618Z"
        }
      ],
      transactionDetails: [
        "Transaction Recorded:\nEmployee ID,Beverage,Quantity,Date\n",
        [
          {
            empId: 25323,
            beverage: "orange",
            qty: 1,
            date: "2019-11-24T07:43:28.618Z"
          }
        ]
      ]
    };
    assert.deepStrictEqual(
      saveBeverageEntry(read, path, fs.existsSync, pairedOptions, getDate),
      expected
    );
  });
});
