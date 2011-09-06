var dragTarget = {
		x: 0,
		y: 0,
		rotation: 0,
		element: null,
		scale: 1,
		width: 212,
		height: 283
	},
	dragTargets,
	debug,
	touchAngle,
	touchDistance,
	cornerAngle,
	cornerDistance,
	numTouches = 0,
	imgX = 0,
	imgY = 0,
	touches = [];


function init()
{
	document.addEventListener( 'touchmove', onTouchMove, false );
	document.addEventListener( 'touchend', onTouchEnd, false );
	
	var elements = document.getElementsByClassName( "draggable" );
	var numElements = elements.length;
	var dragTargets = [];
	
	for( i = 0; i < numElements; i++ )
	{
		var e = elements[i];
		e.addEventListener( 'touchstart', onTouchStart, false );
		dragTargets.push( {
			x: 0,
			y: 0,
			rotation: 0,
			element: e,
			scale: 1,
			width: e.width,
			height: e.height,
			fingers: []
		} );
	}
	

	//dragTarget.element = document.getElementById( "image1" );
//	dragTarget.element.addEventListener( "touchstart", onTouchStart );
	debug = document.getElementById( "debug" );
}

function onTouchStart( evt ) 
{
	if ( numTouches < 2 )
	{
		dragTarget.element = evt.target;

		var ta = event.changedTouches;
		n = ta.length;
		while( n-- ) 
		{
			var touch = {
				x: ta[n].pageX,
				y: ta[n].pageY,
				id: ta[n].identifier
			};
			numTouches = touches.push( touch );

			if ( numTouches == 2 ) {
				var t1 = touches[0];
				var t2 = touches[1];

				touchAngle = Math.atan2( t2.y - t1.y, t2.x - t1.x );
				touchDistance = distance( t2.x - t1.x, t2.y - t1.y );

				dragTarget.angle = Math.atan2( dragTarget.y - t1.y, dragTarget.x - t1.x );
				dragTarget.distance = distance( dragTarget.x - t1.x, dragTarget.y - t1.y );
				dragTarget.startRotation = dragTarget.rotation;
				dragTarget.startScale = dragTarget.scale;
				break;
			}
		}
	}
}

function onTouchMove(event) {
	switch( numTouches )
	{
		case 1: 
			var ta = event.changedTouches;
			n = ta.length;
			while( n-- ) 
				if ( ta[n].identifier == touches[0].id ) {
					var dx = ta[n].pageX - touches[0].x;
					var dy = ta[n].pageY - touches[0].y;
					touches[0].x += dx;
					touches[0].y += dy;
					dragTarget.x += dx;
					dragTarget.y += dy;
					dragTarget.element.style.webkitTransform = "translate3D( "+dragTarget.x+"px, "+dragTarget.y+"px, 0px) rotateZ( "+dragTarget.rotation+"deg )";
				}

			break;
			
		case 2:
			// update touch positions
			var ta = event.changedTouches;
			n = ta.length;
			while( n-- ) {
				for( var i = 0; i < numTouches; i++ )
				{
					if ( ta[n].identifier == touches[i].id )
					{
						touches[i].x = ta[n].pageX;
						touches[i].y = ta[n].pageY;
					}
				}
			}
			
			// compute new position
			var t1 = touches[0];
			var t2 = touches[1];
			
			var modAngle = Math.atan2( t2.y - t1.y, t2.x - t1.x ) - touchAngle,
				modDistance = distance( t2.x - t1.x, t2.y - t1.y ) / touchDistance,
				newCornerAngle, newCornerDistance, sin, cos;

			newCornerAngle = dragTarget.angle + modAngle;
			newCornerDistance = dragTarget.distance * modDistance;
			sin = Math.sin( newCornerAngle );
			cos = Math.cos( newCornerAngle );
			dragTarget.x = t1.x + cos * newCornerDistance;
			dragTarget.y = t1.y + sin * newCornerDistance;
			dragTarget.scale = dragTarget.startScale * modDistance;
			dragTarget.rotation = dragTarget.startRotation + ( modAngle / Math.PI * 180 );
		
			// apply
			dragTarget.element.style.width = Math.round( dragTarget.width * dragTarget.scale ) + "px";
			dragTarget.element.style.height = Math.round( dragTarget.height * dragTarget.scale ) + "px";
			dragTarget.element.style.webkitTransform = "translate3D( "+dragTarget.x+"px, "+dragTarget.y+"px, 0px) rotateZ( "+dragTarget.rotation+"deg )";
			break;
	}
	event.preventDefault();
	return true;
} 

function onTouchEnd(event) { 
	
	switch( numTouches )
	{
		case 1:
			var ta = event.changedTouches;
			n = ta.length;
			while( n-- ) 
				if ( ta[n].identifier == touches[0].id ) {
					touches.pop();
					numTouches = 0;
				}
				
						//alert( "target position : " + dragTarget.element.style.webkitTransform );
			break;
			
		case 2:
			var ta = event.changedTouches;
			n = ta.length;
			while( n-- ) {
				var i = numTouches;
				while( i-- )
				{
					if ( ta[n].identifier == touches[i].id )
					{
						touches.splice( i, 1 );
						numTouches -= 1;
						break;
					}
				}
			}
			break;
	}
	

	event.preventDefault();
	return true;
}

function distance( dx, dy )
{
	return Math.sqrt( dx * dx + dy * dy );
}

function msg( t )
{
	debug.innerHTML = t;
}
