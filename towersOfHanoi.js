var readline = require('readline');

var reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

Array.prototype.last = function() {
  return this[this.length-1];
};

Array.prototype.empty = function() {
  return this.length === 0;
};

var HanoiGame = function() {
  this.stacks = [[3, 2, 1], [], []];

  this.isWon = function() {
    return (this.stacks[0].empty() && (this.stacks[1].length === 3 || this.stacks[2].length === 3));
  };

  this.isValidMove = function(startTowerIdx, endTowerIdx) {
    if (this.stacks[startTowerIdx].empty()) {
      return false;
    } else if (this.stacks[endTowerIdx].empty()) {
      return true;
    } else {
      return this.stacks[startTowerIdx].last() < this.stacks[endTowerIdx].last();
    }
  };

  this.move = function(startTowerIdx, endTowerIdx) {
    if (this.isValidMove(startTowerIdx, endTowerIdx)) {
      this.stacks[endTowerIdx].push(this.stacks[startTowerIdx].pop());
      return true;
    }
    return false;
  };

  this.print = function() {
    for (var i = this.stacks.length-1; i >= 0; i--) {
      console.log(this.stacks[0][i] + " " + this.stacks[1][i] + " " + this.stacks[2][i]);
    }
  };

  this.promptMove = function(callback) {
    this.print();

    reader.question("Which stack do you want to move from?", function(start) {
      reader.question("Where do you want to place this piece?", function(end) {
        callback(start, end);
      });
    });
  };

  this.run = function(completionCallback) {
    var that = this;

    this.promptMove(function (start, end) {
      if (!(that.move(start, end))) {
        console.log("Invalid move.");
      } else {
        if (!(that.isWon())) {
          that.run(completionCallback);
        } else {
          completionCallback();
        }
      }
    });
  };
};

var game = new HanoiGame();
game.run(function() {
  console.log("You win!");
  reader.close();
});
