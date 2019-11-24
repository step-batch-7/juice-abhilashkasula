const assert = require("assert");
const saveBeverageEntry = require("../src/saveBeveragesEntry.js")
  .saveBeverageEntry;
const fs = require("fs");

const write = function(path) {
  return path;
};

const getDate = function(date) {
  return date;
};

describe("saveBeverageEntry", function() {
  it("should add new beverage entry and return the added transaction when no data found in the file", function() {
    const read = function(path) {
      return path;
    };

    let path = {};
    let pairedOptions = {
      "--beverage": "orange",
      "--qty": 1,
      "--empId": 11111
    };
    let expected = {
      "transaction status": "Transaction Recorded",
      "transaction details": {
        beverage: "orange",
        qty: 1,
        date: "2019-11-24T07:43:28.618Z"
      }
    };
    assert.deepStrictEqual(
      saveBeverageEntry(
        read,
        write,
        path,
        pairedOptions,
        getDate,
        "2019-11-24T07:43:28.618Z"
      ),
      expected
    );
  });
  it("should add new beverage entry and return the added transaction when the entered emp is not found in the file", function() {
    const read = function(path) {
      return path;
    };

    let path = {
      11111: [{ beverage: "orange", qty: 1, date: "2019-11-23T04:06:35.711Z" }]
    };
    let pairedOptions = {
      "--beverage": "orange",
      "--qty": 1,
      "--empId": 25323
    };
    let expected = {
      "transaction status": "Transaction Recorded",
      "transaction details": {
        beverage: "orange",
        qty: 1,
        date: "2019-11-24T07:43:28.618Z"
      }
    };
    assert.deepStrictEqual(
      saveBeverageEntry(
        read,
        write,
        path,
        pairedOptions,
        getDate,
        "2019-11-24T07:43:28.618Z"
      ),
      expected
    );
  });
  it("should add new beverage entry in the existing emp and return the added transaction when the entered emp is found in the file", function() {
    const read = function(path) {
      return path;
    };

    let path = {
      11111: [{ beverage: "orange", qty: 1, date: "2019-11-23T04:06:35.711Z" }]
    };
    let pairedOptions = {
      "--beverage": "orange",
      "--qty": 1,
      "--empId": 25323
    };
    let expected = {
      "transaction status": "Transaction Recorded",
      "transaction details": {
        beverage: "orange",
        qty: 1,
        date: "2019-11-24T07:43:28.618Z"
      }
    };
    assert.deepStrictEqual(
      saveBeverageEntry(
        read,
        write,
        path,
        pairedOptions,
        getDate,
        "2019-11-24T07:43:28.618Z"
      ),
      expected
    );
  });
  it("should create file and add new beverage entry and return the added transaction when there is no sfile", function() {
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
      "transaction status": "Transaction Recorded",
      "transaction details": {
        beverage: "orange",
        qty: 1,
        date: "2019-11-24T07:43:28.618Z"
      }
    };
    assert.deepStrictEqual(
      saveBeverageEntry(
        read,
        write,
        path,
        pairedOptions,
        getDate,
        "2019-11-24T07:43:28.618Z"
      ),
      expected
    );
  });
});
