/*
* Sprite3D.js
* Visit the internets for documentation, updates and examples.
* https://github.com/boblemarin/Sprite3D.js
* http://minimal.be/lab/Sprite3D
*
* Copyright (c) 2010 boblemarin emeric@minimal.be http://www.minimal.be
* 
* Permission is hereby granted, free of charge, to any person
* obtaining a copy of this software and associated documentation
* files (the "Software"), to deal in the Software without
* restriction, including without limitation the rights to use,
* copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the
* Software is furnished to do so, subject to the following
* conditions:
* 
* The above copyright notice and this permission notice shall be
* included in all copies or substantial portions of the Software.
* 
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
* EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
* OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
* NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
* HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
* WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
* FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
* OTHER DEALINGS IN THE SOFTWARE.
*/

/**
 * Creates an instance of Sprite3D
 *
 * @constructor
 * @author boblemarin
 * @this {Sprite3D}
 * @param {Object} element The DOM element to wrap the Sprite3D object around. When no element is provided, a empty div is created and added to the document.
 */
function Sprite3D(element) {
    // private variables
    var p,s,r = "marotation",
    rx,
    ry,
    rz,
    i,
    alpha = 1,
    listeners = {};

    // create an empty <div> if no element is provided
    if (element == null)
    {
        element = document.createElement("div");
    }

    // prepare for 3D positionning
    element.style.webkitTransformStyle = "preserve-3d";
    element.style.margin = "0px";
    element.style.padding = "0px";
    element.style.position = "absolute";

    // trigger hardware acceleration even if no property is set
    element.style.webkitTransform = "translateZ(0px)";

    // debug style
    //element.style.border = '1px solid red';
    this.domElement = element;
    this.style = element.style;
    this.children = [];
}

/** The X-axis position of the Sprite3D */
Sprite3D.prototype.x = 0;
/** The Y-axis position of the Sprite3D */
Sprite3D.prototype.y = 0;
/** The Z-axis position of the Sprite3D */
Sprite3D.prototype.z = 0;

/** The X-axis rotation of the Sprite3D */
Sprite3D.prototype.rotationX = 0;
/** The Y-axis rotation of the Sprite3D */
Sprite3D.prototype.rotationY = 0;
/** The Z-axis rotation of the Sprite3D */
Sprite3D.prototype.rotationZ = 0;

/** The X-axis scale of the Sprite3D */
Sprite3D.prototype.scaleX = 1;
/** The Y-axis scale of the Sprite3D */
Sprite3D.prototype.scaleY = 1;
/** The Z-axis scale of the Sprite3D */
Sprite3D.prototype.scaleZ = 1;

/** The width of the HTML element associated with the Sprite3D object */
Sprite3D.prototype.width = 0;
/** The height of the HTML element associated with the Sprite3D object */
Sprite3D.prototype.height = 0;

/** The X-axis registration point of the Sprite3D object used for 3D positionning */
Sprite3D.prototype.regX = 0;
/** The Y-axis registration point of the Sprite3D object used for 3D positionning */
Sprite3D.prototype.regY = 0;
/** The Y-axis registration point of the Sprite3D object used for 3D positionning */
Sprite3D.prototype.regZ = 0;

/** The width (in pixels) of the tiles in the spritesheet */
Sprite3D.prototype.tileWidth = 0;
/** The height (in pixels) of the tiles in the spritesheet */
Sprite3D.prototype.tileHeight = 0;

/** A reference to the DOM element associated with this Sprite3D object */
Sprite3D.prototype.domElement;

/** A reference to the CSS style object of the DOM element */
Sprite3D.prototype.style;

/** An array holding references of the Sprite3D's children object */
Sprite3D.prototype.children = [];

/** The number of child objects */
Sprite3D.prototype.numChildren = 0;

/** [DEPRACATED] A boolean value to decide in which order transformations are applied. If true, rotations are applied before translations. If false, translations are applied before rotations. */
Sprite3D.prototype.rotateFirst = false;

/**
 * Sets the X-axis position of the Sprite3D.
 * @param {Number} px The position
 * @return {Sprite3D} The reference to this Sprite3D object
 */
Sprite3D.prototype.setX = function(px) {
    this.x = px;
    return this;
};

