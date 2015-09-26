function Clock () {
}

Clock.TICK = 5000;

Clock.prototype.printTime = function () {
  // Format the time in HH:MM:SS
  console.log(padding(this.currentTime.getHours()) + ":" + padding(this.currentTime.getMinutes()) + ":" + padding(this.currentTime.getSeconds()));
};

Clock.prototype.run = function () {
  this.currentTime = new Date();
  this.printTime();
  var clock = this;
  setInterval(function () { clock._tick(); }, Clock.TICK);
};

Clock.prototype._tick = function () {
  this.currentTime.setSeconds(this.currentTime.getSeconds() + Clock.TICK/1000);
  this.printTime();
};

function padding(n) {
  if (String(n).length < 2) {
    return "0" + n;
  } else {
    return String(n);
  }
}

// var clock = new Clock();
// clock.run();

var readline = require('readline');

var reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var addNumbers = function(sum, numsLeft, completionCallback) {
  if (numsLeft > 0) {
    reader.question("Enter number: ", function(inputNum) {
      var num = parseInt(inputNum);

      sum += num;
      console.log("Current Sum: " + sum);

      addNumbers(sum, numsLeft - 1, completionCallback);
    });
  } else {
    reader.close();
    completionCallback(sum);
  }
};

// addNumbers(0, 3, function (sum) {
//   console.log("Total Sum: " + sum);
// });
