/**
 * Provides requestAnimationFrame in a cross browser way.
 * http://paulirish.com/2011/requestanimationframe-for-smart-animating/
 */



if ( !window.requestAnimationFrame ) {
/*
	if ( window.mozRequestAnimationFrame ) alert("has mozRequestAnimationFrame");
	if ( window.webkitRequestAnimationFrame ) alert("has webkitRequestAnimationFrame");
	if ( window.oRequestAnimationFrame ) alert("has oRequestAnimationFrame");
	if ( window.msRequestAnimationFrame ) alert("has msRequestAnimationFrame");
*/
	window.requestAnimationFrame = ( function() {

		return window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame || // comment out if FF4 is slow (it caps framerate at ~30fps: https://bugzilla.mozilla.org/show_bug.cgi?id=630127)
		window.oRequestAnimationFrame ||
		window.msRequestAnimationFrame ||
		function( /* function FrameRequestCallback */ callback, /* DOMElement Element */ element ) {

			window.setTimeout( callback, 1000 / 60 );

		};

	} )();

}
/*
else
{
	alert("has requestAnimationFrame");
}
*/