/**
 * Sets the Y-axis position of the Sprite3D.
 * @param {Number} py The position
 * @return {Sprite3D} The reference to this Sprite3D object
 */
Sprite3D.prototype.setY = function(py) {
    this.y = py;
    return this;
};

/**
 * Sets the Z-axis position of the Sprite3D.
 * @param {Number} pz The position
 * @return {Sprite3D} The reference to this Sprite3D object
 */
Sprite3D.prototype.setZ = function(pz) {
    this.z = pz;
    return this;
};

/**
 * Sets the 3D position of the Sprite.
 * @param {Number} px The position on the X-axis
 * @param {Number} py The position on the Y-axis
 * @param {Number} pz The position on the Z-axis
 * @return {Sprite3D} The reference to this Sprite3D object
 */
Sprite3D.prototype.setPosition = function(px, py, pz) {
    this.x = px;
    this.y = py;
    this.z = pz;
    return this;
};

/**
 * Applies a relative translation in 3D space on the X-axis.
 * @param {Number} px The value of the translation
 * @return {Sprite3D} The reference to this Sprite3D object
 */
Sprite3D.prototype.moveX = function(px) {
    this.x += px;
    return this;
};

/**
 * Applies a relative translation in 3D space on the Y-axis.
 * @param {Number} py The value of the translation
 * @return {Sprite3D} The reference to this Sprite3D object
 */
Sprite3D.prototype.moveY = function(py) {
    this.y += py;
    return this;
};

/**
 * Applies a relative translation in 3D space on the Z-axis.
 * @param {Number} pz The value of the translation
 * @return {Sprite3D} The reference to this Sprite3D object
 */
Sprite3D.prototype.moveZ = function(pz) {
    this.z += pz;
    return this;
};

/**
 * Applies a relative translation in 3D space.
 * @param {Number} px The value of the translation on the X-axis
 * @param {Number} py The value of the translation on the Y-axis
 * @param {Number} pz The value of the translation on the Z-axis
 * @return {Sprite3D} The reference to this Sprite3D object
 */
Sprite3D.prototype.move = function(px, py, pz) {
    this.x += px;
    this.y += py;
    this.z += pz;
    return this;
};



/**
 * Sets the amount of rotation around the X-axis of the Sprite3D.
 * @param {Number} rx The value of the rotation
 * @return {Sprite3D} The reference to this Sprite3D object
 */
Sprite3D.prototype.setRotationX = function(rx) {
    this.rotationX = rx;
    return this;
};

/**
 * Sets the amount of rotation around the Y-axis of the Sprite3D.
 * @param {Number} ry The value of the rotation
 * @return {Sprite3D} The reference to this Sprite3D object
 */
Sprite3D.prototype.setRotationY = function(ry) {
    this.rotationY = ry;
    return this;
};

/**
 * Sets the amount of rotation around the Z-axis of the Sprite3D.
 * @param {Number} rz The value of the rotation
 * @return {Sprite3D} The reference to this Sprite3D object
 */
Sprite3D.prototype.setRotationZ = function(rz) {
    this.rotationZ = rz;
    return this;
};

/**
 * Sets the 3D rotation of the Sprite.
 * @param {Number} rx The rotation around the X-axis
 * @param {Number} ry The rotation around the Y-axis
 * @param {Number} rz The rotation around the Z-axis
 * @return {Sprite3D} The reference to this Sprite3D object
 */
Sprite3D.prototype.setRotation = function(rx, ry, rz) {
    this.rotationX = rx;
    this.rotationY = ry;
    this.rotationZ = rz;
    return this;
};


/**
 * Applies a relative rotation in 3D space around the X-axis.
 * @param {Number} rx The value of the rotation
 * @return {Sprite3D} The reference to this Sprite3D object
 */
Sprite3D.prototype.rotateX = function(rx) {
    this.rotationX += rx;
    return this;
};

/**
 * Applies a relative rotation in 3D space around the Y-axis.
 * @param {Number} ry The value of the rotation
 * @return {Sprite3D} The reference to this Sprite3D object
 */
Sprite3D.prototype.rotateY = function(ry) {
    this.rotationY += ry;
    return this;
};

/**
 * Applies a relative rotation in 3D space around the Z-axis.
 * @param {Number} rz The value of the rotation
 * @return {Sprite3D} The reference to this Sprite3D object
 */
