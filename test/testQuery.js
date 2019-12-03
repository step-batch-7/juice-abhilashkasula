const chai = require("chai");
const assert = chai.assert;
const query = require("../src/query.js").query;

describe("query", function() {
  it("should return the beverages of emp and total beverages for emp is found", function() {
    let pairedOptions = { "--empId": 25323 };
    let data = [
      {
        empId: "25323",
        beverage: "orange",
        qty: "1",
        date: new Date("2019-11-25T18:27:52.164Z")
      }
    ];
    let expected = {
      beveragesData: data,
      transactionDetails: [
        "Employee ID,Beverage,Quantity,Date",
        [
          {
            empId: "25323",
            beverage: "orange",
            qty: "1",
            date: new Date("2019-11-25T18:27:52.164Z")
          }
        ],
        `\nTotal:1 Juice`
      ]
    };
    assert.deepStrictEqual(query(data, pairedOptions), expected);
  });
  it("should return false when employee's details and date is not available ", function() {
    let pairedOptions = { "--empId": 34543 };
    let data = [
      {
        empId: "25323",
        beverage: "orange",
        qty: "1",
        date: new Date("2019-11-25T18:27:52.164Z")
      },
      {
        empId: "25323",
        beverage: "orange",
        qty: "2",
        date: new Date("2019-11-25T18:27:52.700Z")
      }
    ];
    let expected = {
      beveragesData: data,
      transactionDetails: [
        `Employee ID,Beverage,Quantity,Date`,
        [],
        `\nTotal:0 Juices`
      ]
    };
    assert.deepStrictEqual(query(data, pairedOptions), expected);
  });
  it("should return the beverages on date and total beverages when date is given and not empId ", function() {
    let pairedOptions = { "--date": "2019-11-26T18:27:52.164Z" };
    let data = [
      {
        empId: "25323",
        beverage: "orange",
        qty: "1",
        date: new Date("2019-11-26T18:27:52.164Z")
      },
      {
        empId: "25555",
        beverage: "orange",
        qty: "2",
        date: new Date("2019-11-25T18:27:52.700Z")
      }
    ];
    let expected = {
      beveragesData: data,
      transactionDetails: [
        "Employee ID,Beverage,Quantity,Date",
        [
          {
            empId: "25323",
            beverage: "orange",
            qty: "1",
            date: new Date("2019-11-26T18:27:52.164Z")
          }
        ],
        "\nTotal:1 Juice"
      ]
    };
    assert.deepStrictEqual(query(data, pairedOptions), expected);
  });
  it("should return the beverages of emp and total beverages when empId is given and not date", function() {
    const pairedOptions = { "--empId": "25555" };
    const data = [
      {
        empId: "25323",
        beverage: "orange",
        qty: "1",
        date: new Date("2019-11-26T18:27:52.164Z")
      },
      {
        empId: "25555",
        beverage: "orange",
        qty: "2",
        date: new Date("2019-11-25T18:27:52.700Z")
      }
    ];
    const expected = {
      beveragesData: data,
      transactionDetails: [
        "Employee ID,Beverage,Quantity,Date",
        [
          {
            empId: "25555",
            beverage: "orange",
            qty: "2",
            date: new Date("2019-11-25T18:27:52.700Z")
          }
        ],
        "\nTotal:2 Juices"
      ]
    };
    assert.deepStrictEqual(query(data, pairedOptions), expected);
  });
  it("should return the beverages of emp on date when both empId and date is given", function() {
    const pairedOptions = { "--empId": "25555", "--date": "2019-11-27" };
    const data = [
      {
        empId: "25323",
        beverage: "orange",
        qty: "1",
        date: new Date("2019-11-26T18:27:52.164Z")
      },
      {
        empId: "25555",
        beverage: "orange",
        qty: "2",
        date: new Date("2019-11-25T18:27:52.700Z")
      },
      {
        empId: "25555",
        beverage: "pineapple",
        qty: "5",
        date: new Date("2019-11-27T18:27:52.700Z")
      }
    ];
    const expected = {
      beveragesData: data,
      transactionDetails: [
        "Employee ID,Beverage,Quantity,Date",
        [
          {
            empId: "25555",
            beverage: "pineapple",
            qty: "5",
            date: new Date("2019-11-27T18:27:52.700Z")
          }
        ],
        "\nTotal:5 Juices"
      ]
    };
    assert.deepStrictEqual(query(data, pairedOptions), expected);
  });
  it("should return no transactions when empId is found but date is not found in records", function() {
    const pairedOptions = { "--empId": "25323", "--date": "2010-11-26" };
    const data = [
      {
        empId: "25323",
        beverage: "orange",
        qty: "1",
        date: new Date("2019-11-25T18:27:52.164Z")
      }
    ];
    const expected = {
      beveragesData: data,
      transactionDetails: [
        "Employee ID,Beverage,Quantity,Date",
        [],
        "\nTotal:0 Juices"
      ]
    };
    assert.deepStrictEqual(query(data, pairedOptions), expected);
  });
  it("should return no transactions when empId is not found but date is found in records", function() {
    const pairedOptions = { "--empId": "25555", "--date": "2019-11-25" };
    const data = [
      {
        empId: "25323",
        beverage: "orange",
        qty: "1",
        date: new Date("2019-11-25T18:27:52.164Z")
      }
    ];
    const expected = {
      beveragesData: data,
      transactionDetails: [
        "Employee ID,Beverage,Quantity,Date",
        [],
        "\nTotal:0 Juices"
      ]
    };
    assert.deepStrictEqual(query(data, pairedOptions), expected);
  });
  it("should return beverages when beverage is given but not date and emp", function() {
    const pairedOptions = { "--beverage": "orange" };
    const data = [
      {
        empId: "25323",
        beverage: "orange",
        qty: "1",
        date: new Date("2019-11-25T18:27:52.164Z")
      }
    ];
    const expected = {
      beveragesData: data,
      transactionDetails: [
        "Employee ID,Beverage,Quantity,Date",
        [
          {
            empId: "25323",
            beverage: "orange",
            qty: "1",
            date: new Date("2019-11-25T18:27:52.164Z")
          }
        ],
        "\nTotal:1 Juice"
      ]
    };
    assert.deepStrictEqual(query(data, pairedOptions), expected);
  });
  it("should return beverages when all beverage, emp, date is given", function() {
    const pairedOptions = {
      "--beverage": "pineapple",
      "--empId": "25555",
      "--date": "2019-11-27"
    };
    const data = [
      {
        empId: "25555",
        beverage: "orange",
        qty: "1",
        date: new Date("2019-11-25T18:27:52.164Z")
      },
      {
        empId: "25555",
        beverage: "pineapple",
        qty: "1",
        date: new Date("2019-11-27T18:27:52.164Z")
      },
      {
        empId: "25555",
        beverage: "water melon",
        qty: "1",
        date: new Date("2019-11-25T18:27:52.164Z")
      }
    ];
    const expected = {
      beveragesData: data,
      transactionDetails: [
        "Employee ID,Beverage,Quantity,Date",
        [
          {
            empId: "25555",
            beverage: "pineapple",
            qty: "1",
            date: new Date("2019-11-27T18:27:52.164Z")
          }
        ],
        "\nTotal:1 Juice"
      ]
    };
    assert.deepStrictEqual(query(data, pairedOptions), expected);
  });
});
