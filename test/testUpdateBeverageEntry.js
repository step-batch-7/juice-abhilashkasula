const chai = require("chai");
const assert = chai.assert;
const updateBeverageEntry = require("../src/updateBeveragesEntry.js")
  .updateBeverageEntry;
const fs = require("fs");

const getDate = function() {
  return "2019-11-24T07:43:28.618Z";
};

describe("updateBeverageEntry", function() {
  it("should add new beverage entry and return the added transaction and updated beverages when no data found in the file", function() {
    let data = [];
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
        "Transaction Recorded:\nEmployee ID,Beverage,Quantity,Date",
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
      updateBeverageEntry(data, pairedOptions, getDate),
      expected
    );
  });
  it("should add new beverage entry and return the added transaction and updated beverages when the entered emp is not found in the file", function() {
    let data = [
      {
        empId: 11111,
        beverage: "orange",
        qty: 1,
        date: "2019-11-23T04:06:35.711Z"
      }
    ];
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
        "Transaction Recorded:\nEmployee ID,Beverage,Quantity,Date",
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
      updateBeverageEntry(data, pairedOptions, getDate),
      expected
    );
  });
  it("should add new beverage entry in the existing emp and return the added transaction and updated beverages when the entered emp is found in the file", function() {
    let data = [
      {
        empId: 25323,
        beverage: "orange",
        qty: 1,
        date: "2019-11-23T04:06:35.711Z"
      }
    ];
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
        "Transaction Recorded:\nEmployee ID,Beverage,Quantity,Date",
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
      updateBeverageEntry(data, pairedOptions, getDate),
      expected
    );
  });
});
