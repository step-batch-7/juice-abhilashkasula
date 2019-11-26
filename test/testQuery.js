const assert = require("assert");
const fs = require("fs");
const query = require("../src/query.js").query;

const read = function(data) {
  return data;
};

const isExists = function(data) {
  return data;
};

describe("query", function() {
  it("should return the transaction details and beverages for already available records", function() {
    let pairedOptions = { "--empId": 25323 };
    let data =
      '{"25323":[{"empId":"25323","beverage":"orange","qty":"1","date":"2019-11-25T18:27:52.164Z"}]}';
    let expected = {
      beveragesData: {
        "25323": [
          {
            empId: "25323",
            beverage: "orange",
            qty: "1",
            date: "2019-11-25T18:27:52.164Z"
          }
        ]
      },
      transactionDetails: [
        "Employee ID,Beverage,Quantity,Date\n",
        [
          {
            empId: "25323",
            beverage: "orange",
            qty: "1",
            date: "2019-11-25T18:27:52.164Z"
          }
        ],
        "\nTotal:" + 1
      ]
    };
    assert.deepStrictEqual(
      query(read, data, isExists, pairedOptions),
      expected
    );
  });
  it("should return false when employee's details are not available ", function() {
    let pairedOptions = { "--empId": 34543 };
    let data =
      '{"25323":[{"empId":"25323","beverage":"orange","qty":"1","date":"2019-11-25T18:27:52.164Z"}]}';
    let expected = false;
    assert.deepStrictEqual(
      query(read, data, isExists, pairedOptions),
      expected
    );
  });
});
