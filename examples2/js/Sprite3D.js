/*
* Sprite3D.js - v2 (1)
* Visit the internets for documentation, updates and examples.
* https://github.com/boblemarin/Sprite3D.js
* http://minimal.be/lab/Sprite3D
*
* (1) this is a working version of Sprite3D 2.0,
*     it is not yet finished. Please go to the githu 
*     repo to get the most up-to-date file.
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

function Sprite3D(element) {
	// init engine if needed
	if ( !Sprite3D.prototype._isInit ) Sprite3D.isSupported();

	// create an empty <div> if no element is provided
	if (arguments.length == 0) {
		element = document.createElement("div");
		element.style.margin = "0px";
		element.style.padding = "0px";
		element.style.position = "absolute";
	} else {
		if ( element.style.position == "static" ) element.style.position = "relative";
	}
	
	// Firefox 10 empty div fix
	//if ( element.localName == "DIV" && element.innerHTML == "" ) element.innerHTML = "&nbsp;";
	
	// prepare for 3D positionning
	element.style[ this._browserPrefix + "TransformStyle" ] = "preserve-3d";
	element.style[ this._transformProperty ] = "translateZ(0px)";
	
		
	this.domElement = element;
	this.children = [];
	this._style = element.style;
	this._listeners = {};
	
}

// properties, should be private in an ideal world...
Sprite3D.prototype._px = 0;
Sprite3D.prototype._py = 0;
Sprite3D.prototype._pz = 0;
Sprite3D.prototype._rx = 0;
Sprite3D.prototype._ry = 0;
Sprite3D.prototype._rz = 0;
Sprite3D.prototype._sx = 1;
Sprite3D.prototype._sy = 1;
Sprite3D.prototype._sz = 1;
Sprite3D.prototype._ox = 0;
Sprite3D.prototype._oy = 0;
Sprite3D.prototype._oz = 0;
Sprite3D.prototype._transformString = "_p _rx _ry _rz _s";
Sprite3D.prototype._a = 1;
Sprite3D.prototype._style = null;
Sprite3D.prototype._listeners = null;
Sprite3D.prototype.__p = ""; 
Sprite3D.prototype.__s = "";
Sprite3D.prototype.__rx = "";
Sprite3D.prototype.__ry = "";
Sprite3D.prototype.__rz = "";
Sprite3D.prototype.__ts = "";
Sprite3D.prototype.__i = 0;

/** The width (in pixels) of the tiles in the spritesheet */
Sprite3D.prototype.tileWidth = 0;
/** The height (in pixels) of the tiles in the spritesheet */
Sprite3D.prototype.tileHeight = 0;

/** A reference to the DOM element associated with this Sprite3D object */
Sprite3D.prototype.domElement = null;

/** An array holding references of the Sprite3D's children object */
Sprite3D.prototype.children = null;

/** The number of child objects */
Sprite3D.prototype.numChildren = 0;


Sprite3D.prototype.transformString = function(ts) {
	this._transformString = ts;
	return this;
};

/********** Position / absolute ***********/
Sprite3D.prototype.x = function(px) {
	if ( arguments.length ) {
		this._px = px;
		return this;
	} else {
		return this._px;
	}
};
Sprite3D.prototype.y = function(py) {
	if ( arguments.length ) {
		this._py = py;
		return this;
	} else {
		return this._py;
	}
};
Sprite3D.prototype.z = function(pz) {
	if ( arguments.length ) {
		this._pz = pz;
		return this;
	} else {
		return this._pz;
	}
};
Sprite3D.prototype.position = function(px,py,pz) {
	this._px = px;
	this._py = py;
	this._pz = pz;
	return this;
};
/********** Position / relative ***********/
Sprite3D.prototype.move = function(px,py,pz) {
	this._px += px;
	this._py += py;
	if ( arguments.length == 3 ) this._pz += pz;
	return this;
};