Sprite3D.prototype.rotateZ = function(rz) {
    this.rotationZ += rz;
    return this;
};

/**
 * Applies a relative rotation in 3D space.
 * @param {Number} rx The value of the rotation around the X-axis
 * @param {Number} ry The value of the rotation around the Y-axis
 * @param {Number} rz The value of the rotation around the Z-axis
 * @return {Sprite3D} The reference to this Sprite3D object
 */
Sprite3D.prototype.rotate = function(rx, ry, rz) {
    this.rotationX += rx;
    this.rotationY += ry;
    this.rotationZ += rz;
    return this;
};

/**
 * Sets the scaling of the Sprite3D object on the X-axis.
 * @param {Number} sx The value of the scaling on the X-axis
 * @return {Sprite3D} The reference to this Sprite3D object
 */
Sprite3D.prototype.setScaleX = function( sx ) {
	this.scaleX = sx;
	return this;
};

/**
 * Sets the scaling of the Sprite3D object on the Y-axis.
 * @param {Number} sy The value of the scaling on the Y-axis
 * @return {Sprite3D} The reference to this Sprite3D object
 */
Sprite3D.prototype.setScaleY = function( sy ) {
	this.scaleY = sy;
	return this;
};

/**
 * Sets the scaling of the Sprite3D object on the Z-axis.
 * @param {Number} sz The value of the scaling on the Z-axis
 * @return {Sprite3D} The reference to this Sprite3D object
 */
Sprite3D.prototype.setScaleZ = function( sz ) {
	this.scaleZ = sz;
	return this;
};

/**
 * Sets the scaling of the Sprite3D object on the 3 axis.
 * @param {Number} sx The value of the scaling on the X-axis
 * @param {Number} sy The value of the scaling on the Y-axis
 * @param {Number} sz The value of the scaling on the Z-axis
 * @return {Sprite3D} The reference to this Sprite3D object
 */
Sprite3D.prototype.setScale = function( sx, sy, sz ) {
	this.scaleX = sx;
	this.scaleY = sy;
	this.scaleZ = sz;
	return this;
};

/**
 * Sets the uniform scaling of the Sprite3D object on the 3 axis.
 * @param {Number} s The value of the scaling on all axis.
 * @return {Sprite3D} The reference to this Sprite3D object
 */
Sprite3D.prototype.setScaleAll = function( s ) {
	this.scaleX = s;
	this.scaleY = s;
	this.scaleZ = s;
	return this;
};

/**
 * Sets the registrations point for the Sprite3D object. 
 * By default, CSS positionning is relative to the top left corner of the element.
 * The registration point values are simply substracted from the position when applied
 * @param {Number} rx The registration point value for the X-axis
 * @param {Number} ry The registration point value for the Y-axis
 * @param {Number} rz The registration point value for the Z-axis
 * @return {Sprite3D} The reference to this Sprite3D object
 */
Sprite3D.prototype.setRegistrationPoint = function(rx, ry, rz) {
    this.regX = rx;
    this.regY = ry;
    this.regZ = rz;
    return this;
};

/**
 * Sets the origin of the 3D transforms.
 * By default, CSS transforms are relative to the center of the element.
 * @param {Number} px The transform origin value for the X-axis
 * @param {Number} py The transform origin value for the Y-axis
 * @return {Sprite3D} The reference to this Sprite3D object
 */
Sprite3D.prototype.setTransformOrigin = function(px, py) {
    this.style.webkitTransformOrigin = px + " " + py;
    return this;
};


/**
 * Sets the size of the HTML element linked to the Sprite3D object, using the width and height css properties.
 * Note that animating using these properties does not provide an optimal performance.
 * You should rather try to use CSS scale using the scale() method
 * This method applies the changes to the style object, so it does not require a call to the update methods
 * @param {Number} width The desired width
 * @param {Number} height The desired height
 * @return {Sprite3D} The reference to this Sprite3D object
 */
Sprite3D.prototype.setSize = function(width, height) {
    this.style.width = (this.width = width) + "px";
    this.style.height = (this.height = height) + "px";
    return this;
};

