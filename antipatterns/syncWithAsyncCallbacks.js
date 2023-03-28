const fs = require("fs");
let cache = {};

// Bad
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

// Good
function consistentReadSync(filename) {
  if (cache[filename]) {
    return cache[filename];
  } else {
    cache[filename] = fs.readFileSync(filename, "utf8");
    return cache[filename];
  }
}

// We can see that the entire function was also converted to a direct style.
// There is no reason for the function to have a continuation-passing style if it is synchronous.
// In fact, we can state that it is always a good practice to implement a synchronous API using a direct style;
// this will eliminate any confusion around its nature and
// will also be more efficient from a performance perspective.

// Deferred execution (to make it purely asynchronous)
// process.nextTick(), which defers the execution of a function until the next pass of the event loop
// The callback will then be invoked as soon as the event loop runs again.

function consistentReadAsync(filename, callback) {
  if (cache[filename]) {
    process.nextTick(function () {
      callback(cache[filename]);
    });
  } else {
    //asynchronous function
    fs.readFile(filename, "utf8", function (err, data) {
      cache[filename] = data;
      callback(data);
    });
  }
}