/********** Rotation / absolute ***********/
Sprite3D.prototype.rotationX = function(rx) {
	if ( arguments.length ) {
		this._rx = rx;
		return this;
	} else {
		return this._rx;
	}
};
Sprite3D.prototype.rotationY = function(ry) {
	if ( arguments.length ) {
		this._ry = ry;
		return this;
	} else {
		return this._ry;
	}
};
Sprite3D.prototype.rotationZ = function(rz) {
	if ( arguments.length ) {
		this._rz = rz;
		return this;
	} else {
		return this._rz;
	}
};
Sprite3D.prototype.rotation = function(rx,ry,rz) {
	this._rx = rx;
	this._ry = ry;
	this._rz = rz;
	return this;
};
/********** Rotation / relative ***********/
Sprite3D.prototype.rotate = function(rx,ry,rz) {
	this._rx += rx;
	this._ry += ry;
	this._rz += rz;
	return this;
};

/********** Scale ***********/
Sprite3D.prototype.scaleX = function(sx) {
	if ( arguments.length ) {
		this._sx = sx;
		return this;
	} else {
		return this._sx;
	}
};
Sprite3D.prototype.scaleY = function(sy) {
	if ( arguments.length ) {
		this._sy = sy;
		return this;
	} else {
		return this._sy;
	}
};
Sprite3D.prototype.scaleZ = function(sz) {
	if ( arguments.length ) {
		this._sz = sz;
		return this;
	} else {
		return this._sz;
	}
};
Sprite3D.prototype.scale = function(sx,sy,sz) {
	switch(arguments.length){
		case 0:
			return this._sx;
		case 1: 
			this._sx = sx;
			this._sy = sx;
			this._sz = sx;
			return this;
		case 2:
			this._sx = sx;
			this._sy = sy;
			this._sz = 1;
			return this;
		case 3:
			this._sx = sx;
			this._sy = sy;
			this._sz = sz;
			return this;
	}
	return this;
}

/********** Alpha ***********/
Sprite3D.prototype.alpha = function(alpha) {
	if ( arguments.length ) {
		this._style.opacity = this._a = alpha;		
		return this;
	} else {
		return this._a;
	}
};

/********** Origin (former registrationPoint) ***********/
Sprite3D.prototype.origin = function(ox,oy,oz) {
	this._ox = ox;
	this._oy = oy;
	this._oz = (arguments.length==3)?oz:0;
	return this;
};

/********** Transform Origin ***********/
Sprite3D.prototype.transformOrigin = function(tx,ty) {
	this._style[ this._browserPrefix + "TransformOrigin" ] = (Number(tx)?tx+"px":tx) + " " + (Number(ty)?ty+"px":ty);
	return this;
};

/********** CSS ClassName manipulation ***********/
Sprite3D.prototype.className = function(c) {
	if (arguments.length) {
		this.domElement.className = c;
		return this;
	} else {
		return this.domElement.className;
	}
};
Sprite3D.prototype.addClassName = function(c) {
	this.domElement.className += " " + c + " ";
	return this;
};
Sprite3D.prototype.removeClassName = function(c) {
	this.domElement.className = this.domElement.className.replace(c, '');
	return this;
};

/********** ID ***********/
Sprite3D.prototype.id = function(id) {
	if ( arguments.length){
		this.domElement.id = id;
		return this;
	} else {
		return this.domElement.id;
	}
	
};

/********** CSS properties manipulation ***********/
Sprite3D.prototype.css = function(name, value) {
	switch(arguments.length) {
		case 0:
			return this._style;
		case 1:
			return this._style[name];
		case 2:
			this._style[name] = value;
	}
	return this;
};

/********** HTML content ***********/
Sprite3D.prototype.html = function(value) {
	if (arguments.length){
		this.domElement.innerHTML = value;
		return this;
	}else{
		return this.domElement.innerHTML;
	}
	return this;
};

