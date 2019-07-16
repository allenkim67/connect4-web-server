function changeColor(rowIndex,colIndex,color) {
  return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color',color);
}

function returnColor(rowIndex,colIndex) {
  return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color');
}

function checkBottom(colIndex) {
  var colorReport = returnColor(5,colIndex);
  for(var row = 5; row >= 0; row--){
    colorReport = returnColor(row,colIndex);
    if(colorReport === 'rgb(128, 128, 128)'){
      return row;
    }
  }
}

function colorMatchCheck(one,two,three,four){
  return (one===two && one===three && one===four && one !== 'rgb(128, 128, 128)' && one !== undefined);
}

function horizontalWinCheck() {
  for (var row = 0; row < 6; row++) {
    for (var col = 0; col < 4; col++) {
      if (colorMatchCheck(returnColor(row,col), returnColor(row,col+1) ,returnColor(row,col+2), returnColor(row,col+3))) {
        return true;
      }else {
        continue;
      }
    }
  }
}

function verticalWinCheck() {
  for(var col=0; col<7; col++){
    for(var row = 0; row < 3; row++){
      if(colorMatchCheck(returnColor(row,col), returnColor(row+1,col),returnColor(row+2,col),returnColor(row+3,col))){
        return true;
      } else {
        continue;
      }
    }
  }
}

function diagonalWinCheck() {
  for (var col = 0; col < 5; col++) {
    for (var row = 0; row < 7; row++) {
      if (colorMatchCheck(returnColor(row,col), returnColor(row+1,col+1) ,returnColor(row+2,col+2), returnColor(row+3,col+3))) {
        return true;
      } else if (colorMatchCheck(returnColor(row,col), returnColor(row-1,col+1) ,returnColor(row-2,col+2), returnColor(row-3,col+3))) {
        return true;
      }else {
        continue;
      }
    }
  }
}

function gameEnd(currentPlayer) {
    var result = currentPlayer == 1 ? "You win!" : "A.I wins!";
    $(".result").text(result + " Refresh to play again!");
    gameStop = true;
}

function currentColor() {
    return currentPlayer == 1 ? player1Color : player2Color;
}

var player1Color = 'rgb(86, 151, 255)';
var player2Color = 'rgb(237, 45, 73)';
var table = $('table tr');
var currentPlayer = 1;
var gameStop = false;

$('.board button').on('click',function() {
    if (!gameStop) {
        var col = $(this).closest("td").index();
        if (checkBottom(col) === undefined) return
        move(col)
    }
    if (!gameStop) {
        gameStop = true
        getAiMove(function(res) {
            gameStop = false;
            move(Number(res))
        })
    }
})

function move(col) {
    var bottomAvail = checkBottom(col);
    changeColor(bottomAvail,col,currentColor());
    if(horizontalWinCheck() || verticalWinCheck() || diagonalWinCheck()){
        gameEnd(currentPlayer);
    }

    currentPlayer = currentPlayer * -1;
}

function getAiMove(cb) {
    $.get("/connect4/api", function(res) {
        cb(res)
    })
}