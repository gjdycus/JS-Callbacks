Array.prototype.uniq = function(){
   var u = {}, a = [];
   for(var i = 0, l = this.length; i < l; ++i){
      if(u.hasOwnProperty(this[i])) {
         continue;
      }
      a.push(this[i]);
      u[this[i]] = 1;
   }
   return a;
};

Array.prototype.transpose = function() {
  var transposed = [];
  for (var i = 0; i < this.length; i++) {
    var newRow = [];
    for (var j = 0; j< this[i].length; j++) {
      newRow.push(this[j][i]);
    }
    transposed.push(newRow);
  }
  return transposed;
};

function Board() {
  this.grid = [[null, null, null],[null, null, null],[null, null, null]];
}

Board.prototype.won = function() {
  return !!this.winner() || false;
};

Board.prototype.checkRows = function () {
  for (var i = 0; i < this.grid.length; i++) {

    if (this.grid[i].uniq().length === 1) {
      if (this.grid[i][0]) {
        return this.grid[i][0];
      }
    }
  }
  return false;
};

Board.prototype.checkCols = function() {
  var grid = this.grid.transpose();

  for (var i = 0; i < grid.length; i++) {
    if (grid[i].uniq().length === 1) {
      if (grid[i][0]) {
        return grid[i][0];
      }
    }
  }
  return false;
};

Board.prototype.checkDiagonals = function() {
  if (this.grid[0][0] === this.grid[1][1] && this.grid[1][1]) {
    if (this.grid[1][1] === this.grid[2][2]) {
      return this.grid[1][1];
    }
  }

  if (this.grid[0][2] === this.grid[1][1] && this.grid[1][1]) {
    if (this.grid[1][1] === this.grid[2][0]) {
      return this.grid[1][1];
    }
  }

  return false;
};

Board.prototype.winner = function() {
  return this.checkRows() || this.checkCols() || this.checkDiagonals();
};

Board.prototype.empty = function(pos) {
  return !this.grid[pos[0]][pos[1]];
};

Board.prototype.placeMark = function(pos, mark) {
  if (this.empty(pos)) {
    this.grid[pos[0]][pos[1]] = mark;
    return true;
  }
  return false;
};

Board.prototype.render = function() {
  for (var i = 0; i < this.grid.length; i++) {
    console.log(this.grid[i].join(' '));
  }
};

module.exports = Board;
