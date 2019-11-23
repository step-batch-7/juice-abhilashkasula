const assert = require("assert");
const query = require("../src/query.js").query;
const fs = require("fs");
const beveragesData = JSON.parse(
  fs.readFileSync("./src/beveragesData.json", "utf8")
);

describe("query", function() {
  it("should return the same beverages data and the data to be printed to console.", function() {
    expected = [
      {
        beverage: "orange",
        qty: 1,
        date: "2019-11-23T04:06:35.711Z"
      },
      {
        beverage: "pineapple",
        qty: 2,
        date: "2019-11-23T04:06:09.236Z"
      }
    ];
    assert.deepStrictEqual(query(beveragesData, 11111), [
      beveragesData,
      expected
    ]);
  });
});
