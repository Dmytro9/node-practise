// The observer pattern is already built into the core and is available through the EventEmitter class.
var EventEmitter = require("events").EventEmitter;
var fs = require("fs");

function findPattern(files, regex) {
  var emitter = new EventEmitter();
  files.forEach(function (file) {
    fs.readFile(file, "utf8", function (err, content) {
      if (err) return emitter.emit("error", err);
      emitter.emit("fileread", file);
      var match = null;
      if ((match = content.match(regex)))
        match.forEach(function (elem) {
          emitter.emit("found", file, elem);
        });
    });
  });
  return emitter;
}

// Usage
findPattern(["fileA.txt", "fileB.json"], /hello \w+/g)
  .on("fileread", function (file) {
    console.log(file + " was read");
  })
  .on("found", function (file, match) {
    console.log('Matched "' + match + '" in file ' + file);
  })
  .on("error", function (err) {
    console.log("Error emitted: " + err.message);
  });
