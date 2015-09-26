var Board = require('./board.js');

var readline = require('readline');

var reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function Game() {
  this.board = new Board();
  this.mark = "X";
}

Game.prototype.promptMove = function(callback) {
  this.board.render();

  reader.question("Choose a spot to place a mark. \n", function(pos) {
    callback(pos.split(",").map(function (el) { return parseInt(el); }));
  });
};

Game.prototype.play = function (completionCallback) {
  var that = this;

  this.promptMove(function (pos) {
    if (!that.board.placeMark(pos, that.mark)) {
      console.log("Invalid move.");
      that.play(completionCallback);
    } else {
      that.mark = ((that.mark === "X") ? "O" : "X");

      if (!that.board.won()) {
        that.play(completionCallback);
      } else {
        that.mark = ((that.mark === "X") ? "O" : "X");
        completionCallback();
      }
    }
  });
};

var game = new Game();
game.play(function () {
  game.board.render();
  console.log("\n" + game.mark + " wins!");
  reader.close();
});