/********** custom property setter ***********/
Sprite3D.prototype.set = function(name, value) {
	this[name] = value;
	return this;
};

/********** SpriteSheet system ***********/
Sprite3D.prototype.tileSize = function(width, height) {
	this.tileWidth = width;
	this.tileHeight = height;
	return this;
};
Sprite3D.prototype.tilePosition = function(tilePosX, tilePosY) {
	this._style.backgroundPosition = "-" + (tilePosX * this.tileWidth) + "px -" + (tilePosY * this.tileHeight) + "px";
	return this;
};

/**
 * Sets the order in which transformations are applied.
 * If true, rotations are applied before translations. If false, translations are applied before rotations.
 * Note that, when applying rotations, the axis of the object rotate, and subsequent translations follow the modified orientation of the axis.
 * For a more accurate control, you should use the transformString property.
 * @param {boolean} rf true to rotate first, false to translate first
 * @return {Sprite3D} The reference to this Sprite3D object
 */
Sprite3D.prototype.rotateFirst = function(rf) {
	this.rotateFirst = rf;
	if ( rf ) {	
		this._transformString = "_rx _ry _rz _p _s";
	} else {
		this._transformString = "_p _rz _ry _rx _s";
	}
	return this;
};

/************ Transform application **************/
Sprite3D.prototype.update = function() {
	this.__p = "translate3d(" + (this._px - this._ox) + "px," + (this._py - this._oy) + "px," + (this._pz - this._oz) + "px) ";
	this.__rx = "rotateX(" + this._rx + "deg) ";
	this.__ry = "rotateY(" + this._ry + "deg) ";
	this.__rz = "rotateZ(" + this._rz + "deg) ";
	this.__s = "scale3d(" + this._sx + ", " + this._sy + ", " + this._sz + ") ";

	//	var transformString = "_rx _ry _rz _p _s";
	this.__ts = this._transformString;
	this.__ts = this.__ts.replace( "_p", this.__p );
	this.__ts = this.__ts.replace( "_rx", this.__rx );
	this.__ts = this.__ts.replace( "_ry", this.__ry );
	this.__ts = this.__ts.replace( "_rz", this.__rz );
	this.__ts = this.__ts.replace( "_s", this.__s );
	this._style[this._transformProperty] = this.__ts;

	return this;
};
Sprite3D.prototype.update2D = function() {
	this.__p = "translate(" + (this._px - this._ox) + "px," + (this._py - this._oy) + "px) ";
	this.__rz = "rotate(" + this._rz + "deg) ";
	this.__s = "scale(" + this._sx + ", " + this._sy + ") ";

	this.__ts = this._transformString;
	this.__ts = this.__ts.replace( "_p", this.__p );
	this.__ts = this.__ts.replace( "_rx", "" );
	this.__ts = this.__ts.replace( "_ry", "" );
	this.__ts = this.__ts.replace( "_rz", this.__rz );
	this.__ts = this.__ts.replace( "_s", this.__s );
	this._style[this._transformProperty] = this.__ts;

	return this;
};
Sprite3D.prototype.updateWithChildren = function(recursive) {
	this.update();

	for (this.i = 0; this.i < this.numChildren; this.i++) {
		if (recursive) {
			this.children[this.i].updateWithChildren(recursive);
		} else {
			this.children[this.i].update();
		}
	}

	return this;
};

/************ Scenography **************/
Sprite3D.prototype.addChild = function(e) {
	this.numChildren = this.children.push(e);
	this.domElement.appendChild(e.domElement);
	return e;
};
Sprite3D.prototype.removeChild = function(child) {
	var n = this.children.indexOf(child);
	if (n > -1) {
		return this.removeChildAt(n);
	}
	return null;
};
Sprite3D.prototype.removeChildAt = function(n) {
	--this.numChildren;
	this.domElement.removeChild(this.children[n].domElement);
	return this.children.splice(n, 1)[0];
};
Sprite3D.prototype.findFromDOMElement = function(element) {
	for (this.i = 0; this.i < this.numChildren; this.i++) {
		if (element == this.children[this.i].domElement) { return this.children[this.i]; }
	}
	return null;
};

