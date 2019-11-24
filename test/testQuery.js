const assert = require("assert");
const fs = require("fs");
const query = require("../src/query.js").query;

const read = function(path) {
  return JSON.parse(fs.readFileSync(path));
};

describe("query", function() {
  it("should return the beverage details for already available records", function() {
    let pairedOptions = { "--empId": 25323 };
    let expected = {
      "transaction details": [
        { beverage: "orange", qty: 1, date: "2019-11-24T10:42:14.196Z" }
      ]
    };
    assert.deepStrictEqual(
      query(read, "./src/beveragesData.json", pairedOptions),
      expected
    );
  });
  it("should return an empty details when employee's details are not available ", function() {
    let pairedOptions = { "--empId": 34543 };
    let expected = {
      "transaction details": [{}]
    };
    assert.deepStrictEqual(
      query(read, "./src/beveragesData.json", pairedOptions),
      expected
    );
  });
});