/**
 * Sets the opacity of the element.
 * This method applies the changes to the style object, so it does not require a call to the update methods
 * @param {Number} alpha The desired opacity, ranging from 0 to 1
 * @return {Sprite3D} The reference to this Sprite3D object
 */
Sprite3D.prototype.setOpacity = function(alpha) {
    this.style.opacity = this.alpha = alpha;
    return this;
};

/**
 * Returns the opacity of the element.
 * @return {Number} The opacity of the element
 */
Sprite3D.prototype.getOpacity = function() {
    return this.alpha;
};

/**
 * Sets the CSS class name of the DOM element associated with the Sprite3D object.
 * When applying multiple class names, provide a single string with space-separated class names like you would do in pure CSS manipulation.
 * This method does not require a call to the update methods.
 * @param {String} className The name of the class to be set
 * @return {Sprite3D} The reference to this Sprite3D object
 */
Sprite3D.prototype.setClassName = function(className) {
    this.domElement.className = className;
    return this;
};

/**
 * Returns the name of the CSS class of the DOM element.
 * @return {String} The CSS class name
 */
Sprite3D.prototype.getClassName = function() {
    return this.domElement.className;
};

/**
 * Adds a CSS class to the DOM element
 * This method does not require a call to the update methods.
 * @param {String} className The name of the class to be added
 * @return {Sprite3D} The reference to this Sprite3D object
 */
Sprite3D.prototype.addClassName = function(className) {
 	this.domElement.className += " " + className + " ";
    return this;
};

/**
 * [BETA] Removes a CSS class from the DOM element
 * This method does not require a call to the update methods.
 * @param {String} className The name of the class to be removed
 * @return {Sprite3D} The reference to this Sprite3D object
 */
Sprite3D.prototype.removeClassName = function(className) {
	this.domElement.className = this.domElement.className.replace(className, '');
    //this.domElement.className += " " + className;
    return this;
};

/**
 * Sets the ID of the DOM element in the document.
 * This method is just a helper allowing neverending chaining in the Sprite3D creation syntax.
 * You can also simply access the <code>domElement</code> property of the Sprite3D and set it's <code>id</code> property.
 * This method does not require a call to the update methods.
 * @param {String} id The ID
 * @return {Sprite3D} The reference to this Sprite3D object
 */
Sprite3D.prototype.setId = function(id) {
    this.domElement.id = id;
    return this;
};

/**
 * Returns the ID of the DOM element associated with the Sprite3D.
 * @return {String} The CSS class name
 */
Sprite3D.prototype.getId = function() {
    return this.domElement.id;
};

/**
 * Allows to set any value in any CSS property of the style object of the DOM element.
 * This method is just a helper allowing neverending chaining in the Sprite3D creation syntax.
 * For one time modifications, you can simply use the <code>style</code> property of the Sprite3D.
 * This method does not require a call to the update methods.
 * @param {String} name The name of the CSS property in which the value will be stored
 * @param {String} value The value to assign to the property
 * @return {Sprite3D} The reference to this Sprite3D object
 */
Sprite3D.prototype.setCSS = function(name, value) {
    this.domElement.style[name] = value;
    return this;
};

/**
 * Returns the value assigned to the provided CSS property.
 * @param {String} name The name of the property to get the value from
 * @return {String} The value of the CSS property
 */
Sprite3D.prototype.getCSS = function(name) {
    return this.domElement.style[name];
};

/**
 * Allows direct write access to the innerHTML property of the DOM element.
 * @param {String} value The string to write into the innerHTML property
 * @return {Sprite3D} The reference to this Sprite3D object
 */
Sprite3D.prototype.setInnerHTML = function(value) {
    this.domElement.innerHTML = value;
    return this;
};


/**
 * Sets the size of the tiles in the spritesheet used as background image.
 * @param {Number} width The desired width
 * @param {Number} height The desired height
 * @return {Sprite3D} The reference to this Sprite3D object
 */
Sprite3D.prototype.setTileSize = function(width, height) {
    this.tileWidth = width;
    this.tileHeight = height;
    return this;
};

/**
 * Modifies the sprites's background image position to display the selected tile.
 * For this method to work, you are supposed to set a background image and limit the size of the element using CSS styles,
 * and use a sprite sheet where all tiles have the same size. No checking is performed on the provided values.
 * @param {Number} tilePosX The horizontal index of the tile to be displayed
 * @param {Number} tilePosY The vertical index of the tile to be displayed
 * @return {Sprite3D} The reference to this Sprite3D object
 */
