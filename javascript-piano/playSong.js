function resetSongStates() {
	isSongPaused = false;
	isSongStopped = false;
	shouldReplaySong = false;
	isUserPlaying = false;
	currentNoteIndex = 0;
	isDemoPlaying = false;
}

var actions = {
	stopSong: function () {
		isSongStopped = false;
		if (shouldReplaySong) {
			shouldReplaySong = false;
			playSong();
		}
		return;
	}
}

function showPause() {
	$('#pause').show();
	$('#play').hide();
}

function showPlay() {
	$('#pause').hide();
	$('#play').show();
}

function playSong() {
	resetSongStates();
	isDemoPlaying = true;
	showPause();
	var	callback = function(k) {
		if (k < data.length) {
			if (isSongStopped) {
				actions.stopSong();
			}
			else if (!isSongPaused) {
				var e = jQuery.Event('keydown');
				e.keyCode = data[k].key;
				$(window).trigger(e);
				$('.letter').text(keyMapping[e.keyCode].toUpperCase()).show();
				window.setTimeout(function() {$('.letter').text('').hide();}, 200);
				setTimeout(function() { callback(k+1) }, data[k].delta);
			} else {
				setTimeout(function() { callback(k) }, 10);
			}
		} else {
			showPlay();
		}
	};
	setTimeout(callback(0), 0);
}

var data = [
	{key:71, delta: 500},
	{key:71, delta: 500},
	{key:72, delta: 500},
	{key:71, delta: 500},
	{key:75, delta: 500},
	{key:74, delta: 1000},

	{key:71, delta: 500},
	{key:71, delta: 500},
	{key:72, delta: 500},
	{key:71, delta: 500},
	{key:76, delta: 500},
	{key:75, delta: 1000},

	{key:71, delta: 500},
	{key:71, delta: 500},
	{key:13, delta: 500},
	{key:186, delta: 500},
	{key:75, delta: 500},
	{key:74, delta: 500},
	{key:72, delta: 1000},

	{key:222, delta: 500},
	{key:222, delta: 500},
	{key:186, delta: 500},
	{key:75, delta: 500},
	{key:76, delta: 500},
	{key:75, delta: 500},
]

function showMenu() {
	stopSong();
	$('#playMenu').addClass('hidden');
	$('#menu').show();
}

function hideMenu() {
	$('#menu').hide();
}

function startLesson() {
	$('#playMenu').removeClass('hidden');
	$('canvas').hide();
	hideMenu();
}

function pauseSong() {
	isSongPaused = isSongPaused ? false : true;
	if (isSongPaused) {
		$('#pause').text('Resume');
	} else {
		$('#pause').text('Pause');
	}
}

function stopSong() {
	isSongStopped = true;
	showPlay();
}

function replaySong() {
	stopSong();
	shouldReplaySong = true;
	playSong();
}

//Let the user play the song
function userPlayListener() {
	//wait for user input
	$(window).keydown(event, function() {
		if (window.isUserPlaying) {
			if (window.keysAvailable.indexOf(event.keyCode + '') !== -1) {
				if(event.keyCode !== data[currentNoteIndex].key) {
					showWrong(3);
					currentNoteIndex = 0;
				} else {
					currentNoteIndex++;
				}
			}
		}
	});
}

function showWrong(timesLeft) {
	if (timesLeft) {
		$('.wrong').show();
		window.setTimeout(function() {
			$('.wrong').hide();
			window.setTimeout(function() {
				showWrong(timesLeft - 1);
			}, 200);
		}, 200);
	}
}

function userPlay() {
	stopSong();
	isUserPlaying = true;
	currentNoteIndex = 0;
}

function init() {
	userPlayListener();
	$('.wrong, .letter').hide();
	goToStep(1);
	showPlay();
}

function goToStep(n) {
	$('.step').hide();
	$('.step' + n).show();
}

$(function() {
	init();
});