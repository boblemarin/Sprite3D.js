/*
* Sprite3D by boblemarin
* Visit the internets for documentation, updates and examples.
*
*
* Copyright (c) 2010 boblemarin http://www.minimal.be
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


var Sprite3D = Sprite3D || ( function ( element ) {
	// private variables
	var p,rx,ry,rz,i,alpha = 1;
	
	// create an empty <div> if no element is provided
	if ( element == null )
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
	
	// DEBUG STYLE :)
	//element.style.border = "1px solid red";
	
	return {
		
		// public properties
		
		x: 0, // position
		y: 0,
		z: 0,
		rotationX: 0, // rotation
		rotationY: 0,
		rotationZ: 0,
		width: 0, // size
		height: 0,
		regX: 0, // registration point :)
		regY: 0,
		regZ: 0,
		domElement: element, // reference to the DOM element linked to the sprite
		style: element.style, // reference to the CSS style object
		children: [], // store and count children objects
		numChildren: 0,
		rotateFirst: false, // will change soon for a more elaborate method of controlling transformations order
		
		
		
		// absolute position setters
		setX: function ( px ) { this.x = px; return this; },
		setY: function ( py ) { this.y = py; return this; },
		setZ: function ( pz ) { this.z = pz; return this; },
		setPosition: function ( px, py, pz ) {
			this.x = px;
			this.y = py;
			this.z = pz;
			return this;
		},

		// relative position setters		
		moveX: function ( px ) { this.x += px; return this; },
		moveY: function ( py ) { this.y += py; return this; },
		moveZ: function ( pz ) { this.z += pz; return this; },
		move: function ( px, py, pz ) {
			this.x += px;
			this.y += py;
			this.z += pz;
			return this;
		},
		
		// relative rotation setters
		rotateX: function ( rx ) { this.rotationX += rx; return this; },
		rotateY: function ( ry ) { this.rotationY += ry; return this; },
		rotateZ: function ( rz ) { this.rotationZ += rz; return this; },
		rotate: function( rx, ry, rz ) {
			this.rotationX += rx;
			this.rotationY += ry;
			this.rotationZ += rz;
			return this;
		},

		// absolute rotation setters
		setRotationX: function ( rx ) { this.rotationX = rx; return this; },
		setRotationY: function ( ry ) { this.rotationY = ry; return this; },
		setRotationZ: function ( rz ) { this.rotationZ = rz; return this; },
		setRotation: function( rx, ry, rz ) {
			this.rotationX = rx;
			this.rotationY = ry;
			this.rotationZ = rz;
			return this;
		},
		
		// registration point setter
		setRegistrationPoint: function( rx, ry, rz ) {
			this.regX = rx;
			this.regY = ry;
			this.regZ = rz;
			return this;
		},
		
		// transform origin setter
		setTransformOrigin: function( px, py ) {
			this.style.webkitTransformOrigin = px + " " + py;
			return this;
		},
		
		// size setter (this one does not need to be followed by a call to the update() method)
		setSize: function( width, height ) {
			this.style.width = ( this.width = width ) + "px";
			this.style.height = ( this.height = height ) + "px";
			return this;
		},

		// alpha  (this one does not need to be followed by a call to the update() method)
		setOpacity: function( a ) {
			this.style.opacity = this.alpha = a;
			return this;
		},
		
		getOpacity: function() {
			return this.alpha;
		},
		
		// element css class name access
		// className : String
		setClassName: function( className ) {
			this.domElement.className = className;
			return this;
		},
		
		getClassName: function() {
			return this.domElement.className;
		},
		
		// this dirty one is intended to those who love
		// extreme chaining and custom properties :)
		// label : String
		// value : *
		setProperty: function( label, value ) {
			this[label] = value;
			return this;
		},
		
		// rg = true|false
		// defines in which order transformations are applied
		// rotations first, then translations or translations first, then rotations
		setRotateFirst: function( rf ) {
			this.rotateFirst = rf;
			return this;
		},
		
		
		
		// udpate method(s)
		/*
		NOTE TO SELF : has to choose between all of those method which ones are the best fit, then clean.
		
		TODO: change that rotateFirst stuff for something more adaptable, like a format string "rx ry rz t" or "rz t ty rx"...
		
		
		*/
		
		
		// updates position and rotation
		update: function() { 
			p = "translate3D(" + (this.x-this.regX) + "px," + (this.y-this.regY) + "px," + (this.z-this.regZ) + "px) ";
			rx = "rotateX(" + this.rotationX + "deg) ";
			ry = "rotateY(" + this.rotationY + "deg) ";
			rz = "rotateZ(" + this.rotationZ + "deg) ";
			
			if ( this.rotateFirst )
				this.style.webkitTransform = rx + ry + rz + p;
			else
				this.style.webkitTransform = p + rx + ry + rz;
				
			return this;
		},
		
		
		// updates position, rotation, opacity and size
		updateAll: function() { 
			this.update();
			//this.style.opacity = this.alpha;
			this.style.width = this.width + "px";
			this.style.height = this.height + "px";
			return this.update();
		},
		
		// calls update() on every child
		updateChildren: function() { 
			for ( i = 0; i < this.numChildren; i++ ) {
				this.children[i].update();
			}
			return this;
		},
		
		// calls updateAll() on every child
		updateChildrenAll: function() { 
			for ( i = 0; i < this.numChildren; i++ ) {
				this.children[i].updateAll();
			}
			return this;
		},
		
		// updates itself, then updates every child
		// recursive : true|false, set to true and the process will be recursive
		updateWithChildren: function( recursive ) {
			this.update();

			for ( i = 0; i < this.numChildren; i++ ) {
				if ( recursive ) 
					this.children[i].updateWithChildren( recurse );
				else
					this.children[i].update();
			}

			return this;
		},
		
		
		
		// scenography related methods
		
		addChild: function( e ) {
			this.numChildren = this.children.push(e);
			this.domElement.appendChild( e.domElement );
			return e;
		},
		
		removeChild: function( child ) {
			var n = this.children.indexOf( child );
			if ( n > -1 ) {
				return removeChildAt( n );
			}
			return null;
		},
		
		removeChildAt: function( n ) {
			--this.numChildren;
			this.domElement.removeChild( this.children[n].domElement );
			return this.children.splice( n, 1 )[0];
		},
		
		// returns the child associated with the provided Dom element
		// use this when listening to user input events (using addEventListener)
		findFromDOMElement: function( elmnt ) {
			for ( i = 0; i < this.numChildren; i++ ) {
				if ( elmnt == this.children[i].domElement ) return this.children[i];
			}
		},
		
		
		
		// event handling (needs findFromDOMElement() when receiving event, has to be fixed one day :-)
		
		addEventListener: function( event, callback ) {
			this.domElement.addEventListener( event, callback );
			return this;
		},
		
		removeEventListener: function( event, callback ) {
			this.domElement.removeEventListener( event, callback );
			return this;
		},
		
	};
	
});





// 'static' helper methods

Sprite3D.createCenteredContainer = function() {
	var c = document.createElement('div');
	var s = c.style;
	s.webkitPerspective = 800;
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

Sprite3D.createTopLeftCenteredContainer = function() {
	var c = document.createElement('div');
	var s = c.style;
	s.webkitPerspective = 800;
//	s.webkitPerspectiveOrigin = "0 0";
//	s.webkitTransformOrigin = "0 0";
	s.webkitTransform = "translateZ(0px)";
	s.position = "absolute";
	s.top = "0px";
	s.left = "0px";
	s.right = "0px"
	s.bottom = "0px"
	s.margin = "0px";
	s.padding = "0px";
	s.border = "1px solid red";
	document.body.appendChild(c);
	
	return new Sprite3D(c);
};
