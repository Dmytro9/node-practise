var fs = require("fs");
var path = require("path");

function* fruitGenerator() {
  yield "apple";
  yield "orange";
  return "watermelon";
}
var newFruitGenerator = fruitGenerator();
console.log(newFruitGenerator.next());
console.log(newFruitGenerator.next());
console.log(newFruitGenerator.next());
//[1]
//[2]
//[3]

function* iteratorGenerator(arr) {
  for (var i = 0; i < arr.length; i++) {
    yield arr[i];
  }
}
var iterator = iteratorGenerator(["apple", "orange", "watermelon"]);
var currentItem = iterator.next();
while (!currentItem.done) {
  console.log(currentItem.value);
  currentItem = iterator.next();
}

// passing value to generator in next(value)
function* twoWayGenerator() {
  var what = yield null;
  console.log("Hello " + what);
}
var twoWay = twoWayGenerator();
twoWay.next();
twoWay.next("world");

// Usage with async operations
asyncFlow(function* (callback) {
  var fileName = path.basename(__filename);
  var myself = yield fs.readFile(fileName, "utf8", callback);
  yield fs.writeFile("clone_of_" + fileName, myself, callback);
  console.log("Clone created");
});
