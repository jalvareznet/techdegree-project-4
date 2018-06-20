const $player1 = $('#player1');
const $player2 = $('#player2');
const $startButton = $('#start .button');
const $restartButton = $('#finish .button');
const $boxes = $('.boxes li');
// show start screen and hide the board
$('.screen-start').show();
$('.board').hide();
$('#finish').hide();
//when click the start button hide the start screen and show the board.
$($startButton).click(() => {
	const $name = $('#name').val();
	$('.screen-start').hide();
	$('.board').show();
	// first turn is fot the player1
	$($player1).addClass('active');
	// store and show the name.
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
		$(event.target).addClass('taken');
		$player1.toggleClass('active');
		$player2.toggleClass('active');
// function to create a random number.
		function randomNumber(){
			return Math.floor( Math.random() * 9);
		}
// while loop to create a random number when it match in an occupied square.
		let random = randomNumber();
		while ( ($boxes.eq(random).hasClass('box-filled-1') || $boxes.eq(random).hasClass('box-filled-2')) && $('.taken').length <= 7 ){
				random = randomNumber();
	}
	if($('.taken').length <= 7) {
		$boxes.eq(random).addClass('box-filled-2');
		$boxes.eq(random).addClass('taken');
		$player2.toggleClass('active');
		$player1.toggleClass('active');
	}
}
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
	let p1;
	let p2;
	// conditional and behavior for the tie.
	if ($('.box-filled-1').length === 5 && !p1 === true && !p2 === true ){
			 $('#finish').addClass('screen-win-tie').show();
			 $('.board').hide();
			 $('.message').html("It's a tie!");
			 $('#finish').removeClass('screen-win-one');
			 $('#finish').removeClass('screen-win-two');
		}
	//behavior for winner 1.
	function checkP1(i) {
		const $proofP1 = $boxes.eq(arrayWin[i][0]).hasClass('box-filled-1') &&
                     $boxes.eq(arrayWin[i][1]).hasClass('box-filled-1') &&
                     $boxes.eq(arrayWin[i][2]).hasClass('box-filled-1');
		return $proofP1;
	}
	for (let i = 0; i < arrayWin.length; i += 1) {
		p1 = checkP1(i);
		if (p1 === true && !p2 === true) {
			$('#finish').addClass('screen-win-one').show();
			$('.board').hide();
			const $name2 = $('.name-p1').html();
			$('.message').html(`${$name2} is the winner!`);
			$('#finish').removeClass('screen-win-two');
			$('#finish').removeClass('screen-win-tie');
		}
	}
	//behavior for winner 2.
	function checkP2(i) {
		const $proofP2 = $boxes.eq(arrayWin[i][0]).hasClass('box-filled-2') &&
                     $boxes.eq(arrayWin[i][1]).hasClass('box-filled-2') &&
                     $boxes.eq(arrayWin[i][2]).hasClass('box-filled-2');
		return $proofP2;
	}
	for (let i = 0; i < arrayWin.length; i += 1) {
		p2 = checkP2(i);
		if (p2 === true && !p1 === true) {
			$('#finish').addClass('screen-win-two').show();
			$('.board').hide();
			$('.message').html('Computer wins');
			$('#finish').removeClass('screen-win-one');
			$('#finish').removeClass('screen-win-tie');
		}
	}
});
//the game is finish, let's start again.
// so let's remove all the classes created.
$($restartButton).click(() => {
	$('#finish').hide();
	$('#finish').removeClass('screen-win-one');
	$('#finish').removeClass('screen-win-two');
	$('#finish').removeClass('screen-win-tie');
	$('.board').show();
	// first turn is fot the player1
	$($player1).addClass('active');
	$($player2).removeClass('active');
	//remove the squares and other helps.
	$('.box').each(function() {
		$(this).removeClass('box-filled-1');
		$(this).removeClass('box-filled-2');
		$(this).removeClass('taken');
	})
});
