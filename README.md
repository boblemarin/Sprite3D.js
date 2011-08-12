# Sprite3D.js

A simple javascript library to help making thing move in 3D space for webkit browser using CSS transforms.

* Created by : [boblemarin](http://github.com/boblemarin)
* Project's homepage : [minimal.be/lab/Sprite3D](http://minimal.be/lab/Sprite3D "Sprite3D.js, a javascript library for 3D positionning in WebKit")
* Feedback, suggestions, requests and more : [emeric@minimal.be](mailto:emeric@minimal.be)


## Overview

Sprite3D acts like a wrapper around HTML elements, helping to easily control their 3D-position using a simple Javascript syntax. When you create a Sprite object, you can supply an existing DOM object or let the library create an empty `<div>` (you can apply a CSS class to the DOM element after its creation).

As you manipulate "real" HTML elements, you don't need a `<canvas>` object (and its performance problems), nor a WebGL-enabled browser. And, as 3D transforms are hardware-accelerated, you can get a very decent framerate, even on (Apple's) mobile devices.

At this stage of development, 3D positioning is achieved via WebKit's CSS 3D transform, restricting the library usage to Chrome and Safari browsers, as well as iOS's Mobile Safari. However, due to its wrapping, non-intrusive nature, it allows for building semantically valid HTML pages, adding the animation layer afterwards, achieving a valuable progressive enhancement effect.

`Sprite3D.js` has no dependencies, so it can be easily integrated with other JS libs. We recommend using the requestAnimationFrame technique (when available) for a more browser-friendly result. In our examples, we have also been using [Grant Skinner's](http://github.com/gskinner) [Tween.js](http://github.com/gskinner/TweenJS) engine for handling some of the animations.


Check the provided examples for usage information.
