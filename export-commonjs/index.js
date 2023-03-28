// export single function (expose single entry module enrty point (function API))
module.exports = function () {
  console.log("test");
};

// will not work
exports = function () {
  console.log("test");
};

// namespace export
exports.hello = function () {
  console.log("hello");
};

// same as
module.exports.hello = function () {
  console.log("hello");
};

// export constructor
function Logger(name) {
  this.count = 0;
  this.name = name;
}
Logger.prototype.log = function (message) {
  this.count++;
  console.log("[" + this.name + "] " + message);
};

// single export
module.exports = Logger;

// namespace export
module.exports.Logger = Logger;

// aka Singelton - when we export already instance and other modules will use same instance
module.exports = new Logger("default");
