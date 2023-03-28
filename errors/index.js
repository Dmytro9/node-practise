const fs = require("fs");

// Good
function readJSON(filename, callback) {
  fs.readFile(filename, "utf8", function (err, data) {
    var parsed;
    if (err)
      //propagate the error and exit the current function
      return callback(err);
    try {
      //parse the file contents
      parsed = JSON.parse(data);
    } catch (err) {
      //catch parsing errors
      return callback(err);
    }
    //no errors, propagate just the data
    callback(null, parsed);
  });
}

// (Bad) Uncaught exceptions (there is no way of catching an eventual exception coming from JSON.parse())
function readJSONThrows(filename, callback) {
  fs.readFile(filename, "utf8", function (err, data) {
    if (err) return callback(err);
    //no errors, propagate just the data
    callback(null, JSON.parse(data));
  });
}

// It's important to understand that an uncaught exception leaves the application in a state
// that is not guaranteed to be consistent, which can lead to unforeseeable problems.
// For example, there might still have incomplete I/O requests running, or closures might have become inconsistent.
// That's why it is always advised, especially in production, to exit anyway
// from the application after an uncaught exception is received.
process.on("uncaughtException", function (err) {
  console.error(
    "This will catch at last the " + "JSON parsing exception: " + err.message
  );
  //without this, the application would continue
  process.exit(1);
});