Sprite3D.prototype.setTilePosition = function(tilePosX, tilePosY) {
    this.style.backgroundPosition = "-" + (tilePosX * this.tileWidth) + "px -" + (tilePosY * this.tileHeight) + "px";
    return this;
};

/**
 * Allows to set a arbitary property value while using the chaining syntax.
 * @param {String} label The name of the property
 * @param {Object} value The value for that property
 * @return {Sprite3D} The reference to this Sprite3D object
 */
Sprite3D.prototype.setProperty = function(label, value) {
    this[label] = value;
    return this;
};

/**
 * Sets the order in which transformations are applied.
 * If true, rotations are applied before translations. If false, translations are applied before rotations.
 * Note that, when applying rotations, the axis of the object rotate, and subsequent translations follow the modified orientation of the axis.
 * @param {boolean} rf true to rotate first, false to translate first
 * @return {Sprite3D} The reference to this Sprite3D object
 */
Sprite3D.prototype.setRotateFirst = function(rf) {
    this.rotateFirst = rf;
    return this;
};

/**
 * Applies position and rotation values.
 * @return {Sprite3D} The reference to this Sprite3D object
 */
Sprite3D.prototype.update = function() {    p = "translate3d(" + (this.x - this.regX) + "px," + (this.y - this.regY) + "px," + (this.z - this.regZ) + "px) ";
    rx = "rotateX(" + this.rotationX + "deg) ";
    ry = "rotateY(" + this.rotationY + "deg) ";
    rz = "rotateZ(" + this.rotationZ + "deg) ";
    //r = 
	s = "scale3d(" + this.scaleX + ", " + this.scaleY + ", " + this.scaleX + ") ";

    if (this.rotateFirst)
    //this.style.webkitTransform = rx + ry + rz + p;
    this.style.webkitTransform = rz + ry + rx + p + s;
    else
    this.style.webkitTransform = p + rx + ry + rz + s;

    return this;

    /*
	future version, more flexible :
	
	var transformString = "rx ry rz p";
	var tt = transformString;
	tt = tt.replace( "p", p );
	tt = tt.replace( "rx", rx );
	tt = tt.replace( "ry", ry );
	tt = tt.replace( "rz", rz );
	
	this.style.webkitTransform = tt;
	
	*/
};

/**
 * Applies position and rotation values, as well as opacity and size.
 * @return {Sprite3D} The reference to this Sprite3D object
 */
Sprite3D.prototype.updateAll = function() {
    this.update();
    this.style.opacity = this.alpha;
    this.style.width = this.width + "px";
    this.style.height = this.height + "px";
    return this.update();
};


/**
 * Calls the update() method on every child of the Sprite3D object.
 * @return {Sprite3D} The reference to this Sprite3D object
 */
Sprite3D.prototype.updateChildren = function() {
    for (i = 0; i < this.numChildren; i++) {
        this.children[i].update();
    }
    return this;
};

/**
 * Calls the updateAll() method on every child of the Sprite3D object.
 * @return {Sprite3D} The reference to this Sprite3D object
 */
Sprite3D.prototype.updateChildrenAll = function() {
    for (i = 0; i < this.numChildren; i++) {
        this.children[i].updateAll();
    }
    return this;
};

/**
 * Updates itself, then calls the update() method on every child of the Sprite3D object.
 * @param {boolean} recursive If set to true, make the update call recursive, update every child's children
 * @return {Sprite3D} The reference to this Sprite3D object
 */
Sprite3D.prototype.updateWithChildren = function(recursive) {
    this.update();

    for (i = 0; i < this.numChildren; i++) {
        if (recursive)
        this.children[i].updateWithChildren(recurse);
        else
        this.children[i].update();
    }

    return this;
};

/**
 * Adds a Sprite3D object to this Sprite3D children.
 * @param {Sprite3D} e The Sprite3D object to add
 * @return {Sprite3D} The reference to the added Sprite3D object
 */
Sprite3D.prototype.addChild = function(e) {
    this.numChildren = this.children.push(e);
    this.domElement.appendChild(e.domElement);
    return e;
};

