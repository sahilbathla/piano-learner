function resetSongStates() {
	isSongPaused = false;
	isSongStopped = false;
	shouldReplaySong = false;
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

function playSong() {
	resetSongStates();
	var	callback = function(k) {
		if (k < data.length) {
			if (isSongStopped) {
				actions.stopSong();
			}
			else if (!isSongPaused) {
				$('[data-key="' + data[k].key + '"]').mousedown();
				setTimeout(function() { callback(k+1) }, data[k].delta);
			} else {
				setTimeout(function() { callback(k) }, 10);
			}
		}
	};
	setTimeout(callback(0), 0);
}

var data = [
	{key:-5, delta: 500},
	{key:-5, delta: 500},
	{key:-3, delta: 500},
	{key:-5, delta: 500},
	{key:0, delta: 500},
	{key:-1, delta: 1000},

	{key:-5, delta: 500},
	{key:-5, delta: 500},
	{key:-3, delta: 500},
	{key:-5, delta: 500},
	{key:2, delta: 500},
	{key:0, delta: 1000},

	{key:-5, delta: 500},
	{key:-5, delta: 500},
	{key:7, delta: 500},
	{key:4, delta: 500},
	{key:0, delta: 500},
	{key:-1, delta: 500},
	{key:-3, delta: 1000},

	{key:5, delta: 500},
	{key:5, delta: 500},
	{key:4, delta: 500},
	{key:0, delta: 500},
	{key:2, delta: 500},
	{key:0, delta: 500},
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
	playSong();
}

function pauseSong() {
	isSongPaused = isSongPaused ? false : true;
}

function stopSong() {
	isSongStopped = true;
}

function replaySong() {
	stopSong();
	shouldReplaySong = true;
}