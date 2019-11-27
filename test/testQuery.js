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
  it("should return the beverages of emp and total beverages for emp is found", function() {
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
  it("should return false when employee's details and date is not available ", function() {
    let pairedOptions = { "--empId": 34543 };
    let data =
      '{"25323":[{"empId":"25323","beverage":"orange","qty":"1","date":"2019-11-25T18:27:52.164Z"}],"25555":[{"empId":"25555","beverage":"orange","qty":"2","date":"2019-11-25T18:27:52.700Z"}]}';
    let expected = {
      beveragesData: JSON.parse(
        '{"25323":[{"empId":"25323","beverage":"orange","qty":"1","date":"2019-11-25T18:27:52.164Z"}],"25555":[{"empId":"25555","beverage":"orange","qty":"2","date":"2019-11-25T18:27:52.700Z"}]}'
      ),
      transactionDetails: [
        "Employee ID,Beverage,Quantity,Date\n",
        false,
        "\nTotal:" + 0
      ]
    };
    assert.deepStrictEqual(
      query(read, data, isExists, pairedOptions),
      expected
    );
  });
  it("should return the beverages on date and total beverages when date is given and not empId ", function() {
    let pairedOptions = { "--date": "2019-11-26T18:27:52.164Z" };
    let data =
      '{"25323":[{"empId":"25323","beverage":"orange","qty":"1","date":"2019-11-26T18:27:52.164Z"}],"25555":[{"empId":"25555","beverage":"orange","qty":"2","date":"2019-11-25T18:27:52.700Z"}]}';
    let expected = {
      beveragesData: JSON.parse(
        '{"25323":[{"empId":"25323","beverage":"orange","qty":"1","date":"2019-11-26T18:27:52.164Z"}],"25555":[{"empId":"25555","beverage":"orange","qty":"2","date":"2019-11-25T18:27:52.700Z"}]}'
      ),
      transactionDetails: [
        "Employee ID,Beverage,Quantity,Date\n",
        [
          {
            empId: "25323",
            beverage: "orange",
            qty: "1",
            date: "2019-11-26T18:27:52.164Z"
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
  it("should return the beverages of emp and total beverages when empId is given and not date", function() {
    const pairedOptions = { "--empId": "25555" };
    const data =
      '{"25323":[{"empId":"25323","beverage":"orange","qty":"1","date":"2019-11-26T18:27:52.164Z"}],"25555":[{"empId":"25555","beverage":"orange","qty":"2","date":"2019-11-25T18:27:52.700Z"}]}';
    const expected = {
      beveragesData: JSON.parse(
        '{"25323":[{"empId":"25323","beverage":"orange","qty":"1","date":"2019-11-26T18:27:52.164Z"}],"25555":[{"empId":"25555","beverage":"orange","qty":"2","date":"2019-11-25T18:27:52.700Z"}]}'
      ),
      transactionDetails: [
        "Employee ID,Beverage,Quantity,Date\n",
        [
          {
            empId: "25555",
            beverage: "orange",
            qty: "2",
            date: "2019-11-25T18:27:52.700Z"
          }
        ],
        "\nTotal:" + 2
      ]
    };
    assert.deepStrictEqual(
      query(read, data, isExists, pairedOptions),
      expected
    );
  });
  it("should return the beverages of emp on date when both empId and date is given", function() {
    const pairedOptions = { "--empId": "25555", "--date": "2019-11-27" };
    const data =
      '{"25323":[{"empId":"25323","beverage":"orange","qty":"1","date":"2019-11-26T18:27:52.164Z"}],"25555":[{"empId":"25555","beverage":"orange","qty":"2","date":"2019-11-25T18:27:52.700Z"},{"empId":"25555","beverage":"pineapple","qty":"5","date":"2019-11-27T18:27:52.700Z"}]}';
    const expected = {
      beveragesData: JSON.parse(
        '{"25323":[{"empId":"25323","beverage":"orange","qty":"1","date":"2019-11-26T18:27:52.164Z"}],"25555":[{"empId":"25555","beverage":"orange","qty":"2","date":"2019-11-25T18:27:52.700Z"},{"empId":"25555","beverage":"pineapple","qty":"5","date":"2019-11-27T18:27:52.700Z"}]}'
      ),
      transactionDetails: [
        "Employee ID,Beverage,Quantity,Date\n",
        [
          {
            empId: "25555",
            beverage: "pineapple",
            qty: "5",
            date: "2019-11-27T18:27:52.700Z"
          }
        ],
        "\nTotal:" + 5
      ]
    };
    assert.deepStrictEqual(
      query(read, data, isExists, pairedOptions),
      expected
    );
  });
  it("should return false when empId is found but date is not found in records", function() {
    const pairedOptions = { "--empId": "25323", "--date": "2010-11-26" };
    const data =
      '{"25323":[{"empId":"25323","beverage":"orange","qty":"1","date":"2019-11-25T18:27:52.164Z"}]}';
    const expected = {
      beveragesData: JSON.parse(
        '{"25323":[{"empId":"25323","beverage":"orange","qty":"1","date":"2019-11-25T18:27:52.164Z"}]}'
      ),
      transactionDetails: [
        "Employee ID,Beverage,Quantity,Date\n",
        false,
        "\nTotal:" + 0
      ]
    };
    assert.deepStrictEqual(
      query(read, data, isExists, pairedOptions),
      expected
    );
  });
  it("should return false when empId is not found but date is found in records", function() {
    const pairedOptions = { "--empId": "25555", "--date": "2019-11-25" };
    const data =
      '{"25323":[{"empId":"25323","beverage":"orange","qty":"1","date":"2019-11-25T18:27:52.164Z"}]}';
    const expected = {
      beveragesData: JSON.parse(
        '{"25323":[{"empId":"25323","beverage":"orange","qty":"1","date":"2019-11-25T18:27:52.164Z"}]}'
      ),
      transactionDetails: [
        "Employee ID,Beverage,Quantity,Date\n",
        false,
        "\nTotal:" + 0
      ]
    };
    assert.deepStrictEqual(
      query(read, data, isExists, pairedOptions),
      expected
    );
  });
});
