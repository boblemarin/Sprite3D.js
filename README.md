# Sprite3D.js [v2]

A lightweight Javascript library for generating and manipulating CSS 3D transforms

## Overview

Sprite3D.js makes it easy to manipulate HTML elements through CSS 3D transforms using a ActionScript-like syntax and hierarchy, and a bunch of chainable accessor methods.

A Sprite3D object is a simple wrapper around a DOM element providing helper functions and properties. You can conveniently use CSS styling to determine the aspect of you element, and CSS transitions to animate your stuff.

In many cases, 3D transforms are GPU-accelerated, giving you an incredible performance boost.

## Usage

###1 - Settle
Begin by creating a Stage, which will be the root container of all your 3D stuff.

	var stage = Sprite3D.stage(); //create a blank div centered in the page

or

	var stage = Sprite3D.stage( document.getElementById("myContainer") );

###2 - Populate
Create and position your sprites. Every time you finish altering an element's position, you should call the update() method. It applies the new transform informations in the page.

The manual update process was chosen for performance reasons, as it does not fire un-needed redraws of the DOM tree.

	var sprite = new Sprite3D(); // you can provide an existing element if you don't want a blank div
		.className("kitten")
		.position( -200, 10, -300 )
		.rotation( 80, 0, 5 )
		.addEventListener( "mousedown", onMouseDown )
		.update()
	stage.addChild( sprite );
		
###3 - Interact
When listening for events, the handler function receives two arguments : the regular DOM event, and a reference to the target Sprite3D object.

	function onMouseDown( event, sprite ):void
	{
		sprite.z(1000).update();
		event.preventDefault();
	}

Don't forget to use CSS transitions to animate the changes, so you don't need to set an interval to animate everything :)

## Syntax update

	v1: Sprite3D.createCenteredContainer()
	v2: Sprite3D.stage()

	var s = new Sprite3D();
	var scale = 2;

	v1: s.setPosition( px, py, pz )
	v2: s.position( px, py, pz )

	v1: s.setScale( scale, scale, scale )
	v2: s.scale( scale ) // or s.scale( 2, 2, 1 ) if different values are needed

	v1: s.setRegistrationPoint( 23, 54, 0 )
	v2: s.origin( 23, 54 ) // third parameter can be omitted

	v1: s.setTransformOrigin( "50", "100" ) // you had to provide value as Strings
	v2: s.transformOrigin( 50, 100 ) // or s.transformOrigin( "50%", "100%" )


I dropped the "set" prefix everywhere I could

- `setClassName() > className()`
- `setRotation() > rotation()`
- `setX() > x()`
- `setY() > y()`
- `setID() > id()`

I changed to getter/setter functions "à la" jQuery. All getters are chainable.

- setter: `mySprite.x(200)`
- getter: `var p = mySprite.x()`
- chaining: `mySprite.x(200).rotationY(50).update()`



##Browser support (Feb.2012)

###Desktop browsers :

- Safari, Chrome are OK
- Firefox 10+ has support, quality is improving with time
- IE 10 has been announced with great support, needs testing
- Opera has people working on 3D transforms (no release date)

###Mobile browsers:

- iOS' Mobile Safari : OK
- BlackBerry Tablet OS : OK (major performance progress with the 2.0 beta)
- Android 4 : OK (Android 3 for tablets has a poor but existent support)

##Credits
* Created by : [boblemarin](http://github.com/boblemarin)
* Recent examples: http://sprite3d.minimal.be/
* Project's homepage : [minimal.be/lab/Sprite3D](http://minimal.be/lab/Sprite3D "Sprite3D.js, a javascript library for 3D positionning in WebKit")
* Feedback, suggestions, requests and more : [emeric@minimal.be](mailto:emeric@minimal.be)
