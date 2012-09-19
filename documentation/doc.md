##Core concepts

Playing with DOM elements and CSS 3D transforms is easy and fun.



##Static methods

###isSupported()

Returns true or false, according to the current browser's support for CSS 3D transforms

	if ( !Sprite3D.isSupported() ) {
		alert("Your browser does not support CSS 3D transforms");
		return;
	}
	
###Sprite3D.stage( [HTMLElement] )

Creates a root container for your 3D content.

	// usage #1
	var stage = Sprite3D.stage();

If used without argument, creates an empty DIV that will be absolutely positionned in the center of the page (lef/top : 50%)
	
	// usage #2
	var stage = Sprite3D.stage( document.getElementById("3DContainer") );

If provided an HTML element, transforms it into a valid container for 3D content without modifying its existing CSS properties except _perspective_, _transform_, _transformStyle_. _position_ will also be set to "relative" if "static".

###Sprite3D.create( [value] )

Creates a Sprite3D element.

	// usage #1
	var s = Sprite3D.create();

Creates an empty DIV ready for 3D manipulation.

	// usage #2
	var s = Sprite3D.create("stringValue");
	var s = Sprite3D.create("#myID");

Creates an empty DIV ready for 3D manipulation and set its ID to the provided argument value.

	// usage #3
	var s = Sprite3D.create(".myCSSClass");

Creates an empty DIV ready for 3D manipulation and set its className to the provided argument value.

	// usage #3
	var s = Sprite3D.create( document.getElementById("3dElement") );

Adds Sprite3D's methods and properties to the provided HTMLElement.

###Sprite3D.box( width, height, depth [, idOrClassName] )

Creates a cubic box object, made of a container and 6 faces, with the specified dimensions. If you provided and ID or className, it will be applied to the container. All faces will have a className according to their position in the box (front, back, left, right, top, bottom), so you can use CSS styles to control the box's appearance (_#mybox.front_).
	
	// "anonymous" box
	var b = Sprite3D.box( 100, 100, 20 );
	// box with ID
	var b = Sprite3D.box( 100, 100, 20, "#boxID" );
	var b = Sprite3D.box( 100, 100, 20, "boxID" );
	// box with className
	var b = Sprite3D.box( 100, 100, 20, ".boxClass" );

###Sprite3D.prefix( cssPropertyName )

Adds the current browser's vendor prefix to the provided string argument. This might be useful if you play with animations and transitions.


##Instance methods

All of the following methods require a call to the *update()* method to take effect. (why ?)

###x()
###y()
###z()

Getter/setter methods for controlling individual axis positions.

	// set the x position to 200
	sprite.x(200);
	// get the y position of the sprite
	var p = sprite.y();

###position( px, py [, pz] )

Sets the position of the sprite on all 3 axis.

	sprite.position( 20, 0, 30 );
	// you can omit the third argument if you only use 2D positionning
	sprite.position( 400, 320 );

###move( px, py [, pz] )

Add the provided values to the sprite's current position.

	sprite.move( 20, 0, 30 );
	// you can omit the third argument if you only use 2D positionning
	sprite.move( 5, 0 );

###rotationX()
###rotationY()
###rotationZ()

Getter/setter methods for controlling individual axis rotations.

	// rotate the sprite around the x axis
	sprite.rotationX(200);
	// get the y rotation of the sprite
	var p = sprite.rotationY();

###rotation( rx, ry, rz )

Sets the rotation of the sprite around all 3 axis.

	sprite.rotation( 20, 0, 30 );

###rotate( rx, ry, rz )

Add the provided values to the sprite's current rotation.

	sprite.rotate( 20, 0, 5 );

###scaleX()
###scaleY()
###scaleZ()

Getter/setter methods for controlling individual axis scaling. 

	// scale the sprite on the x axis
	sprite.scaleX(2);
	// get the y scaling of the sprite
	var p = sprite.scaleY();

###scale( sx [, sy [, sz ]] )

Sets the scale of the sprite around all 3 axis.

	// scale the sprite uniformly around the 3 axis
	sprite.scale( 2 );
	// scale the sprite around the x and y axis (z axis remains unchanged)
	sprite.scale( 2, 2 );
	// scale the sprite around the three axis
	sprite.scale( 2, 2, 1 );


###origin( ox, oy [, oz] )

Set the origin (or registration point) of the sprite. By default, the position of a Sprite3D is its top-left corner's one. Use this method to...

###todo: transition( string )

Shorthand for the (browser-prefixed) transition CSS property


