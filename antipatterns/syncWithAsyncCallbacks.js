const fs = require("fs");
let cache = {};

function inconsistentRead(filename, callback) {
  if (cache[filename]) {
    //invoked synchronously
    callback(cache[filename]);
  } else {
    //asynchronous function
    fs.readFile(filename, "utf8", function (err, data) {
      cache[filename] = data;
      callback(data);
    });
  }
}
