# Sprite3D.js

A library for generating and manipulating CSS 3D transforms

## Overview

Sprite3D.js makes it easy to manipulate HTML elements in 3D space through the use of CSS 3D transforms. It allows to control the position, rotation and scale of the element using simple, chainable methods. A Sprite3D object _IS_ an HTMLElement, so you can freely use native browser events and properties, and control their appearance through CSS directives.

When creating a Sprite3D element, you can specify an ID or class, or even provide an existing HTML element that will be 'enhanced'. Most of its added methods can then be used as getter or setter depending of the number of arguments.

-----------------------

# Reference

**Please refer to the comments in the source code for more detailed instructions on how to use these methods.**

## Static methods

- `Sprite3D.isSupported()` - check support for CSS 3D transforms
- `Sprite3D.stage()` - create a root node to use as a main container
- `Sprite3D.create()` - creates a new Sprite3D div element
- `Sprite3D.box()` - creates a box (i.e. a cube)

## Instance methods

### Position
- `x()` - get/set the x position
- `y()` - get/set the y position
- `z()` - get/set the z position
- `position()` - set the x, y and z position
- `move()` - adds the provided values to the current position

### Rotation
- `rotationX()` - get/set the rotation around the X axis
- `rotationY()` - get/set the rotation around the Y axis
- `rotationZ()` - get/set the rotation around the Z axis
- `rotation()` - set the rotation around all axis
- `rotate()` - adds the provided values to the current rotation

### Scale
- `scaleX()` - get/set the scale around the X axis
- `scaleY()` - get/set the scale around the Y axis
- `scaleZ()` - get/set the scale around the Z axis
- `scale()` - set the scale for all axis.

### Hierarchy

- `appendChild()` and `removeChild()` - just kidding, these are the native methods of the HTML elements (and remember, the Sprite3D object _IS_ the HTML element)

### Helper functions
-  `origin()` - specifies the registration point of the element (default is top-left corner)
-  `transformOrigin()` - specifies the pivot around which the element is rotated and scaled (default is center)
- `transformString()` - lets you decide the order of the transformations
- `perspective()` - sets the amount of perspective (mainly useful for the stage, default is 800px)
- `css()` - chainable shorthand for setting a CSS value in the style property
- `addClass()` and `removeClass()` - chainable wrappers for the native classList.add() and classList.remove()
- `html()` - chainable shorthand for the innerHTML property of the element
- `size()` - chainable shorthand for setting both style.width and style.height
- `bind()` and `unbind()` - chainable shorthand for addEventListener and removeEventListener methods, allows to pass multiple events and callbacks
- `tileSize()` and `tilePosition()` - basic spritesheet support
- `set()` - generic chainable setter/getter

-----------------------

# Browser support

## Desktop browsers

**Chrome**, **Firefox** and **Safari** have full support for 3D transforms.

**IE 10** doesn't support nested transforms (transformed elements inside transformed elements). It means that you can't create a 3D hierarchy, making it very difficult to achieve a (even slightly) complex scene, camera movements or even a simple cube. Previous versions of IE have no support at all for transforms.

Current **Opera** versions don't support 3D transforms, but their switch to the WebKit/Kling rendering engine should bring them on par with other modern browsers.

## Mobile browsers

The **iOS** browsers have very good support for 3D transformations, as well as **BlackBerry**'s tablets and recent phones.

**Chrome**, **Firefox** and **Opera** on Android are OK.

The Android stock browser started supporting CSS 3D since version 4.0 (3.0 was rather limited).

## Known issues

Turning an `<img>` into a Sprite3D in Firefox fails because of the presence of `x` and `y` properties. These properties exist for backward compatilibity with old, non-standard features.

So, instead of using an `img`, rather use a `div` with a background and you'll be fine.

-----------------------

# Usage

**Please note that the writing of this section is still in progress. You'll find answers to your questions looking at the examples provided with the library.**

## 1 - Prepare

Transformed elements need to have their parent's `transform-style` property set to `preserve-3d` in order to appear properly tranformed. That's why it is required to have a root element (we'll call it a stage) that will contain your scene. 

Creating a stage is easy thanks to the `stage()` method, that creates a new div, sets it up and adds it to the document's body. This is the easiest solution if you are making a full window 3D experience.

	var stage = Sprite3D.stage();

The "default" stage is a blank div element absolutely positionned in the center of the page. Creating an element at position (0,0,0) will make it appear in centered. The X axis is pointing to the right, the Y axis down and the Z axis toward the camera.

Sprite3D.js allows you to use an existing element as the stage, so you can have more control on the way it is presented. For instance, you could use a rectangular viewport in the middle of your existing text content, set its `overflow` property to `hidden`.

	var stage = Sprite3D.stage( document.querySelector("#myContainer") );


## 2 - Populate
Create and position your sprites. Every time you finish altering an element's position, you should call the update() method. It applies the new transform informations in the page.

The manual update process was chosen for performance reasons, as it does not fire un-needed redraws of the DOM tree.

	var sprite = Sprite3D.create(".kitten")
		.position( -200, 10, -300 )
		.rotation( 80, 0, 5 )
		.bind( "mousedown", onMouseDown )
		.update()

	stage.addChild( sprite );
		
### 3 - Interact
When listening for events, the handler function receives two arguments : the regular DOM event, and a reference to the target Sprite3D object.

	function onMouseDown( event ):void
	{
		event.target.z(1000).update();
		event.preventDefault();
	}

Don't forget to use CSS transitions to animate the changes, so you don't need to set an interval to animate everything :)

-----------------------

## Credits
* Created by : [boblemarin](http://twitter.com/boblemarin)
* Feedback, suggestions, requests and more : [emeric@minimal.be](mailto:emeric@minimal.be)