/**
 * Removes a Sprite3D object from this Sprite3D children.
 * @param {Sprite3D} child The Sprite3D object to remove
 * @return {Sprite3D} The reference to the removed Sprite3D object. null if the child was not found in this Sprite3D children list
 */
Sprite3D.prototype.removeChild = function(child) {
    var n = this.children.indexOf(child);
    if (n > -1) {
        return this.removeChildAt(n);
    }
    return null;
};

/**
 * Removes the nth Sprite3D object from this Sprite3D children.
 * @param {number} n The index of the Sprite3D object to remove
 * @return {Sprite3D} The reference to the removed Sprite3D object.
 */
Sprite3D.prototype.removeChildAt = function(n) {
    --this.numChildren;
    this.domElement.removeChild(this.children[n].domElement);
    return this.children.splice(n, 1)[0];
};

// returns the child associated with the provided Dom element
// use this when listening to user input events (using addEventListener)
/**
 * Finds and return the Sprite3D object associated with the provided DOM element
 * @param {Object} element The DOM element
 * @return {Sprite3D} The reference to the associated Sprite3D object. Returns null if no relevant Sprite3D object was found
 */
Sprite3D.prototype.findFromDOMElement = function(element) {
    for (i = 0; i < this.numChildren; i++) {
        if (element == this.children[i].domElement) return this.children[i];
    }
    return null;
};

/**
 * Adds an event listener to the DOM element for the provided event id.
 * @param {String} event The name of the event to watch
 * @param {Function} callback The callback function
 * @return {Sprite3D} The reference to this Sprite3D object
 */
Sprite3D.prototype.addEventListener = function(event, callback) {
    // old way, not so satisfying (does not bring the sprite's reference to the callback funcion)
    //this.domElement.addEventListener( event, callback );
    // experimental version, allows to get the reference of the target Sprite3D,
    // but requires a little bit more work on the removeEventListener method
    var sprite = this;
    this.domElement.addEventListener(event,
    function(e) {
        callback(e, sprite);
    });
    return this;
};

/**
 * Removes an event listener to the DOM element for the provided event id [CURRENTLY BROKEN].
 * @param {String} event The name of the event to watch
 * @param {Function} callback The callback function
 * @return {Sprite3D} The reference to this Sprite3D object
 */
Sprite3D.prototype.removeEventListener = function(event, callback) {
    this.domElement.removeEventListener(event, callback);
    return this;
};


/**
 * Creates a centered empty HTML div element to be used as root container for the other Sprite3D objects.
 * @return {Sprite3D} The created Sprite3D object
 */
Sprite3D.createCenteredContainer = function() {
    var c = document.createElement('div');
    var s = c.style;
    s.webkitPerspective = "800";
    s.webkitPerspectiveOrigin = "0 0";
    s.webkitTransformOrigin = "0 0";
    s.webkitTransform = "translateZ(0px)";
    s.position = "absolute";
    s.top = "50%";
    s.left = "50%";
    s.margin = "0px";
    s.padding = "0px";
    //s.border = "1px solid red";
    document.body.appendChild(c);

    return new Sprite3D(c);
};

/**
 * Creates a top-left aligned empty HTML div element to be used as root container for the other Sprite3D objects.
 * @return {Sprite3D} The created Sprite3D object
 */
Sprite3D.createTopLeftCenteredContainer = function() {
    var c = document.createElement('div');
    var s = c.style;
    s.webkitPerspective = "800";
    //	s.webkitPerspectiveOrigin = "0 0";
    //	s.webkitTransformOrigin = "0 0";
    s.webkitTransform = "translateZ(0px)";
	s.position = "relative";
	/*
    s.position = "absolute";
    s.top = "0px";
    s.left = "0px";
    s.right = "0px"
    s.bottom = "0px"
	s.margin = "0px";
    s.padding = "0px";
	s.border = "1px solid red";
	*/
	document.body.appendChild(c);

    return new Sprite3D(c);
};

/**
 * Test for CSS 3D transforms support in the current browser.
 * @return {boolean} True if the 3D transforms are supported by the browser
 */
Sprite3D.isSupported = function() {
    // TODO: should be extended when adding support for more browser engines
    return 'webkitPerspective' in document.body.style;
};