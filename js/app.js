const $player1 = $('#player1');
const $player2 = $('#player2');
const $startButton = $('#start .button');
const $restartButton = $('#finish .button');

let $randomNumber;
	function random(){
		$randomNumber = Math.floor( Math.random() * 9);
			return $randomNumber;
		}

// show start screen and hide the board
$('.screen-start').show();
$('.board').hide();
$('#finish').hide();
//when click the start button hide the start screen and show the board.
$($startButton).click(() => {
	$('.screen-start').hide();
	$('.board').show();
	// first turn is fot the player1
	$($player1).addClass('active');
	// store and show the name.
	const $name = $('#name').val();
	if ($name === '') {
		$('.name-p1').html('Player 1');
	} else {
		$('.name-p1').html($name);
	}
});
//behavior on mouse over
$('.boxes').on('mouseover', function(event) {
	if ($player1.hasClass('active')) {
		event.target.style.backgroundImage = "url('img/o.svg')";
		if ($(event.target).hasClass('box-filled-1') || $(event.target).hasClass('box-filled-2')) {
			event.target.style.backgroundImage = "";
		}
	} else {
		event.target.style.backgroundImage = "url('img/x.svg')";
		if ($(event.target).hasClass('box-filled-1') || $(event.target).hasClass('box-filled-2')) {
			event.target.style.backgroundImage = "";
		}
	}
});
//behavior on mouseout
$('.boxes').on('mouseout', function(event) {
	if ($player1.hasClass('active')) {
		event.target.style.backgroundImage = "";
	} else {
		event.target.style.backgroundImage = "";
	}
});
//behavior on clicking squares, empty and ocuppied.
$('.boxes').on('click', function(event) {
	if ($player1.hasClass('active') && !$(event.target).hasClass('box-filled-1') && !$(event.target).hasClass('box-filled-2')) {
		$(event.target).addClass('box-filled-1');
		$player1.toggleClass('active');
		$player2.toggleClass('active');

			console.log(random());
}

// ----------------DOUBT-------------------------------------

	if($('.boxes li').eq($randomNumber).hasClass('box-filled-1') || $('.boxes li').eq($randomNumber).hasClass('box-filled-2')){

			console.log(random());

} else {
					// $('.boxes li').eq($randomNumber).addClass('');

			$('.boxes li').eq($randomNumber).addClass('box-filled-2')
				$player2.toggleClass('active');
				$player1.toggleClass('active');
}


// 	if ($(event.target).hasClass('box-filled-1') || $(event.target).hasClass('box-filled-2')) {
// 		$(event.target).addClass('');
// }




	//combinations to win
	const arrayWin = [
		[0, 1, 2], //arrayWin[0]
		[0, 3, 6], //arrayWin[1]   arrayWin[1][2] //6.
		[1, 4, 7],
		[2, 5, 8],
		[3, 4, 5],
		[6, 7, 8],
		[2, 4, 6],
		[0, 4, 8],
	];
	//behavior for winner 1.
	function checkP1(i) {
		const $proofP1 = $('.boxes li').eq(arrayWin[i][0]).hasClass('box-filled-1') &&
                     $('.boxes li').eq(arrayWin[i][1]).hasClass('box-filled-1') &&
                     $('.boxes li').eq(arrayWin[i][2]).hasClass('box-filled-1');
		return $proofP1;
	}
	for (let i = 0; i < arrayWin.length; i += 1) {
		checkP1(i);
		if (checkP1(i) === true) {
			$('#finish').addClass('screen-win-one').show();
			$('.board').hide();
			$('.message').html('Winner!');
			//it's a tie.
		} else if ($('.box-filled-1').length === 5) {
			$('#finish').addClass('screen-win-tie').show();
			$('.board').hide();
			$('.message').html("It's a tie!");
		}
	}
	//behavior for winner 2.
	function checkP2(i) {
		const $proofP2 = $('.boxes li').eq(arrayWin[i][0]).hasClass('box-filled-2') &&
                     $('.boxes li').eq(arrayWin[i][1]).hasClass('box-filled-2') &&
                     $('.boxes li').eq(arrayWin[i][2]).hasClass('box-filled-2');
		return $proofP2;
	}
	for (let i = 0; i < arrayWin.length; i += 1) {
		checkP2(i);
		if (checkP2(i) === true) {
			$('#finish').addClass('screen-win-two').show();
			$('.board').hide();
			$('.message').html('Winner!');
		}
	}
});
//the game is over, let's start again.
// so let's remove all the classes created.
$($restartButton).click(() => {
	$('#finish').hide();
	$('.board').show();
	// first turn is fot the player1
	$($player1).addClass('active');
	$($player2).removeClass('active');
	$('.box').each(function() {
		$(this).removeClass('box-filled-1');
		$(this).removeClass('box-filled-2');
	})
});
