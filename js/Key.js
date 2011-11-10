var Key = function () {
var	_keysHeld = {};
function onKeyDown(event) {
	_keysHeld[event.keyCode] = true;
}
function onKeyUp(event) {
	delete _keysHeld[event.keyCode];
}
window.addEventListener( 'keydown', onKeyDown, true );
window.addEventListener( 'keyup', onKeyUp, true );

return {
	BACKSPACE : 8,
	TAB : 9,
	RETURN : 13,
	SHIFT : 16,
	CTRL : 17,
	ALT : 18,
	CAPSLOCK : 20,
	ESCAPE : 27,
	SPACE : 32,
	LEFT : 37,
	UP : 38,
	RIGHT : 39,
	DOWN : 40,
	COMMAND : 91,
	isDown : function(keyCode) {
		return _keysHeld[keyCode] ? _keysHeld[keyCode] : false;
	}
}
}();