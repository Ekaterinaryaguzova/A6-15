const numDivs = 36;
const maxHits = 10;

let firstHitTime = 0;
let misses = 0;
let hits = 0;
let i = 0;

function round() {
	if (hits != maxHits){	
	 $(".target").removeClass("target");
	// FIXME: надо бы убрать "target" прежде чем искать новый
	  let divSelector = randomDivId();
	  $(divSelector).addClass("target");
	  $(".target").text(hits + 1);
	  // TODO: помечать target текущим номером
	  if (hits === 1){
	  	firstHitTime = getTimestamp();
	  	console.log(firstHitTime);
	  }// FIXME: тут надо определять при первом клике firstHitTime
	}
 	else {
    endGame()
	}
    
}

function endGame() {
  $('#container').css("display", "none");
  $("#start").css("display", "none"); // FIXME: спрятать игровое поле сначала

  let totalPlayedMillis = getTimestamp() - firstHitTime;
  let totalPlayedSeconds = Number(totalPlayedMillis / 1000).toPrecision(3);
  $("#total-time-played").text(totalPlayedSeconds);
  $("#miss").text(misses);

  $("#win-message").removeClass("d-none");
}

function handleClick(event) {
  // FIXME: убирать текст со старых таргетов. Кажется есть .text?
   $(".miss").removeClass("miss");
  if ($(event.target).hasClass("target")) {
    hits = hits + 1;
    $(".target").text("");
    round();
 	}
    else {
    	($(event.target).addClass("miss"))
    	misses = misses + 1;
    	console.log(misses);
	  }
  // TODO: как-то отмечать если мы промахнулись? См CSS класс .miss
}

function init() {
  // TODO: заказчик просил отдельную кнопку, запускающую игру а не просто по загрузке
  round();
  $(".game-field").click(handleClick);
  $("#button-reload").click(function() {
    location.reload();
  });
}
$("#start").click(function() {
    init()
  });