/************ Event handling **************/
Sprite3D.prototype.addEventListener = function(event,callback,capture) {
	var fname = event + "_" + callback.name;
	if ( this._listeners[fname] == null ) {
		var sprite = this;
		var fn = function(e) { callback(e,sprite); }
		this._listeners[fname] = fn;
		this.domElement.addEventListener(event,fn,capture);
	}
	return this;
};
Sprite3D.prototype.removeEventListener = function(event,callback,capture) {
	var fname = event + "_" + callback.name;
	if ( this._listeners[fname] != null ) {
		this.domElement.removeEventListener(event,this._listeners[fname],capture);
		delete this._listeners[fname];
	}
	return this;
};

/************ Helper functions [static] **************/
Sprite3D.stage = function(element) {
	if ( !Sprite3D.prototype._isInit ) Sprite3D.isSupported();
	
	var c,s;
	if (element){
		c = element;
		s = element.style;
		if(s.position == "static" ) s.position = "relative";
	} else {
		c = document.createElement("div");
		s = c.style;
		s[Sprite3D.prototype._browserPrefix+"PerspectiveOrigin"] = "0 0";
		s[Sprite3D.prototype._browserPrefix+"TransformOrigin"] = "0 0";
		s.position = "absolute";
		s.top = "50%";
		s.left = "50%";
		s.margin = "0px";
		s.padding = "0px";
		document.body.appendChild(c);
	}
	
	s[Sprite3D.prototype._browserPrefix+"Perspective"] = "800px";
	s[Sprite3D.prototype._browserPrefix+"Transform"] = "translateZ(0px)";
	s[Sprite3D.prototype._browserPrefix+"TransformStyle"] = "preserve-3d";

	return new Sprite3D(c);
};


/** Private static property. Used internally for browser checking. You should not change its value. */
Sprite3D.prototype._isInit = false;

/** Private static property. Used internally for cross-browser compatibility. You should not change its value. */
Sprite3D.prototype._transformProperty = "webkitTransform";

/** Private static property. Used internally for cross-browser compatibility. You should not change its value. */
Sprite3D.prototype._browserPrefix = "webkit";

/**
 * Test for CSS 3D transforms support in the current browser.
 * If 3D transforms are not supported, the update() method is replaced by the update2D() method,
 * providing an automatic fallback that might save some bits :)
 * @return {boolean} True if the 3D transforms are supported by the browser
 */
Sprite3D.isSupported = function() {
	var d = document.createElement("div"), 
			prefixes = ["", "webkit", "Moz", "o", "ms" ],
			n = prefixes.length, i;

	// check for 3D transforms
	for( i = 0; i < n; i++ ) {
		if ( ( prefixes[i] + "Perspective" ) in d.style ) {
			Sprite3D.prototype._transformProperty = prefixes[i] + "Transform";
			Sprite3D.prototype._isInit = true;
			Sprite3D.prototype._browserPrefix = prefixes[i];
			//console.log( "found support for 3D transforms using prefix: " + prefixes[i] );
			return true;
		}
	}

	// check for 2D transforms
	for( i = 0; i < n; i++ ) {
		if ( ( prefixes[i] + "Transform" ) in d.style ) {
			Sprite3D.prototype._transformProperty = prefixes[i] + "Transform";
			Sprite3D.prototype._isInit = true;
			Sprite3D.prototype._browserPrefix = prefixes[i];
			Sprite3D.prototype.update = Sprite3D.prototype.update2D;
			//console.log( "found support for 2D transforms using prefix: " + prefixes[i] );
			return false;
		}
	}
	//console.log( "no support for CSS transforms.");
	return false;
};
