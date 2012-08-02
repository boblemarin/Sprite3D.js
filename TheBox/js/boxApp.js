(function(){
	var stage = Sprite3D.stage(),
		scene = stage.appendChild( Sprite3D.create() ),
		boxContainer,
		sw = window.innerWidth, 
		sh = window.innerHeight,
		px = -0.17849898580121704, 
		py = 0.4572815533980582,
		ppx = 0, 
		ppy = 0,
		cpx = -0.17849898580121704, 
		cpy = 0.4572815533980582,
		boxSize = 575,
		lastVache,
		cows = [],
		clouds = [],
		wind = 2,
		targetWind = 2,
		touched = false,
		touchID = -1,
		helix,
		touhedObject,
		ufo,
		uforx = 0,
		ufosx = .12,
		lastFrame,
		invite,
		boxTop;

	// TOUCH LISTENERS ///////////////////////////////////
	var onTouchStart = function(e) {
		if ( !touched ) {
			var t = e.changedTouches[0];
			ppx = ( t.pageX / sw ) - .5;
			ppy = ( t.pageY / sh ) - .5;
			touched = true;
			touchID = t.identifier;
		}
		e.preventDefault();
	}

	var onTouchMove = function(e) {
		if ( touched ) {
			var ts = e.changedTouches,
				nt = ts.length;
			while(nt--) {
				var t = e.changedTouches[nt];
				if ( t.identifier == touchID ) {
					var tx = ( t.pageX / sw ) - .5,
						ty = ( t.pageY / sh ) - .5;
					px -= tx - ppx;
					py -= ty - ppy;
					ppx = tx;
					ppy = ty;
					if ( px < -.5 ) px = -.5;
					if ( px > .5 ) px = .5;
					if ( py < -.5 ) py = -.5;
					if ( py > .5 ) py = .5;
					break;
				}
			}
		}
		e.preventDefault();
	}

	var onTouchEnd = function(e) {
		if ( touched ) {
			invite.className = "off";
			var ts = e.changedTouches,
				nt = ts.length;
			while(nt--) {
				var t = e.changedTouches[nt];
				if ( t.identifier == touchID ) {
					touched = false;
					touchID = -1;
					break;
				}
			}
		}
		e.preventDefault();
	}


	// MOUSE LISTENERS ///////////////////////////////////

	var onMouseDown = function( e ) {
		if ( !touched ) {
			ppx = ( e.pageX / sw ) - .5;
			ppy = ( e.pageY / sh ) - .5;
			touched = true;
		}
		e.preventDefault();
	}

	var onMouseMove = function( e ) {
		if ( touched ) {
			var tx = ( e.pageX / sw ) - .5,
				ty = ( e.pageY / sh ) - .5;
			px -= tx - ppx;
			py -= ty - ppy;
			ppx = tx;
			ppy = ty;
			if ( px < -.5 ) px = -.5;
			if ( px > .5 ) px = .5;
			if ( py < -.5 ) py = -.5;
			if ( py > .5 ) py = .5;
		}
		e.preventDefault();
	}

	var onMouseUp = function(e) {
		invite.className = "off";
		touched = false;
		e.preventDefault();
	}


	// WINDOW LISTENERS ///////////////////////////////////

	var onResize = function(e) {
		sw = window.innerWidth;
		sh = window.innerHeight;
		var s = Math.min( sw, sh ) / 768.0;
		stage.scale( s, s, s ).update();
	}

	var onOrientation = function(e) {
		window.scrollTo( 0, 0 );
	}


	// OBJECTS LISTENERS ///////////////////////////////////

	var activateVache = function(vache) {
		if ( lastVache ) 
			lastVache
				.scale( lastVache.flipped?-1:1, 1, 1 )
				.update();
		lastVache = vache;
	}

	var onVacheTouch = function(e) {
		// move
		var sprite = this,
			x = sprite.x() + (Math.round(Math.random())*2-1) * 50,
			y = sprite.y() + (Math.round(Math.random())*2-1) * 50,
			flipped = sprite.flipped;
		// limit
		if ( x < 50 ) x = 50;
		if ( x > boxSize-50 ) x = boxSize - 50;
		if ( y < 80 ) y = 80;
		if ( y > boxSize-50 ) y = boxSize - 50;
		// move
		sprite
			.position( x, y, 0 )
			.rotation( -90, (x/boxSize-.5) * 45, 0 )
			.set( "flipped", flipped )
			//.setScale( flipped?-1+Math.random()*.3:1+Math.random()*.3, 1+Math.random()*.3, 1 )
			.update();
				
	//	activateVache(sprite);
		e.preventDefault();
		e.stopImmediatePropagation();
	}

	var onVacheOver = function(e) {
		activateVache(this);
	}

	var onVacheOut = function(e) {
		
	}

	var onHelixClick = function(e) {
		if ( targetWind == 0 ) {
			targetWind = 1 + Math.random()*7;
		} else {
			targetWind = 0;
		}
		e.preventDefault();
		e.stopImmediatePropagation();
	}

	var onSunClick = function(e) {
		this
			.position( boxSize * Math.random(), -250, 360 )
			.rotation( -90, this.rotationY()+180, 0 )
			.update();
		e.preventDefault();
		e.stopImmediatePropagation();
	}

	// ANIMATION LOOP ///////////////////////////////////

	var animate = function() {
		requestAnimationFrame( animate );
		move();
	}

	var move = function() {
		cpx += (px-cpx) * .1;
		cpy += (py-cpy) * .1;
		boxContainer
			.position( cpx*100, 230+cpy*50, -cpy*600-150)
			.rotation( 70 + cpy * 50, 0, cpx * 210 )
			.update();
	
		wind += (targetWind-wind) * .01;
		
		helix.rotate(0,0,wind).update();
	
		var n = clouds.length,
			c, cx;
		
		while(n--) {
			c = clouds[n];
			cx = c.x();
			if ( cx < -290 ) {
				cx = -290-cx;
				c.z( c.targetZ + cx*cx*.1 );
			} else if ( cx > boxSize+290 ) {
				cx = cx - (boxSize+290);
				c.z( c.targetZ + cx*cx*.1 );
				if ( cx > 110 ) {
					c.targetY = (Math.random()*1.4-.4)*boxSize;
					c.targetZ = Math.random()*190+300;
					c.position(-400 - Math.random()*400, c.targetY, 3000 );
				}
			}
			c.move(wind,0,0).update();
		}
	}



	// HELPER FUNCTIONS ///////////////////////////////////

	var addBoxSide = function( id, px, py, r ) {
		boxContainer.appendChild(
			Sprite3D.create(".boxSide")
				.set("id",id)
				.transformOrigin( 0, 0 )
				.transformString( "p rx rz ry s" )
				.position( px, py, 231 )
				.rotation( -90, r, 0 )
				.update()
		);
	}
	
	
	
	
	// OBJECT CREATION, PROCESS INIT ///////////////////////////////////
	
	invite = document.createElement("div");
	invite.id = "invite";
	document.body.appendChild(invite);
 
	// BOX //
	boxContainer = stage.appendChild( 
		Sprite3D.create("boxContainer")
			.origin( 640, 640 )
			.position( 0,200,-600)
			.rotation( 70,0,0 )
			.transformString( "p rx rz ry s" )
			.update()
	);
	boxTop = boxContainer.appendChild(
		Sprite3D.create("boxTop")
			.position( 358, 362, 231 )
			.update()
	);
	// BOX SIDES //
	addBoxSide( "boxSide1", 358, 937, 0 );
	addBoxSide( "boxSide2", 358, 362, 270 );
	addBoxSide( "boxSide3", 933, 362, 180 );
	addBoxSide( "boxSide4", 933, 937, 90 );

	// COWS //
	for( var i = 0; i < 5; i++ ) {
		var x = (Math.random()*.8+.1),
			flipped = Math.random()>.5;
			
		cows.push( boxTop.appendChild( 
			Sprite3D.create(".vache"+Math.ceil(Math.random()*3))
				.origin( 38, 78 )
				.transformOrigin(38, 78 )
				.position( x*boxSize, (Math.random()*.8+.1)*boxSize, 0 )
				.rotation( -90, (x-.5) * 45, 0 )
				.set( "flipped", flipped )
				.bind( { mouseover: onVacheTouch, touchstart: onVacheTouch })
				.update()
		) );
	}

	// BANNER //
	boxTop.appendChild( 
		Sprite3D.create("banner")
			.origin( 0, 332 )
			.transformOrigin( 0, 332 )
			.position( 10, 60, 0 )
			.rotation( -90, .4, 0 )
			.update()
	);

	// SUN //
	boxTop.appendChild( 
		Sprite3D.create("sun")
			.transformString( "p rx rz ry s" )
			.origin( 125, 750-136 )
			.transformOrigin( 125, 750-136 )
			.position( boxSize * .92, -250, 360 )
			.rotation( -90, -2, 0 )
			.bind( { mouseover: onSunClick, touchstart: onSunClick })
			.update()
	);

	// CLOUD //
	var cloudY, cloudZ;
	for( var i = 0; i < 7; i++ ) {
		cloudY = (Math.random()*1.4-.4)*boxSize;
		cloudZ = Math.random()*190+300;
		clouds.push( boxTop.appendChild( 
			Sprite3D.create(".cloud"+Math.ceil(Math.random()*3))
				.transformString( "p rx rz ry s" )
				.transformOrigin( 62, 750-40 )
				.origin( 62, 750-40 )
				.position( (Math.random()*1.4-.2)*boxSize, cloudY, cloudZ )
				.rotation( -90, -Math.random()*10-5, 0 )
				.set( "targetY", cloudY )
				.set( "targetZ", cloudZ )
				.update()
		) );
	
	}

	// MOULIN //
	var moulin = boxTop.appendChild( 
		Sprite3D.create("moulin")
			.origin( 60, 201 )
			.transformOrigin( 60, 201 )
			.position( 90, 380, 0 )
			.rotation( -90, 20, 0 )
			.update()
	);

	helix = moulin.appendChild( 
		Sprite3D.create("helix")
			.origin( 89, 93 )
			.transformOrigin( 89, 93 )
			.position( 60, 80, 5 )
			.bind( { mousedown: onHelixClick, touchstart: onHelixClick })
			.update()
	);

	// UFO //
	boxTop.appendChild( 
		Sprite3D.create("ufo")
			.transformString( "p rx rz ry s" )
			.origin( 61, 750-50 )
			.transformOrigin( 61, 0)
			.position( boxSize>>1, boxSize>>1, 800 )
			.rotation( -90, -2, 0 )
			.update()
	);


	// mouse listeners
	document.addEventListener( "mousedown", onMouseDown, false );
	document.addEventListener( "mousemove", onMouseMove, false );
	document.addEventListener( "mouseup", onMouseUp, false );
	// touch listeners
	document.addEventListener( "touchstart", onTouchStart, false );
	document.addEventListener( "touchmove", onTouchMove, false );
	document.addEventListener( "touchend", onTouchEnd, false );
	// window listeners
	window.addEventListener( "resize", onResize, false );
	window.addEventListener( "deviceorientation", onOrientation, false );
	onResize();

	// animate
	//setInterval( move, 1000 / 50 );
	lastFrame = new Date().getTime();
	animate();
})();