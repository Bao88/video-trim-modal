/******/
(function (modules) { // webpackBootstrap
    /******/ 	// The module cache
    /******/
    var installedModules = {};
    /******/
    /******/ 	// The require function
    /******/
    function __webpack_require__(moduleId) {
        /******/
        /******/ 		// Check if module is in cache
        /******/
        if (installedModules[moduleId]) {
            /******/
            return installedModules[moduleId].exports;
            /******/
        }
        /******/ 		// Create a new module (and put it into the cache)
        /******/
        var module = installedModules[moduleId] = {
            /******/            i: moduleId,
            /******/            l: false,
            /******/            exports: {}
            /******/
        };
        /******/
        /******/ 		// Execute the module function
        /******/
        modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
        /******/
        /******/ 		// Flag the module as loaded
        /******/
        module.l = true;
        /******/
        /******/ 		// Return the exports of the module
        /******/
        return module.exports;
        /******/
    }

    /******/
    /******/
    /******/ 	// expose the modules object (__webpack_modules__)
    /******/
    __webpack_require__.m = modules;
    /******/
    /******/ 	// expose the module cache
    /******/
    __webpack_require__.c = installedModules;
    /******/
    /******/ 	// identity function for calling harmony imports with the correct context
    /******/
    __webpack_require__.i = function (value) {
        return value;
    };
    /******/
    /******/ 	// define getter function for harmony exports
    /******/
    __webpack_require__.d = function (exports, name, getter) {
        /******/
        if (!__webpack_require__.o(exports, name)) {
            /******/
            Object.defineProperty(exports, name, {
                /******/                configurable: false,
                /******/                enumerable: true,
                /******/                get: getter
                /******/
            });
            /******/
        }
        /******/
    };
    /******/
    /******/ 	// getDefaultExport function for compatibility with non-harmony modules
    /******/
    __webpack_require__.n = function (module) {
        /******/
        var getter = module && module.__esModule ?
            /******/            function getDefault() {
                return module['default'];
            } :
            /******/            function getModuleExports() {
                return module;
            };
        /******/
        __webpack_require__.d(getter, 'a', getter);
        /******/
        return getter;
        /******/
    };
    /******/
    /******/ 	// Object.prototype.hasOwnProperty.call
    /******/
    __webpack_require__.o = function (object, property) {
        return Object.prototype.hasOwnProperty.call(object, property);
    };
    /******/
    /******/ 	// __webpack_public_path__
    /******/
    __webpack_require__.p = "";
    /******/
    /******/ 	// Load entry module and return exports
    /******/
    return __webpack_require__(__webpack_require__.s = 6);
    /******/
})
/************************************************************************/
/******/([
    /* 0 */
    /***/ (function (module, exports, __webpack_require__) {

        var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
        /*! nouislider - 10.1.0 - 2017-07-28 17:11:18 */

        (function (factory) {

            if (true) {

                // AMD. Register as an anonymous module.
                !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
                    __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
                        (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
                __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

            } else if (typeof exports === 'object') {

                // Node/CommonJS
                module.exports = factory();

            } else {

                // Browser globals
                window.noUiSlider = factory();
            }

        }(function () {

            'use strict';

            var VERSION = '10.1.0';


            function isValidFormatter(entry) {
                return typeof entry === 'object' && typeof entry.to === 'function' && typeof entry.from === 'function';
            }

            function removeElement(el) {
                el.parentElement.removeChild(el);
            }

            // Bindable version
            function preventDefault(e) {
                e.preventDefault();
            }

            // Removes duplicates from an array.
            function unique(array) {
                return array.filter(function (a) {
                    return !this[a] ? this[a] = true : false;
                }, {});
            }

            // Round a value to the closest 'to'.
            function closest(value, to) {
                return Math.round(value / to) * to;
            }

            // Current position of an element relative to the document.
            function offset(elem, orientation) {

                var rect = elem.getBoundingClientRect();
                var doc = elem.ownerDocument;
                var docElem = doc.documentElement;
                var pageOffset = getPageOffset(doc);

                // getBoundingClientRect contains left scroll in Chrome on Android.
                // I haven't found a feature detection that proves this. Worst case
                // scenario on mis-match: the 'tap' feature on horizontal sliders breaks.
                if (/webkit.*Chrome.*Mobile/i.test(navigator.userAgent)) {
                    pageOffset.x = 0;
                }

                return orientation ? (rect.top + pageOffset.y - docElem.clientTop) : (rect.left + pageOffset.x - docElem.clientLeft);
            }

            // Checks whether a value is numerical.
            function isNumeric(a) {
                return typeof a === 'number' && !isNaN(a) && isFinite(a);
            }

            // Sets a class and removes it after [duration] ms.
            function addClassFor(element, className, duration) {
                if (duration > 0) {
                    addClass(element, className);
                    setTimeout(function () {
                        removeClass(element, className);
                    }, duration);
                }
            }

            // Limits a value to 0 - 100
            function limit(a) {
                return Math.max(Math.min(a, 100), 0);
            }

            // Wraps a variable as an array, if it isn't one yet.
            // Note that an input array is returned by reference!
            function asArray(a) {
                return Array.isArray(a) ? a : [a];
            }

            // Counts decimals
            function countDecimals(numStr) {
                numStr = String(numStr);
                var pieces = numStr.split(".");
                return pieces.length > 1 ? pieces[1].length : 0;
            }

            // http://youmightnotneedjquery.com/#add_class
            function addClass(el, className) {
                if (el.classList) {
                    el.classList.add(className);
                } else {
                    el.className += ' ' + className;
                }
            }

            // http://youmightnotneedjquery.com/#remove_class
            function removeClass(el, className) {
                if (el.classList) {
                    el.classList.remove(className);
                } else {
                    el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
                }
            }

            // https://plainjs.com/javascript/attributes/adding-removing-and-testing-for-classes-9/
            function hasClass(el, className) {
                return el.classList ? el.classList.contains(className) : new RegExp('\\b' + className + '\\b').test(el.className);
            }

            // https://developer.mozilla.org/en-US/docs/Web/API/Window/scrollY#Notes
            function getPageOffset(doc) {

                var supportPageOffset = window.pageXOffset !== undefined;
                var isCSS1Compat = ((doc.compatMode || "") === "CSS1Compat");
                var x = supportPageOffset ? window.pageXOffset : isCSS1Compat ? doc.documentElement.scrollLeft : doc.body.scrollLeft;
                var y = supportPageOffset ? window.pageYOffset : isCSS1Compat ? doc.documentElement.scrollTop : doc.body.scrollTop;

                return {
                    x: x,
                    y: y
                };
            }

            // we provide a function to compute constants instead
            // of accessing window.* as soon as the module needs it
            // so that we do not compute anything if not needed
            function getActions() {

                // Determine the events to bind. IE11 implements pointerEvents without
                // a prefix, which breaks compatibility with the IE10 implementation.
                return window.navigator.pointerEnabled ? {
                    start: 'pointerdown',
                    move: 'pointermove',
                    end: 'pointerup'
                } : window.navigator.msPointerEnabled ? {
                    start: 'MSPointerDown',
                    move: 'MSPointerMove',
                    end: 'MSPointerUp'
                } : {
                    start: 'mousedown touchstart',
                    move: 'mousemove touchmove',
                    end: 'mouseup touchend'
                };
            }

            // https://github.com/WICG/EventListenerOptions/blob/gh-pages/explainer.md
            // Issue #785
            function getSupportsPassive() {

                var supportsPassive = false;

                try {

                    var opts = Object.defineProperty({}, 'passive', {
                        get: function () {
                            supportsPassive = true;
                        }
                    });

                    window.addEventListener('test', null, opts);

                } catch (e) {
                }

                return supportsPassive;
            }

            function getSupportsTouchActionNone() {
                return window.CSS && CSS.supports && CSS.supports('touch-action', 'none');
            }


// Value calculation

            // Determine the size of a sub-range in relation to a full range.
            function subRangeRatio(pa, pb) {
                return (100 / (pb - pa));
            }

            // (percentage) How many percent is this value of this range?
            function fromPercentage(range, value) {
                return (value * 100) / ( range[1] - range[0] );
            }

            // (percentage) Where is this value on this range?
            function toPercentage(range, value) {
                return fromPercentage(range, range[0] < 0 ?
                    value + Math.abs(range[0]) :
                    value - range[0]);
            }

            // (value) How much is this percentage on this range?
            function isPercentage(range, value) {
                return ((value * ( range[1] - range[0] )) / 100) + range[0];
            }


// Range conversion

            function getJ(value, arr) {

                var j = 1;

                while (value >= arr[j]) {
                    j += 1;
                }

                return j;
            }

            // (percentage) Input a value, find where, on a scale of 0-100, it applies.
            function toStepping(xVal, xPct, value) {

                if (value >= xVal.slice(-1)[0]) {
                    return 100;
                }

                var j = getJ(value, xVal), va, vb, pa, pb;

                va = xVal[j - 1];
                vb = xVal[j];
                pa = xPct[j - 1];
                pb = xPct[j];

                return pa + (toPercentage([va, vb], value) / subRangeRatio(pa, pb));
            }

            // (value) Input a percentage, find where it is on the specified range.
            function fromStepping(xVal, xPct, value) {

                // There is no range group that fits 100
                if (value >= 100) {
                    return xVal.slice(-1)[0];
                }

                var j = getJ(value, xPct), va, vb, pa, pb;

                va = xVal[j - 1];
                vb = xVal[j];
                pa = xPct[j - 1];
                pb = xPct[j];

                return isPercentage([va, vb], (value - pa) * subRangeRatio(pa, pb));
            }

            // (percentage) Get the step that applies at a certain value.
            function getStep(xPct, xSteps, snap, value) {

                if (value === 100) {
                    return value;
                }

                var j = getJ(value, xPct), a, b;

                // If 'snap' is set, steps are used as fixed points on the slider.
                if (snap) {

                    a = xPct[j - 1];
                    b = xPct[j];

                    // Find the closest position, a or b.
                    if ((value - a) > ((b - a) / 2)) {
                        return b;
                    }

                    return a;
                }

                if (!xSteps[j - 1]) {
                    return value;
                }

                return xPct[j - 1] + closest(
                    value - xPct[j - 1],
                    xSteps[j - 1]
                );
            }


// Entry parsing

            function handleEntryPoint(index, value, that) {

                var percentage;

                // Wrap numerical input in an array.
                if (typeof value === "number") {
                    value = [value];
                }

                // Reject any invalid input, by testing whether value is an array.
                if (Object.prototype.toString.call(value) !== '[object Array]') {
                    throw new Error("noUiSlider (" + VERSION + "): 'range' contains invalid value.");
                }

                // Covert min/max syntax to 0 and 100.
                if (index === 'min') {
                    percentage = 0;
                } else if (index === 'max') {
                    percentage = 100;
                } else {
                    percentage = parseFloat(index);
                }

                // Check for correct input.
                if (!isNumeric(percentage) || !isNumeric(value[0])) {
                    throw new Error("noUiSlider (" + VERSION + "): 'range' value isn't numeric.");
                }

                // Store values.
                that.xPct.push(percentage);
                that.xVal.push(value[0]);

                // NaN will evaluate to false too, but to keep
                // logging clear, set step explicitly. Make sure
                // not to override the 'step' setting with false.
                if (!percentage) {
                    if (!isNaN(value[1])) {
                        that.xSteps[0] = value[1];
                    }
                } else {
                    that.xSteps.push(isNaN(value[1]) ? false : value[1]);
                }

                that.xHighestCompleteStep.push(0);
            }

            function handleStepPoint(i, n, that) {

                // Ignore 'false' stepping.
                if (!n) {
                    return true;
                }

                // Factor to range ratio
                that.xSteps[i] = fromPercentage([
                    that.xVal[i]
                    , that.xVal[i + 1]
                ], n) / subRangeRatio(
                    that.xPct[i],
                    that.xPct[i + 1]);

                var totalSteps = (that.xVal[i + 1] - that.xVal[i]) / that.xNumSteps[i];
                var highestStep = Math.ceil(Number(totalSteps.toFixed(3)) - 1);
                var step = that.xVal[i] + (that.xNumSteps[i] * highestStep);

                that.xHighestCompleteStep[i] = step;
            }


// Interface

            function Spectrum(entry, snap, singleStep) {

                this.xPct = [];
                this.xVal = [];
                this.xSteps = [singleStep || false];
                this.xNumSteps = [false];
                this.xHighestCompleteStep = [];

                this.snap = snap;

                var index, ordered = [/* [0, 'min'], [1, '50%'], [2, 'max'] */];

                // Map the object keys to an array.
                for (index in entry) {
                    if (entry.hasOwnProperty(index)) {
                        ordered.push([entry[index], index]);
                    }
                }

                // Sort all entries by value (numeric sort).
                if (ordered.length && typeof ordered[0][0] === "object") {
                    ordered.sort(function (a, b) {
                        return a[0][0] - b[0][0];
                    });
                } else {
                    ordered.sort(function (a, b) {
                        return a[0] - b[0];
                    });
                }


                // Convert all entries to subranges.
                for (index = 0; index < ordered.length; index++) {
                    handleEntryPoint(ordered[index][1], ordered[index][0], this);
                }

                // Store the actual step values.
                // xSteps is sorted in the same order as xPct and xVal.
                this.xNumSteps = this.xSteps.slice(0);

                // Convert all numeric steps to the percentage of the subrange they represent.
                for (index = 0; index < this.xNumSteps.length; index++) {
                    handleStepPoint(index, this.xNumSteps[index], this);
                }
            }

            Spectrum.prototype.getMargin = function (value) {

                var step = this.xNumSteps[0];

                if (step && ((value / step) % 1) !== 0) {
                    throw new Error("noUiSlider (" + VERSION + "): 'limit', 'margin' and 'padding' must be divisible by step.");
                }

                return this.xPct.length === 2 ? fromPercentage(this.xVal, value) : false;
            };

            Spectrum.prototype.toStepping = function (value) {

                value = toStepping(this.xVal, this.xPct, value);

                return value;
            };

            Spectrum.prototype.fromStepping = function (value) {

                return fromStepping(this.xVal, this.xPct, value);
            };

            Spectrum.prototype.getStep = function (value) {

                value = getStep(this.xPct, this.xSteps, this.snap, value);

                return value;
            };

            Spectrum.prototype.getNearbySteps = function (value) {

                var j = getJ(value, this.xPct);

                return {
                    stepBefore: {startValue: this.xVal[j - 2], step: this.xNumSteps[j - 2], highestStep: this.xHighestCompleteStep[j - 2]},
                    thisStep: {startValue: this.xVal[j - 1], step: this.xNumSteps[j - 1], highestStep: this.xHighestCompleteStep[j - 1]},
                    stepAfter: {startValue: this.xVal[j - 0], step: this.xNumSteps[j - 0], highestStep: this.xHighestCompleteStep[j - 0]}
                };
            };

            Spectrum.prototype.countStepDecimals = function () {
                var stepDecimals = this.xNumSteps.map(countDecimals);
                return Math.max.apply(null, stepDecimals);
            };

            // Outside testing
            Spectrum.prototype.convert = function (value) {
                return this.getStep(this.toStepping(value));
            };

            /*	Every input option is tested and parsed. This'll prevent
	endless validation in internal methods. These tests are
	structured with an item for every option available. An
	option can be marked as required by setting the 'r' flag.
	The testing function is provided with three arguments:
		- The provided value for the option;
		- A reference to the options object;
		- The name for the option;

	The testing function returns false when an error is detected,
	or true when everything is OK. It can also modify the option
	object, to make sure all values can be correctly looped elsewhere. */

            var defaultFormatter = {
                'to': function (value) {
                    return value !== undefined && value.toFixed(2);
                }, 'from': Number
            };

            function validateFormat(entry) {

                // Any object with a to and from method is supported.
                if (isValidFormatter(entry)) {
                    return true;
                }

                throw new Error("noUiSlider (" + VERSION + "): 'format' requires 'to' and 'from' methods.");
            }

            function testStep(parsed, entry) {

                if (!isNumeric(entry)) {
                    throw new Error("noUiSlider (" + VERSION + "): 'step' is not numeric.");
                }

                // The step option can still be used to set stepping
                // for linear sliders. Overwritten if set in 'range'.
                parsed.singleStep = entry;
            }

            function testRange(parsed, entry) {

                // Filter incorrect input.
                if (typeof entry !== 'object' || Array.isArray(entry)) {
                    throw new Error("noUiSlider (" + VERSION + "): 'range' is not an object.");
                }

                // Catch missing start or end.
                if (entry.min === undefined || entry.max === undefined) {
                    throw new Error("noUiSlider (" + VERSION + "): Missing 'min' or 'max' in 'range'.");
                }

                // Catch equal start or end.
                if (entry.min === entry.max) {
                    throw new Error("noUiSlider (" + VERSION + "): 'range' 'min' and 'max' cannot be equal.");
                }

                parsed.spectrum = new Spectrum(entry, parsed.snap, parsed.singleStep);
            }

            function testStart(parsed, entry) {

                entry = asArray(entry);

                // Validate input. Values aren't tested, as the public .val method
                // will always provide a valid location.
                if (!Array.isArray(entry) || !entry.length) {
                    throw new Error("noUiSlider (" + VERSION + "): 'start' option is incorrect.");
                }

                // Store the number of handles.
                parsed.handles = entry.length;

                // When the slider is initialized, the .val method will
                // be called with the start options.
                parsed.start = entry;
            }

            function testSnap(parsed, entry) {

                // Enforce 100% stepping within subranges.
                parsed.snap = entry;

                if (typeof entry !== 'boolean') {
                    throw new Error("noUiSlider (" + VERSION + "): 'snap' option must be a boolean.");
                }
            }

            function testAnimate(parsed, entry) {

                // Enforce 100% stepping within subranges.
                parsed.animate = entry;

                if (typeof entry !== 'boolean') {
                    throw new Error("noUiSlider (" + VERSION + "): 'animate' option must be a boolean.");
                }
            }

            function testAnimationDuration(parsed, entry) {

                parsed.animationDuration = entry;

                if (typeof entry !== 'number') {
                    throw new Error("noUiSlider (" + VERSION + "): 'animationDuration' option must be a number.");
                }
            }

            function testConnect(parsed, entry) {

                var connect = [false];
                var i;

                // Map legacy options
                if (entry === 'lower') {
                    entry = [true, false];
                }

                else if (entry === 'upper') {
                    entry = [false, true];
                }

                // Handle boolean options
                if (entry === true || entry === false) {

                    for (i = 1; i < parsed.handles; i++) {
                        connect.push(entry);
                    }

                    connect.push(false);
                }

                // Reject invalid input
                else if (!Array.isArray(entry) || !entry.length || entry.length !== parsed.handles + 1) {
                    throw new Error("noUiSlider (" + VERSION + "): 'connect' option doesn't match handle count.");
                }

                else {
                    connect = entry;
                }

                parsed.connect = connect;
            }

            function testOrientation(parsed, entry) {

                // Set orientation to an a numerical value for easy
                // array selection.
                switch (entry) {
                    case 'horizontal':
                        parsed.ort = 0;
                        break;
                    case 'vertical':
                        parsed.ort = 1;
                        break;
                    default:
                        throw new Error("noUiSlider (" + VERSION + "): 'orientation' option is invalid.");
                }
            }

            function testMargin(parsed, entry) {

                if (!isNumeric(entry)) {
                    throw new Error("noUiSlider (" + VERSION + "): 'margin' option must be numeric.");
                }

                // Issue #582
                if (entry === 0) {
                    return;
                }

                parsed.margin = parsed.spectrum.getMargin(entry);

                if (!parsed.margin) {
                    throw new Error("noUiSlider (" + VERSION + "): 'margin' option is only supported on linear sliders.");
                }
            }

            function testLimit(parsed, entry) {

                if (!isNumeric(entry)) {
                    throw new Error("noUiSlider (" + VERSION + "): 'limit' option must be numeric.");
                }

                parsed.limit = parsed.spectrum.getMargin(entry);

                if (!parsed.limit || parsed.handles < 2) {
                    throw new Error("noUiSlider (" + VERSION + "): 'limit' option is only supported on linear sliders with 2 or more handles.");
                }
            }

            function testPadding(parsed, entry) {

                if (!isNumeric(entry)) {
                    throw new Error("noUiSlider (" + VERSION + "): 'padding' option must be numeric.");
                }

                if (entry === 0) {
                    return;
                }

                parsed.padding = parsed.spectrum.getMargin(entry);

                if (!parsed.padding) {
                    throw new Error("noUiSlider (" + VERSION + "): 'padding' option is only supported on linear sliders.");
                }

                if (parsed.padding < 0) {
                    throw new Error("noUiSlider (" + VERSION + "): 'padding' option must be a positive number.");
                }

                if (parsed.padding >= 50) {
                    throw new Error("noUiSlider (" + VERSION + "): 'padding' option must be less than half the range.");
                }
            }

            function testDirection(parsed, entry) {

                // Set direction as a numerical value for easy parsing.
                // Invert connection for RTL sliders, so that the proper
                // handles get the connect/background classes.
                switch (entry) {
                    case 'ltr':
                        parsed.dir = 0;
                        break;
                    case 'rtl':
                        parsed.dir = 1;
                        break;
                    default:
                        throw new Error("noUiSlider (" + VERSION + "): 'direction' option was not recognized.");
                }
            }

            function testBehaviour(parsed, entry) {

                // Make sure the input is a string.
                if (typeof entry !== 'string') {
                    throw new Error("noUiSlider (" + VERSION + "): 'behaviour' must be a string containing options.");
                }

                // Check if the string contains any keywords.
                // None are required.
                var tap = entry.indexOf('tap') >= 0;
                var drag = entry.indexOf('drag') >= 0;
                var fixed = entry.indexOf('fixed') >= 0;
                var snap = entry.indexOf('snap') >= 0;
                var hover = entry.indexOf('hover') >= 0;

                if (fixed) {

                    if (parsed.handles !== 2) {
                        throw new Error("noUiSlider (" + VERSION + "): 'fixed' behaviour must be used with 2 handles");
                    }

                    // Use margin to enforce fixed state
                    testMargin(parsed, parsed.start[1] - parsed.start[0]);
                }

                parsed.events = {
                    tap: tap || snap,
                    drag: drag,
                    fixed: fixed,
                    snap: snap,
                    hover: hover
                };
            }

            function testMultitouch(parsed, entry) {
                parsed.multitouch = entry;

                if (typeof entry !== 'boolean') {
                    throw new Error("noUiSlider (" + VERSION + "): 'multitouch' option must be a boolean.");
                }
            }

            function testTooltips(parsed, entry) {

                if (entry === false) {
                    return;
                }

                else if (entry === true) {

                    parsed.tooltips = [];

                    for (var i = 0; i < parsed.handles; i++) {
                        parsed.tooltips.push(true);
                    }
                }

                else {

                    parsed.tooltips = asArray(entry);

                    if (parsed.tooltips.length !== parsed.handles) {
                        throw new Error("noUiSlider (" + VERSION + "): must pass a formatter for all handles.");
                    }

                    parsed.tooltips.forEach(function (formatter) {
                        if (typeof formatter !== 'boolean' && (typeof formatter !== 'object' || typeof formatter.to !== 'function')) {
                            throw new Error("noUiSlider (" + VERSION + "): 'tooltips' must be passed a formatter or 'false'.");
                        }
                    });
                }
            }

            function testAriaFormat(parsed, entry) {
                parsed.ariaFormat = entry;
                validateFormat(entry);
            }

            function testFormat(parsed, entry) {
                parsed.format = entry;
                validateFormat(entry);
            }

            function testCssPrefix(parsed, entry) {

                if (entry !== undefined && typeof entry !== 'string' && entry !== false) {
                    throw new Error("noUiSlider (" + VERSION + "): 'cssPrefix' must be a string or `false`.");
                }

                parsed.cssPrefix = entry;
            }

            function testCssClasses(parsed, entry) {

                if (entry !== undefined && typeof entry !== 'object') {
                    throw new Error("noUiSlider (" + VERSION + "): 'cssClasses' must be an object.");
                }

                if (typeof parsed.cssPrefix === 'string') {
                    parsed.cssClasses = {};

                    for (var key in entry) {
                        if (!entry.hasOwnProperty(key)) {
                            continue;
                        }

                        parsed.cssClasses[key] = parsed.cssPrefix + entry[key];
                    }
                } else {
                    parsed.cssClasses = entry;
                }
            }

            function testUseRaf(parsed, entry) {
                if (entry === true || entry === false) {
                    parsed.useRequestAnimationFrame = entry;
                } else {
                    throw new Error("noUiSlider (" + VERSION + "): 'useRequestAnimationFrame' option should be true (default) or false.");
                }
            }

            // Test all developer settings and parse to assumption-safe values.
            function testOptions(options) {

                // To prove a fix for #537, freeze options here.
                // If the object is modified, an error will be thrown.
                // Object.freeze(options);

                var parsed = {
                    margin: 0,
                    limit: 0,
                    padding: 0,
                    animate: true,
                    animationDuration: 300,
                    ariaFormat: defaultFormatter,
                    format: defaultFormatter
                };

                // Tests are executed in the order they are presented here.
                var tests = {
                    'step': {r: false, t: testStep},
                    'start': {r: true, t: testStart},
                    'connect': {r: true, t: testConnect},
                    'direction': {r: true, t: testDirection},
                    'snap': {r: false, t: testSnap},
                    'animate': {r: false, t: testAnimate},
                    'animationDuration': {r: false, t: testAnimationDuration},
                    'range': {r: true, t: testRange},
                    'orientation': {r: false, t: testOrientation},
                    'margin': {r: false, t: testMargin},
                    'limit': {r: false, t: testLimit},
                    'padding': {r: false, t: testPadding},
                    'behaviour': {r: true, t: testBehaviour},
                    'multitouch': {r: true, t: testMultitouch},
                    'ariaFormat': {r: false, t: testAriaFormat},
                    'format': {r: false, t: testFormat},
                    'tooltips': {r: false, t: testTooltips},
                    'cssPrefix': {r: false, t: testCssPrefix},
                    'cssClasses': {r: false, t: testCssClasses},
                    'useRequestAnimationFrame': {r: false, t: testUseRaf}
                };

                var defaults = {
                    'connect': false,
                    'direction': 'ltr',
                    'behaviour': 'tap',
                    'multitouch': false,
                    'orientation': 'horizontal',
                    'cssPrefix': 'noUi-',
                    'cssClasses': {
                        target: 'target',
                        base: 'base',
                        origin: 'origin',
                        handle: 'handle',
                        handleLower: 'handle-lower',
                        handleUpper: 'handle-upper',
                        horizontal: 'horizontal',
                        vertical: 'vertical',
                        background: 'background',
                        connect: 'connect',
                        ltr: 'ltr',
                        rtl: 'rtl',
                        draggable: 'draggable',
                        drag: 'state-drag',
                        tap: 'state-tap',
                        active: 'active',
                        tooltip: 'tooltip',
                        pips: 'pips',
                        pipsHorizontal: 'pips-horizontal',
                        pipsVertical: 'pips-vertical',
                        marker: 'marker',
                        markerHorizontal: 'marker-horizontal',
                        markerVertical: 'marker-vertical',
                        markerNormal: 'marker-normal',
                        markerLarge: 'marker-large',
                        markerSub: 'marker-sub',
                        value: 'value',
                        valueHorizontal: 'value-horizontal',
                        valueVertical: 'value-vertical',
                        valueNormal: 'value-normal',
                        valueLarge: 'value-large',
                        valueSub: 'value-sub'
                    },
                    'useRequestAnimationFrame': true
                };

                // AriaFormat defaults to regular format, if any.
                if (options.format && !options.ariaFormat) {
                    options.ariaFormat = options.format;
                }

                // Run all options through a testing mechanism to ensure correct
                // input. It should be noted that options might get modified to
                // be handled properly. E.g. wrapping integers in arrays.
                Object.keys(tests).forEach(function (name) {

                    // If the option isn't set, but it is required, throw an error.
                    if (options[name] === undefined && defaults[name] === undefined) {

                        if (tests[name].r) {
                            throw new Error("noUiSlider (" + VERSION + "): '" + name + "' is required.");
                        }

                        return true;
                    }

                    tests[name].t(parsed, options[name] === undefined ? defaults[name] : options[name]);
                });

                // Forward pips options
                parsed.pips = options.pips;

                var styles = [['left', 'top'], ['right', 'bottom']];

                // Pre-define the styles.
                parsed.style = styles[parsed.dir][parsed.ort];
                parsed.styleOposite = styles[parsed.dir ? 0 : 1][parsed.ort];

                return parsed;
            }


            function closure(target, options, originalOptions) {

                var actions = getActions();
                var supportsTouchActionNone = getSupportsTouchActionNone();
                var supportsPassive = supportsTouchActionNone && getSupportsPassive();

                // All variables local to 'closure' are prefixed with 'scope_'
                var scope_Target = target;
                var scope_Locations = [];
                var scope_Base;
                var scope_Handles;
                var scope_HandleNumbers = [];
                var scope_ActiveHandlesCount = 0;
                var scope_Connects;
                var scope_Spectrum = options.spectrum;
                var scope_Values = [];
                var scope_Events = {};
                var scope_Self;
                var scope_Pips;
                var scope_Document = target.ownerDocument;
                var scope_DocumentElement = scope_Document.documentElement;
                var scope_Body = scope_Document.body;


                // Creates a node, adds it to target, returns the new node.
                function addNodeTo(target, className) {

                    var div = scope_Document.createElement('div');

                    if (className) {
                        addClass(div, className);
                    }

                    target.appendChild(div);

                    return div;
                }

                // Append a origin to the base
                function addOrigin(base, handleNumber) {

                    var origin = addNodeTo(base, options.cssClasses.origin);
                    var handle = addNodeTo(origin, options.cssClasses.handle);

                    handle.setAttribute('data-handle', handleNumber);

                    // https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex
                    // 0 = focusable and reachable
                    handle.setAttribute('tabindex', '0');
                    handle.setAttribute('role', 'slider');
                    handle.setAttribute('aria-orientation', options.ort ? 'vertical' : 'horizontal');

                    if (handleNumber === 0) {
                        addClass(handle, options.cssClasses.handleLower);
                    }

                    else if (handleNumber === options.handles - 1) {
                        addClass(handle, options.cssClasses.handleUpper);
                    }

                    return origin;
                }

                // Insert nodes for connect elements
                function addConnect(base, add) {

                    if (!add) {
                        return false;
                    }

                    return addNodeTo(base, options.cssClasses.connect);
                }

                // Add handles to the slider base.
                function addElements(connectOptions, base) {

                    scope_Handles = [];
                    scope_Connects = [];

                    scope_Connects.push(addConnect(base, connectOptions[0]));

                    // [::::O====O====O====]
                    // connectOptions = [0, 1, 1, 1]

                    for (var i = 0; i < options.handles; i++) {
                        // Keep a list of all added handles.
                        scope_Handles.push(addOrigin(base, i));
                        scope_HandleNumbers[i] = i;
                        scope_Connects.push(addConnect(base, connectOptions[i + 1]));
                    }
                }

                // Initialize a single slider.
                function addSlider(target) {

                    // Apply classes and data to the target.
                    addClass(target, options.cssClasses.target);

                    if (options.dir === 0) {
                        addClass(target, options.cssClasses.ltr);
                    } else {
                        addClass(target, options.cssClasses.rtl);
                    }

                    if (options.ort === 0) {
                        addClass(target, options.cssClasses.horizontal);
                    } else {
                        addClass(target, options.cssClasses.vertical);
                    }

                    scope_Base = addNodeTo(target, options.cssClasses.base);
                }


                function addTooltip(handle, handleNumber) {

                    if (!options.tooltips[handleNumber]) {
                        return false;
                    }

                    return addNodeTo(handle.firstChild, options.cssClasses.tooltip);
                }

                // The tooltips option is a shorthand for using the 'update' event.
                function tooltips() {

                    // Tooltips are added with options.tooltips in original order.
                    var tips = scope_Handles.map(addTooltip);

                    bindEvent('update', function (values, handleNumber, unencoded) {

                        if (!tips[handleNumber]) {
                            return;
                        }

                        var formattedValue = values[handleNumber];

                        if (options.tooltips[handleNumber] !== true) {
                            formattedValue = options.tooltips[handleNumber].to(unencoded[handleNumber]);
                        }

                        tips[handleNumber].innerHTML = formattedValue;
                    });
                }


                function aria() {

                    bindEvent('update', function (values, handleNumber, unencoded, tap, positions) {

                        // Update Aria Values for all handles, as a change in one changes min and max values for the next.
                        scope_HandleNumbers.forEach(function (handleNumber) {

                            var handle = scope_Handles[handleNumber];

                            var min = checkHandlePosition(scope_Locations, handleNumber, 0, true, true, true);
                            var max = checkHandlePosition(scope_Locations, handleNumber, 100, true, true, true);

                            var now = positions[handleNumber];
                            var text = options.ariaFormat.to(unencoded[handleNumber]);

                            handle.children[0].setAttribute('aria-valuemin', min.toFixed(1));
                            handle.children[0].setAttribute('aria-valuemax', max.toFixed(1));
                            handle.children[0].setAttribute('aria-valuenow', now.toFixed(1));
                            handle.children[0].setAttribute('aria-valuetext', text);
                        });
                    });
                }


                function getGroup(mode, values, stepped) {

                    // Use the range.
                    if (mode === 'range' || mode === 'steps') {
                        return scope_Spectrum.xVal;
                    }

                    if (mode === 'count') {

                        if (!values) {
                            throw new Error("noUiSlider (" + VERSION + "): 'values' required for mode 'count'.");
                        }

                        // Divide 0 - 100 in 'count' parts.
                        var spread = ( 100 / (values - 1) );
                        var v;
                        var i = 0;

                        values = [];

                        // List these parts and have them handled as 'positions'.
                        while ((v = i++ * spread) <= 100) {
                            values.push(v);
                        }

                        mode = 'positions';
                    }

                    if (mode === 'positions') {

                        // Map all percentages to on-range values.
                        return values.map(function (value) {
                            return scope_Spectrum.fromStepping(stepped ? scope_Spectrum.getStep(value) : value);
                        });
                    }

                    if (mode === 'values') {

                        // If the value must be stepped, it needs to be converted to a percentage first.
                        if (stepped) {

                            return values.map(function (value) {

                                // Convert to percentage, apply step, return to value.
                                return scope_Spectrum.fromStepping(scope_Spectrum.getStep(scope_Spectrum.toStepping(value)));
                            });

                        }

                        // Otherwise, we can simply use the values.
                        return values;
                    }
                }

                function generateSpread(density, mode, group) {

                    function safeIncrement(value, increment) {
                        // Avoid floating point variance by dropping the smallest decimal places.
                        return (value + increment).toFixed(7) / 1;
                    }

                    var indexes = {};
                    var firstInRange = scope_Spectrum.xVal[0];
                    var lastInRange = scope_Spectrum.xVal[scope_Spectrum.xVal.length - 1];
                    var ignoreFirst = false;
                    var ignoreLast = false;
                    var prevPct = 0;

                    // Create a copy of the group, sort it and filter away all duplicates.
                    group = unique(group.slice().sort(function (a, b) {
                        return a - b;
                    }));

                    // Make sure the range starts with the first element.
                    if (group[0] !== firstInRange) {
                        group.unshift(firstInRange);
                        ignoreFirst = true;
                    }

                    // Likewise for the last one.
                    if (group[group.length - 1] !== lastInRange) {
                        group.push(lastInRange);
                        ignoreLast = true;
                    }

                    group.forEach(function (current, index) {

                        // Get the current step and the lower + upper positions.
                        var step;
                        var i;
                        var q;
                        var low = current;
                        var high = group[index + 1];
                        var newPct;
                        var pctDifference;
                        var pctPos;
                        var type;
                        var steps;
                        var realSteps;
                        var stepsize;

                        // When using 'steps' mode, use the provided steps.
                        // Otherwise, we'll step on to the next subrange.
                        if (mode === 'steps') {
                            step = scope_Spectrum.xNumSteps[index];
                        }

                        // Default to a 'full' step.
                        if (!step) {
                            step = high - low;
                        }

                        // Low can be 0, so test for false. If high is undefined,
                        // we are at the last subrange. Index 0 is already handled.
                        if (low === false || high === undefined) {
                            return;
                        }

                        // Make sure step isn't 0, which would cause an infinite loop (#654)
                        step = Math.max(step, 0.0000001);

                        // Find all steps in the subrange.
                        for (i = low; i <= high; i = safeIncrement(i, step)) {

                            // Get the percentage value for the current step,
                            // calculate the size for the subrange.
                            newPct = scope_Spectrum.toStepping(i);
                            pctDifference = newPct - prevPct;

                            steps = pctDifference / density;
                            realSteps = Math.round(steps);

                            // This ratio represents the ammount of percentage-space a point indicates.
                            // For a density 1 the points/percentage = 1. For density 2, that percentage needs to be re-devided.
                            // Round the percentage offset to an even number, then divide by two
                            // to spread the offset on both sides of the range.
                            stepsize = pctDifference / realSteps;

                            // Divide all points evenly, adding the correct number to this subrange.
                            // Run up to <= so that 100% gets a point, event if ignoreLast is set.
                            for (q = 1; q <= realSteps; q += 1) {

                                // The ratio between the rounded value and the actual size might be ~1% off.
                                // Correct the percentage offset by the number of points
                                // per subrange. density = 1 will result in 100 points on the
                                // full range, 2 for 50, 4 for 25, etc.
                                pctPos = prevPct + ( q * stepsize );
                                indexes[pctPos.toFixed(5)] = ['x', 0];
                            }

                            // Determine the point type.
                            type = (group.indexOf(i) > -1) ? 1 : ( mode === 'steps' ? 2 : 0 );

                            // Enforce the 'ignoreFirst' option by overwriting the type for 0.
                            if (!index && ignoreFirst) {
                                type = 0;
                            }

                            if (!(i === high && ignoreLast)) {
                                // Mark the 'type' of this point. 0 = plain, 1 = real value, 2 = step value.
                                indexes[newPct.toFixed(5)] = [i, type];
                            }

                            // Update the percentage count.
                            prevPct = newPct;
                        }
                    });

                    return indexes;
                }

                function addMarking(spread, filterFunc, formatter) {

                    var element = scope_Document.createElement('div');

                    var valueSizeClasses = [
                        options.cssClasses.valueNormal,
                        options.cssClasses.valueLarge,
                        options.cssClasses.valueSub
                    ];
                    var markerSizeClasses = [
                        options.cssClasses.markerNormal,
                        options.cssClasses.markerLarge,
                        options.cssClasses.markerSub
                    ];
                    var valueOrientationClasses = [
                        options.cssClasses.valueHorizontal,
                        options.cssClasses.valueVertical
                    ];
                    var markerOrientationClasses = [
                        options.cssClasses.markerHorizontal,
                        options.cssClasses.markerVertical
                    ];

                    addClass(element, options.cssClasses.pips);
                    addClass(element, options.ort === 0 ? options.cssClasses.pipsHorizontal : options.cssClasses.pipsVertical);

                    function getClasses(type, source) {
                        var a = source === options.cssClasses.value;
                        var orientationClasses = a ? valueOrientationClasses : markerOrientationClasses;
                        var sizeClasses = a ? valueSizeClasses : markerSizeClasses;

                        return source + ' ' + orientationClasses[options.ort] + ' ' + sizeClasses[type];
                    }

                    function addSpread(offset, values) {

                        // Apply the filter function, if it is set.
                        values[1] = (values[1] && filterFunc) ? filterFunc(values[0], values[1]) : values[1];

                        // Add a marker for every point
                        var node = addNodeTo(element, false);
                        node.className = getClasses(values[1], options.cssClasses.marker);
                        node.style[options.style] = offset + '%';

                        // Values are only appended for points marked '1' or '2'.
                        if (values[1]) {
                            node = addNodeTo(element, false);
                            node.className = getClasses(values[1], options.cssClasses.value);
                            node.style[options.style] = offset + '%';
                            node.innerText = formatter.to(values[0]);
                        }
                    }

                    // Append all points.
                    Object.keys(spread).forEach(function (a) {
                        addSpread(a, spread[a]);
                    });

                    return element;
                }

                function removePips() {
                    if (scope_Pips) {
                        removeElement(scope_Pips);
                        scope_Pips = null;
                    }
                }

                function pips(grid) {

                    // Fix #669
                    removePips();

                    var mode = grid.mode;
                    var density = grid.density || 1;
                    var filter = grid.filter || false;
                    var values = grid.values || false;
                    var stepped = grid.stepped || false;
                    var group = getGroup(mode, values, stepped);
                    var spread = generateSpread(density, mode, group);
                    var format = grid.format || {
                        to: Math.round
                    };

                    scope_Pips = scope_Target.appendChild(addMarking(
                        spread,
                        filter,
                        format
                    ));

                    return scope_Pips;
                }


                // Shorthand for base dimensions.
                function baseSize() {
                    var rect = scope_Base.getBoundingClientRect(), alt = 'offset' + ['Width', 'Height'][options.ort];
                    return options.ort === 0 ? (rect.width || scope_Base[alt]) : (rect.height || scope_Base[alt]);
                }

                // Handler for attaching events trough a proxy.
                function attachEvent(events, element, callback, data) {

                    // This function can be used to 'filter' events to the slider.
                    // element is a node, not a nodeList

                    var method = function (e) {

                        if (scope_Target.hasAttribute('disabled')) {
                            return false;
                        }

                        // Stop if an active 'tap' transition is taking place.
                        if (hasClass(scope_Target, options.cssClasses.tap)) {
                            return false;
                        }

                        e = fixEvent(e, data.pageOffset, data.target || element);

                        // Handle reject of multitouch
                        if (!e) {
                            return false;
                        }

                        // Ignore right or middle clicks on start #454
                        if (events === actions.start && e.buttons !== undefined && e.buttons > 1) {
                            return false;
                        }

                        // Ignore right or middle clicks on start #454
                        if (data.hover && e.buttons) {
                            return false;
                        }

                        // 'supportsPassive' is only true if a browser also supports touch-action: none in CSS.
                        // iOS safari does not, so it doesn't get to benefit from passive scrolling. iOS does support
                        // touch-action: manipulation, but that allows panning, which breaks
                        // sliders after zooming/on non-responsive pages.
                        // See: https://bugs.webkit.org/show_bug.cgi?id=133112
                        if (!supportsPassive) {
                            e.preventDefault();
                        }

                        e.calcPoint = e.points[options.ort];

                        // Call the event handler with the event [ and additional data ].
                        callback(e, data);
                    };

                    var methods = [];

                    // Bind a closure on the target for every event type.
                    events.split(' ').forEach(function (eventName) {
                        element.addEventListener(eventName, method, supportsPassive ? {passive: true} : false);
                        methods.push([eventName, method]);
                    });

                    return methods;
                }

                // Provide a clean event with standardized offset values.
                function fixEvent(e, pageOffset, target) {

                    // Filter the event to register the type, which can be
                    // touch, mouse or pointer. Offset changes need to be
                    // made on an event specific basis.
                    var touch = e.type.indexOf('touch') === 0;
                    var mouse = e.type.indexOf('mouse') === 0;
                    var pointer = e.type.indexOf('pointer') === 0;

                    var x;
                    var y;

                    // IE10 implemented pointer events with a prefix;
                    if (e.type.indexOf('MSPointer') === 0) {
                        pointer = true;
                    }


                    // In the event that multitouch is activated, the only thing one handle should be concerned
                    // about is the touches that originated on top of it.
                    if (touch && options.multitouch) {
                        // Returns true if a touch originated on the target.
                        var isTouchOnTarget = function (touch) {
                            return touch.target === target || target.contains(touch.target);
                        };
                        // In the case of touchstart events, we need to make sure there is still no more than one
                        // touch on the target so we look amongst all touches.
                        if (e.type === 'touchstart') {
                            var targetTouches = Array.prototype.filter.call(e.touches, isTouchOnTarget);
                            // Do not support more than one touch per handle.
                            if (targetTouches.length > 1) {
                                return false;
                            }
                            x = targetTouches[0].pageX;
                            y = targetTouches[0].pageY;
                        } else {
                            // In the other cases, find on changedTouches is enough.
                            var targetTouch = Array.prototype.find.call(e.changedTouches, isTouchOnTarget);
                            // Cancel if the target touch has not moved.
                            if (!targetTouch) {
                                return false;
                            }
                            x = targetTouch.pageX;
                            y = targetTouch.pageY;
                        }
                    } else if (touch) {
                        // Fix bug when user touches with two or more fingers on mobile devices.
                        // It's useful when you have two or more sliders on one page,
                        // that can be touched simultaneously.
                        // #649, #663, #668
                        if (e.touches.length > 1) {
                            return false;
                        }

                        // noUiSlider supports one movement at a time,
                        // so we can select the first 'changedTouch'.
                        x = e.changedTouches[0].pageX;
                        y = e.changedTouches[0].pageY;
                    }

                    pageOffset = pageOffset || getPageOffset(scope_Document);

                    if (mouse || pointer) {
                        x = e.clientX + pageOffset.x;
                        y = e.clientY + pageOffset.y;
                    }

                    e.pageOffset = pageOffset;
                    e.points = [x, y];
                    e.cursor = mouse || pointer; // Fix #435

                    return e;
                }

                // Translate a coordinate in the document to a percentage on the slider
                function calcPointToPercentage(calcPoint) {
                    var location = calcPoint - offset(scope_Base, options.ort);
                    var proposal = ( location * 100 ) / baseSize();
                    return options.dir ? 100 - proposal : proposal;
                }

                // Find handle closest to a certain percentage on the slider
                function getClosestHandle(proposal) {

                    var closest = 100;
                    var handleNumber = false;

                    scope_Handles.forEach(function (handle, index) {

                        // Disabled handles are ignored
                        if (handle.hasAttribute('disabled')) {
                            return;
                        }

                        var pos = Math.abs(scope_Locations[index] - proposal);

                        if (pos < closest) {
                            handleNumber = index;
                            closest = pos;
                        }
                    });

                    return handleNumber;
                }

                // Moves handle(s) by a percentage
                // (bool, % to move, [% where handle started, ...], [index in scope_Handles, ...])
                function moveHandles(upward, proposal, locations, handleNumbers) {

                    var proposals = locations.slice();

                    var b = [!upward, upward];
                    var f = [upward, !upward];

                    // Copy handleNumbers so we don't change the dataset
                    handleNumbers = handleNumbers.slice();

                    // Check to see which handle is 'leading'.
                    // If that one can't move the second can't either.
                    if (upward) {
                        handleNumbers.reverse();
                    }

                    // Step 1: get the maximum percentage that any of the handles can move
                    if (handleNumbers.length > 1) {

                        handleNumbers.forEach(function (handleNumber, o) {

                            var to = checkHandlePosition(proposals, handleNumber, proposals[handleNumber] + proposal, b[o], f[o], false);

                            // Stop if one of the handles can't move.
                            if (to === false) {
                                proposal = 0;
                            } else {
                                proposal = to - proposals[handleNumber];
                                proposals[handleNumber] = to;
                            }
                        });
                    }

                    // If using one handle, check backward AND forward
                    else {
                        b = f = [true];
                    }

                    var state = false;

                    // Step 2: Try to set the handles with the found percentage
                    handleNumbers.forEach(function (handleNumber, o) {
                        state = setHandle(handleNumber, locations[handleNumber] + proposal, b[o], f[o]) || state;
                    });

                    // Step 3: If a handle moved, fire events
                    if (state) {
                        handleNumbers.forEach(function (handleNumber) {
                            fireEvent('update', handleNumber);
                            fireEvent('slide', handleNumber);
                        });
                    }
                }

                // External event handling
                function fireEvent(eventName, handleNumber, tap) {

                    Object.keys(scope_Events).forEach(function (targetEvent) {

                        var eventType = targetEvent.split('.')[0];

                        if (eventName === eventType) {
                            scope_Events[targetEvent].forEach(function (callback) {

                                callback.call(
                                    // Use the slider public API as the scope ('this')
                                    scope_Self,
                                    // Return values as array, so arg_1[arg_2] is always valid.
                                    scope_Values.map(options.format.to),
                                    // Handle index, 0 or 1
                                    handleNumber,
                                    // Unformatted slider values
                                    scope_Values.slice(),
                                    // Event is fired by tap, true or false
                                    tap || false,
                                    // Left offset of the handle, in relation to the slider
                                    scope_Locations.slice()
                                );
                            });
                        }
                    });
                }


                // Fire 'end' when a mouse or pen leaves the document.
                function documentLeave(event, data) {
                    if (event.type === "mouseout" && event.target.nodeName === "HTML" && event.relatedTarget === null) {
                        eventEnd(event, data);
                    }
                }

                // Handle movement on document for handle and range drag.
                function eventMove(event, data) {

                    // Fix #498
                    // Check value of .buttons in 'start' to work around a bug in IE10 mobile (data.buttonsProperty).
                    // https://connect.microsoft.com/IE/feedback/details/927005/mobile-ie10-windows-phone-buttons-property-of-pointermove-event-always-zero
                    // IE9 has .buttons and .which zero on mousemove.
                    // Firefox breaks the spec MDN defines.
                    if (navigator.appVersion.indexOf("MSIE 9") === -1 && event.buttons === 0 && data.buttonsProperty !== 0) {
                        return eventEnd(event, data);
                    }

                    // Check if we are moving up or down
                    var movement = (options.dir ? -1 : 1) * (event.calcPoint - data.startCalcPoint);

                    // Convert the movement into a percentage of the slider width/height
                    var proposal = (movement * 100) / data.baseSize;

                    moveHandles(movement > 0, proposal, data.locations, data.handleNumbers);
                }

                // Unbind move events on document, call callbacks.
                function eventEnd(event, data) {

                    // The handle is no longer active, so remove the class.
                    if (data.handle) {
                        removeClass(data.handle, options.cssClasses.active);
                        scope_ActiveHandlesCount -= 1;
                    }

                    // Unbind the move and end events, which are added on 'start'.
                    data.listeners.forEach(function (c) {
                        scope_DocumentElement.removeEventListener(c[0], c[1]);
                    });

                    if (scope_ActiveHandlesCount === 0) {
                        // Remove dragging class.
                        removeClass(scope_Target, options.cssClasses.drag);
                        setZindex();

                        // Remove cursor styles and text-selection events bound to the body.
                        if (event.cursor) {
                            scope_Body.style.cursor = '';
                            scope_Body.removeEventListener('selectstart', preventDefault);
                        }
                    }

                    data.handleNumbers.forEach(function (handleNumber) {
                        fireEvent('change', handleNumber);
                        fireEvent('set', handleNumber);
                        fireEvent('end', handleNumber);
                    });
                }

                // Bind move events on document.
                function eventStart(event, data) {

                    var handle;
                    if (data.handleNumbers.length === 1) {

                        var handleOrigin = scope_Handles[data.handleNumbers[0]];

                        // Ignore 'disabled' handles
                        if (handleOrigin.hasAttribute('disabled')) {
                            return false;
                        }

                        handle = handleOrigin.children[0];
                        scope_ActiveHandlesCount += 1;

                        // Mark the handle as 'active' so it can be styled.
                        addClass(handle, options.cssClasses.active);
                    }

                    // A drag should never propagate up to the 'tap' event.
                    event.stopPropagation();

                    // Record the event listeners.
                    var listeners = [];

                    // Attach the move and end events.
                    var moveEvent = attachEvent(actions.move, scope_DocumentElement, eventMove, {
                        // The event target has changed so we need to propagate the original one so that we keep
                        // relying on it to extract target touches.
                        target: event.target,
                        handle: handle,
                        listeners: listeners,
                        startCalcPoint: event.calcPoint,
                        baseSize: baseSize(),
                        pageOffset: event.pageOffset,
                        handleNumbers: data.handleNumbers,
                        buttonsProperty: event.buttons,
                        locations: scope_Locations.slice()
                    });

                    var endEvent = attachEvent(actions.end, scope_DocumentElement, eventEnd, {
                        target: event.target,
                        handle: handle,
                        listeners: listeners,
                        handleNumbers: data.handleNumbers
                    });

                    var outEvent = attachEvent("mouseout", scope_DocumentElement, documentLeave, {
                        target: event.target,
                        handle: handle,
                        listeners: listeners,
                        handleNumbers: data.handleNumbers
                    });

                    // We want to make sure we pushed the listeners in the listener list rather than creating
                    // a new one as it has already been passed to the event handlers.
                    listeners.push.apply(listeners, moveEvent.concat(endEvent, outEvent));

                    // Text selection isn't an issue on touch devices,
                    // so adding cursor styles can be skipped.
                    if (event.cursor) {

                        // Prevent the 'I' cursor and extend the range-drag cursor.
                        scope_Body.style.cursor = getComputedStyle(event.target).cursor;

                        // Mark the target with a dragging state.
                        if (scope_Handles.length > 1) {
                            addClass(scope_Target, options.cssClasses.drag);
                        }

                        // Prevent text selection when dragging the handles.
                        // In noUiSlider <= 9.2.0, this was handled by calling preventDefault on mouse/touch start/move,
                        // which is scroll blocking. The selectstart event is supported by FireFox starting from version 52,
                        // meaning the only holdout is iOS Safari. This doesn't matter: text selection isn't triggered there.
                        // The 'cursor' flag is false.
                        // See: http://caniuse.com/#search=selectstart
                        scope_Body.addEventListener('selectstart', preventDefault, false);
                    }

                    data.handleNumbers.forEach(function (handleNumber) {
                        fireEvent('start', handleNumber);
                    });
                }

                // Move closest handle to tapped location.
                function eventTap(event) {

                    // The tap event shouldn't propagate up
                    event.stopPropagation();

                    var proposal = calcPointToPercentage(event.calcPoint);
                    var handleNumber = getClosestHandle(proposal);

                    // Tackle the case that all handles are 'disabled'.
                    if (handleNumber === false) {
                        return false;
                    }

                    // Flag the slider as it is now in a transitional state.
                    // Transition takes a configurable amount of ms (default 300). Re-enable the slider after that.
                    if (!options.events.snap) {
                        addClassFor(scope_Target, options.cssClasses.tap, options.animationDuration);
                    }

                    setHandle(handleNumber, proposal, true, true);

                    setZindex();

                    fireEvent('slide', handleNumber, true);
                    fireEvent('update', handleNumber, true);
                    fireEvent('change', handleNumber, true);
                    fireEvent('set', handleNumber, true);

                    if (options.events.snap) {
                        eventStart(event, {handleNumbers: [handleNumber]});
                    }
                }

                // Fires a 'hover' event for a hovered mouse/pen position.
                function eventHover(event) {

                    var proposal = calcPointToPercentage(event.calcPoint);

                    var to = scope_Spectrum.getStep(proposal);
                    var value = scope_Spectrum.fromStepping(to);

                    Object.keys(scope_Events).forEach(function (targetEvent) {
                        if ('hover' === targetEvent.split('.')[0]) {
                            scope_Events[targetEvent].forEach(function (callback) {
                                callback.call(scope_Self, value);
                            });
                        }
                    });
                }

                // Attach events to several slider parts.
                function bindSliderEvents(behaviour) {

                    // Attach the standard drag event to the handles.
                    if (!behaviour.fixed) {

                        scope_Handles.forEach(function (handle, index) {

                            // These events are only bound to the visual handle
                            // element, not the 'real' origin element.
                            attachEvent(actions.start, handle.children[0], eventStart, {
                                handleNumbers: [index]
                            });
                        });
                    }

                    // Attach the tap event to the slider base.
                    if (behaviour.tap) {
                        attachEvent(actions.start, scope_Base, eventTap, {});
                    }

                    // Fire hover events
                    if (behaviour.hover) {
                        attachEvent(actions.move, scope_Base, eventHover, {hover: true});
                    }

                    // Make the range draggable.
                    if (behaviour.drag) {

                        scope_Connects.forEach(function (connect, index) {

                            if (connect === false || index === 0 || index === scope_Connects.length - 1) {
                                return;
                            }

                            var handleBefore = scope_Handles[index - 1];
                            var handleAfter = scope_Handles[index];
                            var eventHolders = [connect];

                            addClass(connect, options.cssClasses.draggable);

                            // When the range is fixed, the entire range can
                            // be dragged by the handles. The handle in the first
                            // origin will propagate the start event upward,
                            // but it needs to be bound manually on the other.
                            if (behaviour.fixed) {
                                eventHolders.push(handleBefore.children[0]);
                                eventHolders.push(handleAfter.children[0]);
                            }

                            eventHolders.forEach(function (eventHolder) {
                                attachEvent(actions.start, eventHolder, eventStart, {
                                    handles: [handleBefore, handleAfter],
                                    handleNumbers: [index - 1, index]
                                });
                            });
                        });
                    }
                }


                // Split out the handle positioning logic so the Move event can use it, too
                function checkHandlePosition(reference, handleNumber, to, lookBackward, lookForward, getValue) {

                    // For sliders with multiple handles, limit movement to the other handle.
                    // Apply the margin option by adding it to the handle positions.
                    if (scope_Handles.length > 1) {

                        if (lookBackward && handleNumber > 0) {
                            to = Math.max(to, reference[handleNumber - 1] + options.margin);
                        }

                        if (lookForward && handleNumber < scope_Handles.length - 1) {
                            to = Math.min(to, reference[handleNumber + 1] - options.margin);
                        }
                    }

                    // The limit option has the opposite effect, limiting handles to a
                    // maximum distance from another. Limit must be > 0, as otherwise
                    // handles would be unmoveable.
                    if (scope_Handles.length > 1 && options.limit) {

                        if (lookBackward && handleNumber > 0) {
                            to = Math.min(to, reference[handleNumber - 1] + options.limit);
                        }

                        if (lookForward && handleNumber < scope_Handles.length - 1) {
                            to = Math.max(to, reference[handleNumber + 1] - options.limit);
                        }
                    }

                    // The padding option keeps the handles a certain distance from the
                    // edges of the slider. Padding must be > 0.
                    if (options.padding) {

                        if (handleNumber === 0) {
                            to = Math.max(to, options.padding);
                        }

                        if (handleNumber === scope_Handles.length - 1) {
                            to = Math.min(to, 100 - options.padding);
                        }
                    }

                    to = scope_Spectrum.getStep(to);

                    // Limit percentage to the 0 - 100 range
                    to = limit(to);

                    // Return false if handle can't move
                    if (to === reference[handleNumber] && !getValue) {
                        return false;
                    }

                    return to;
                }

                function toPct(pct) {
                    return pct + '%';
                }

                // Updates scope_Locations and scope_Values, updates visual state
                function updateHandlePosition(handleNumber, to) {

                    // Update locations.
                    scope_Locations[handleNumber] = to;

                    // Convert the value to the slider stepping/range.
                    scope_Values[handleNumber] = scope_Spectrum.fromStepping(to);

                    // Called synchronously or on the next animationFrame
                    var stateUpdate = function () {
                        scope_Handles[handleNumber].style[options.style] = toPct(to);
                        updateConnect(handleNumber);
                        updateConnect(handleNumber + 1);
                    };

                    // Set the handle to the new position.
                    // Use requestAnimationFrame for efficient painting.
                    // No significant effect in Chrome, Edge sees dramatic performace improvements.
                    // Option to disable is useful for unit tests, and single-step debugging.
                    if (window.requestAnimationFrame && options.useRequestAnimationFrame) {
                        window.requestAnimationFrame(stateUpdate);
                    } else {
                        stateUpdate();
                    }
                }

                function setZindex() {

                    scope_HandleNumbers.forEach(function (handleNumber) {
                        // Handles before the slider middle are stacked later = higher,
                        // Handles after the middle later is lower
                        // [[7] [8] .......... | .......... [5] [4]
                        var dir = (scope_Locations[handleNumber] > 50 ? -1 : 1);
                        var zIndex = 3 + (scope_Handles.length + (dir * handleNumber));
                        scope_Handles[handleNumber].childNodes[0].style.zIndex = zIndex;
                    });
                }

                // Test suggested values and apply margin, step.
                function setHandle(handleNumber, to, lookBackward, lookForward) {

                    to = checkHandlePosition(scope_Locations, handleNumber, to, lookBackward, lookForward, false);

                    if (to === false) {
                        return false;
                    }

                    updateHandlePosition(handleNumber, to);

                    return true;
                }

                // Updates style attribute for connect nodes
                function updateConnect(index) {

                    // Skip connects set to false
                    if (!scope_Connects[index]) {
                        return;
                    }

                    var l = 0;
                    var h = 100;

                    if (index !== 0) {
                        l = scope_Locations[index - 1];
                    }

                    if (index !== scope_Connects.length - 1) {
                        h = scope_Locations[index];
                    }

                    scope_Connects[index].style[options.style] = toPct(l);
                    scope_Connects[index].style[options.styleOposite] = toPct(100 - h);
                }

                // ...
                function setValue(to, handleNumber) {

                    // Setting with null indicates an 'ignore'.
                    // Inputting 'false' is invalid.
                    if (to === null || to === false) {
                        return;
                    }

                    // If a formatted number was passed, attemt to decode it.
                    if (typeof to === 'number') {
                        to = String(to);
                    }

                    to = options.format.from(to);

                    // Request an update for all links if the value was invalid.
                    // Do so too if setting the handle fails.
                    if (to !== false && !isNaN(to)) {
                        setHandle(handleNumber, scope_Spectrum.toStepping(to), false, false);
                    }
                }

                // Set the slider value.
                function valueSet(input, fireSetEvent) {

                    var values = asArray(input);
                    var isInit = scope_Locations[0] === undefined;

                    // Event fires by default
                    fireSetEvent = (fireSetEvent === undefined ? true : !!fireSetEvent);

                    values.forEach(setValue);

                    // Animation is optional.
                    // Make sure the initial values were set before using animated placement.
                    if (options.animate && !isInit) {
                        addClassFor(scope_Target, options.cssClasses.tap, options.animationDuration);
                    }

                    // Now that all base values are set, apply constraints
                    scope_HandleNumbers.forEach(function (handleNumber) {
                        setHandle(handleNumber, scope_Locations[handleNumber], true, false);
                    });

                    setZindex();

                    scope_HandleNumbers.forEach(function (handleNumber) {

                        fireEvent('update', handleNumber);

                        // Fire the event only for handles that received a new value, as per #579
                        if (values[handleNumber] !== null && fireSetEvent) {
                            fireEvent('set', handleNumber);
                        }
                    });
                }

                // Reset slider to initial values
                function valueReset(fireSetEvent) {
                    valueSet(options.start, fireSetEvent);
                }

                // Get the slider value.
                function valueGet() {

                    var values = scope_Values.map(options.format.to);

                    // If only one handle is used, return a single value.
                    if (values.length === 1) {
                        return values[0];
                    }

                    return values;
                }

                // Removes classes from the root and empties it.
                function destroy() {

                    for (var key in options.cssClasses) {
                        if (!options.cssClasses.hasOwnProperty(key)) {
                            continue;
                        }
                        removeClass(scope_Target, options.cssClasses[key]);
                    }

                    while (scope_Target.firstChild) {
                        scope_Target.removeChild(scope_Target.firstChild);
                    }

                    delete scope_Target.noUiSlider;
                }

                // Get the current step size for the slider.
                function getCurrentStep() {

                    // Check all locations, map them to their stepping point.
                    // Get the step point, then find it in the input list.
                    return scope_Locations.map(function (location, index) {

                        var nearbySteps = scope_Spectrum.getNearbySteps(location);
                        var value = scope_Values[index];
                        var increment = nearbySteps.thisStep.step;
                        var decrement = null;

                        // If the next value in this step moves into the next step,
                        // the increment is the start of the next step - the current value
                        if (increment !== false) {
                            if (value + increment > nearbySteps.stepAfter.startValue) {
                                increment = nearbySteps.stepAfter.startValue - value;
                            }
                        }


                        // If the value is beyond the starting point
                        if (value > nearbySteps.thisStep.startValue) {
                            decrement = nearbySteps.thisStep.step;
                        }

                        else if (nearbySteps.stepBefore.step === false) {
                            decrement = false;
                        }

                        // If a handle is at the start of a step, it always steps back into the previous step first
                        else {
                            decrement = value - nearbySteps.stepBefore.highestStep;
                        }


                        // Now, if at the slider edges, there is not in/decrement
                        if (location === 100) {
                            increment = null;
                        }

                        else if (location === 0) {
                            decrement = null;
                        }

                        // As per #391, the comparison for the decrement step can have some rounding issues.
                        var stepDecimals = scope_Spectrum.countStepDecimals();

                        // Round per #391
                        if (increment !== null && increment !== false) {
                            increment = Number(increment.toFixed(stepDecimals));
                        }

                        if (decrement !== null && decrement !== false) {
                            decrement = Number(decrement.toFixed(stepDecimals));
                        }

                        return [decrement, increment];
                    });
                }

                // Attach an event to this slider, possibly including a namespace
                function bindEvent(namespacedEvent, callback) {
                    scope_Events[namespacedEvent] = scope_Events[namespacedEvent] || [];
                    scope_Events[namespacedEvent].push(callback);

                    // If the event bound is 'update,' fire it immediately for all handles.
                    if (namespacedEvent.split('.')[0] === 'update') {
                        scope_Handles.forEach(function (a, index) {
                            fireEvent('update', index);
                        });
                    }
                }

                // Undo attachment of event
                function removeEvent(namespacedEvent) {

                    var event = namespacedEvent && namespacedEvent.split('.')[0];
                    var namespace = event && namespacedEvent.substring(event.length);

                    Object.keys(scope_Events).forEach(function (bind) {

                        var tEvent = bind.split('.')[0],
                            tNamespace = bind.substring(tEvent.length);

                        if ((!event || event === tEvent) && (!namespace || namespace === tNamespace)) {
                            delete scope_Events[bind];
                        }
                    });
                }

                // Updateable: margin, limit, padding, step, range, animate, snap
                function updateOptions(optionsToUpdate, fireSetEvent) {

                    // Spectrum is created using the range, snap, direction and step options.
                    // 'snap' and 'step' can be updated.
                    // If 'snap' and 'step' are not passed, they should remain unchanged.
                    var v = valueGet();

                    var updateAble = ['margin', 'limit', 'padding', 'range', 'animate', 'snap', 'step', 'format'];

                    // Only change options that we're actually passed to update.
                    updateAble.forEach(function (name) {
                        if (optionsToUpdate[name] !== undefined) {
                            originalOptions[name] = optionsToUpdate[name];
                        }
                    });

                    var newOptions = testOptions(originalOptions);

                    // Load new options into the slider state
                    updateAble.forEach(function (name) {
                        if (optionsToUpdate[name] !== undefined) {
                            options[name] = newOptions[name];
                        }
                    });

                    scope_Spectrum = newOptions.spectrum;

                    // Limit, margin and padding depend on the spectrum but are stored outside of it. (#677)
                    options.margin = newOptions.margin;
                    options.limit = newOptions.limit;
                    options.padding = newOptions.padding;

                    // Update pips, removes existing.
                    if (options.pips) {
                        pips(options.pips);
                    }

                    // Invalidate the current positioning so valueSet forces an update.
                    scope_Locations = [];
                    valueSet(optionsToUpdate.start || v, fireSetEvent);
                }

                // Throw an error if the slider was already initialized.
                if (scope_Target.noUiSlider) {
                    throw new Error("noUiSlider (" + VERSION + "): Slider was already initialized.");
                }

                // Create the base element, initialise HTML and set classes.
                // Add handles and connect elements.
                addSlider(scope_Target);
                addElements(options.connect, scope_Base);

                scope_Self = {
                    destroy: destroy,
                    steps: getCurrentStep,
                    on: bindEvent,
                    off: removeEvent,
                    get: valueGet,
                    set: valueSet,
                    reset: valueReset,
                    // Exposed for unit testing, don't use this in your application.
                    __moveHandles: function (a, b, c) {
                        moveHandles(a, b, scope_Locations, c);
                    },
                    options: originalOptions, // Issue #600, #678
                    updateOptions: updateOptions,
                    target: scope_Target, // Issue #597
                    removePips: removePips,
                    pips: pips // Issue #594
                };

                // Attach user events.
                bindSliderEvents(options.events);

                // Use the public value method to set the start values.
                valueSet(options.start);

                if (options.pips) {
                    pips(options.pips);
                }

                if (options.tooltips) {
                    tooltips();
                }

                aria();

                return scope_Self;

            }


            // Run the standard initializer
            function initialize(target, originalOptions) {

                if (!target || !target.nodeName) {
                    throw new Error("noUiSlider (" + VERSION + "): create requires a single element, got: " + target);
                }

                // Test the options and create the slider environment;
                var options = testOptions(originalOptions, target);
                var api = closure(target, options, originalOptions);

                target.noUiSlider = api;

                return api;
            }

            // Use an object instead of a function for future expansibility;
            return {
                version: VERSION,
                create: initialize
            };

        }));

        /***/
    }),
    /* 1 */
    /***/ (function (module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
        var content = __webpack_require__(2);
        if (typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
        var transform;

        var options = {"hmr": true}
        options.transform = transform
// add the styles to the DOM
        var update = __webpack_require__(4)(content, options);
        if (content.locals) module.exports = content.locals;
// Hot Module Replacement
        if (false) {
            // When the styles change, update the <style> tags
            if (!content.locals) {
                module.hot.accept("!!../../node_modules/css-loader/index.js!./videoTrimModal.css", function () {
                    var newContent = require("!!../../node_modules/css-loader/index.js!./videoTrimModal.css");
                    if (typeof newContent === 'string') newContent = [[module.id, newContent, '']];
                    update(newContent);
                });
            }
            // When the module is disposed, remove the <style> tags
            module.hot.dispose(function () {
                update();
            });
        }

        /***/
    }),
    /* 2 */
    /***/ (function (module, exports, __webpack_require__) {

        exports = module.exports = __webpack_require__(3)(undefined);
// imports


// module
        exports.push([module.i, ".flexbox {\r\n  display: -webkit-box;\r\n  display: -webkit-flex;\r\n  display: -ms-flexbox;\r\n  display: flex; }\r\n\r\n/*! nouislider - 9.2.0 - 2017-01-11 10:35:35 */\r\n/* Functional styling;\r\n * These styles are required for noUiSlider to function.\r\n * You don't need to change these rules to apply your design.\r\n */\r\n.noUi-target,\r\n.noUi-target * {\r\n  -webkit-touch-callout: none;\r\n  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);\r\n  -webkit-user-select: none;\r\n  -ms-touch-action: none;\r\n  touch-action: none;\r\n  -ms-user-select: none;\r\n  -moz-user-select: none;\r\n  user-select: none;\r\n  -moz-box-sizing: border-box;\r\n  box-sizing: border-box; }\r\n\r\n.noUi-target {\r\n  position: relative;\r\n  direction: ltr; }\r\n\r\n.noUi-base {\r\n  width: 100%;\r\n  height: 100%;\r\n  position: relative;\r\n  z-index: 1;\r\n  /* Fix 401 */ }\r\n\r\n.noUi-connect {\r\n  position: absolute;\r\n  right: 0;\r\n  top: 0;\r\n  left: 0;\r\n  bottom: 0; }\r\n\r\n.noUi-origin {\r\n  position: absolute;\r\n  height: 0;\r\n  width: 0; }\r\n\r\n.noUi-handle {\r\n  position: relative;\r\n  z-index: 1; }\r\n\r\n.noUi-state-tap .noUi-connect,\r\n.noUi-state-tap .noUi-origin {\r\n  -webkit-transition: top 0.3s, right 0.3s, bottom 0.3s, left 0.3s;\r\n  transition: top 0.3s, right 0.3s, bottom 0.3s, left 0.3s; }\r\n\r\n.noUi-state-drag * {\r\n  cursor: inherit !important; }\r\n\r\n/* Painting and performance;\r\n * Browsers can paint handles in their own layer.\r\n */\r\n.noUi-base,\r\n.noUi-handle {\r\n  -webkit-transform: translate3d(0, 0, 0);\r\n  transform: translate3d(0, 0, 0); }\r\n\r\n/* Slider size and handle placement;\r\n */\r\n.noUi-horizontal {\r\n  height: 18px; }\r\n\r\n.noUi-horizontal .noUi-handle {\r\n  width: 34px;\r\n  height: 28px;\r\n  left: -17px;\r\n  top: -6px; }\r\n\r\n#first-trim-handler:after {\r\n  content: \"\";\r\n  display: block;\r\n  position: absolute;\r\n  height: 150px;\r\n  width: 3000px;\r\n  background: rgba(50, 50, 50, 0.9);\r\n  left: -2993px;\r\n  top: -40px;\r\n  z-index: -1; }\r\n\r\n#second-trim-handler:after {\r\n  content: \"\";\r\n  display: block;\r\n  position: absolute;\r\n  height: 150px;\r\n  width: 3000px;\r\n  background: rgba(50, 50, 50, 0.9);\r\n  left: 7px;\r\n  top: -40px;\r\n  z-index: -1;\r\n  pointer-events: none; }\r\n\r\n#trim-slider {\r\n  overflow: hidden;\r\n  top: 0;\r\n  position: absolute;\r\n  z-index: 30;\r\n  left: 0; }\r\n\r\n/* Handle stripes;\r\n */\r\n.noUi-handle:before {\r\n  content: \"\";\r\n  display: block;\r\n  position: absolute;\r\n  height: 9px;\r\n  width: 2px;\r\n  border-left: 1px solid #6d6d6d;\r\n  border-right: 1px solid #6d6d6d;\r\n  left: 6px;\r\n  top: 18px; }\r\n\r\n.noUi-handle:hover, .noUi-handle:focus, .noUi-handle:active {\r\n  background-color: #D9D9D9; }\r\n\r\n.noUi-vertical {\r\n  width: 18px; }\r\n\r\n.noUi-vertical .noUi-handle {\r\n  width: 28px;\r\n  height: 34px;\r\n  left: -6px;\r\n  top: -17px; }\r\n\r\n/* Styling;\r\n */\r\n.noUi-target {\r\n  background: #FAFAFA;\r\n  border-radius: 4px;\r\n  border: 1px solid #D3D3D3;\r\n  box-shadow: inset 0 1px 1px #F0F0F0, 0 3px 6px -5px #BBB; }\r\n\r\n.noUi-connect {\r\n  background: #3FBCE7;\r\n  box-shadow: inset 0 0 1px rgba(51, 51, 51, 0.45);\r\n  -webkit-transition: background 450ms;\r\n  transition: background 450ms; }\r\n\r\n/* Handles and cursors;\r\n */\r\n.noUi-draggable {\r\n  cursor: ew-resize; }\r\n\r\n.noUi-vertical .noUi-draggable {\r\n  cursor: ns-resize; }\r\n\r\n.noUi-handle {\r\n  border: 1px solid #9B9B9B;\r\n  border-radius: 2px;\r\n  background: #E8E8E8;\r\n  cursor: default; }\r\n\r\n.noUi-active {\r\n  background: #9B9B9B; }\r\n\r\n.noUi-handle:after {\r\n  left: 17px; }\r\n\r\n.noUi-vertical .noUi-handle:before,\r\n.noUi-vertical .noUi-handle:after {\r\n  width: 14px;\r\n  height: 1px;\r\n  left: 6px;\r\n  top: 14px; }\r\n\r\n.noUi-vertical .noUi-handle:after {\r\n  top: 17px; }\r\n\r\n/* Disabled state;\r\n */\r\n[disabled] .noUi-connect {\r\n  background: #B8B8B8; }\r\n\r\n[disabled].noUi-target,\r\n[disabled].noUi-handle,\r\n[disabled] .noUi-handle {\r\n  cursor: not-allowed; }\r\n\r\n/* Base;\r\n *\r\n */\r\n.noUi-pips,\r\n.noUi-pips * {\r\n  -moz-box-sizing: border-box;\r\n  box-sizing: border-box; }\r\n\r\n.noUi-pips {\r\n  position: absolute;\r\n  color: #999; }\r\n\r\n/* Values;\r\n *\r\n */\r\n.noUi-value {\r\n  position: absolute;\r\n  text-align: center; }\r\n\r\n.noUi-value-sub {\r\n  color: #ccc;\r\n  font-size: 10px; }\r\n\r\n/* Markings;\r\n *\r\n */\r\n.noUi-marker {\r\n  position: absolute;\r\n  background: #CCC; }\r\n\r\n.noUi-marker-sub {\r\n  background: #AAA; }\r\n\r\n.noUi-marker-large {\r\n  background: #AAA; }\r\n\r\n/* Horizontal layout;\r\n *\r\n */\r\n.noUi-pips-horizontal {\r\n  padding: 10px 0;\r\n  height: 80px;\r\n  top: 100%;\r\n  left: 0;\r\n  width: 100%; }\r\n\r\n.noUi-value-horizontal {\r\n  -webkit-transform: translate3d(-50%, 50%, 0);\r\n  transform: translate3d(-50%, 50%, 0); }\r\n\r\n.noUi-marker-horizontal.noUi-marker {\r\n  margin-left: -1px;\r\n  width: 2px;\r\n  height: 5px; }\r\n\r\n.noUi-marker-horizontal.noUi-marker-sub {\r\n  height: 10px; }\r\n\r\n.noUi-marker-horizontal.noUi-marker-large {\r\n  height: 15px; }\r\n\r\n/* Vertical layout;\r\n *\r\n */\r\n.noUi-pips-vertical {\r\n  padding: 0 10px;\r\n  height: 100%;\r\n  top: 0;\r\n  left: 100%; }\r\n\r\n.noUi-value-vertical {\r\n  -webkit-transform: translate3d(0, 50%, 0);\r\n  transform: translate3d(0, 50%, 0);\r\n  padding-left: 25px; }\r\n\r\n.noUi-marker-vertical.noUi-marker {\r\n  width: 5px;\r\n  height: 2px;\r\n  margin-top: -1px; }\r\n\r\n.noUi-marker-vertical.noUi-marker-sub {\r\n  width: 10px; }\r\n\r\n.noUi-marker-vertical.noUi-marker-large {\r\n  width: 15px; }\r\n\r\n.noUi-tooltip {\r\n  display: block;\r\n  position: absolute;\r\n  border: 1px solid #D9D9D9;\r\n  border-radius: 3px;\r\n  background: #fff;\r\n  color: #000;\r\n  padding: 5px;\r\n  text-align: center; }\r\n\r\n.noUi-horizontal .noUi-tooltip {\r\n  -webkit-transform: translate(-50%, 0);\r\n  transform: translate(-50%, 0);\r\n  left: 50%;\r\n  bottom: 120%; }\r\n\r\n.noUi-vertical .noUi-tooltip {\r\n  -webkit-transform: translate(0, -50%);\r\n  transform: translate(0, -50%);\r\n  top: 50%;\r\n  right: 120%; }\r\n\r\n@media screen and (max-width: 700px) {\r\n  #trim-video-modal #trim-values #end-trim,\r\n  #trim-video-modal #trim-values #start-trim {\r\n    -webkit-box-direction: normal;\r\n    -webkit-box-orient: vertical;\r\n    -webkit-flex-direction: column;\r\n    -ms-flex-direction: column;\r\n    flex-direction: column; }\r\n    #trim-video-modal #trim-values #end-trim label,\r\n    #trim-video-modal #trim-values #start-trim label {\r\n      margin-right: 0; } }\r\n#video-trimmer .noUi-target {\r\n  background: transparent; }\r\n#video-trimmer #second-trim-handler {\r\n  left: -4px; }\r\n#video-trimmer .noUi-base {\r\n  width: initial;\r\n  margin: 0 14px 0 7px; }\r\n#video-trimmer .noUi-horizontal .noUi-handle {\r\n  border: 1px solid rgba(50, 50, 50, 0.9);\r\n  width: 17px;\r\n  height: 50px;\r\n  left: -7px;\r\n  top: 25px;\r\n  transform: initial;\r\n  z-index: initial !important;\r\n  cursor: pointer; }\r\n\r\n#trim-values {\r\n  display: -webkit-box;\r\n  display: -webkit-flex;\r\n  display: -ms-flexbox;\r\n  display: flex;\r\n  -webkit-box-pack: justify;\r\n  -ms-flex-pack: justify;\r\n  -webkit-justify-content: space-between;\r\n  justify-content: space-between; }\r\n  @media screen and (max-width: 500px) {\r\n    #trim-values input {\r\n      width: 50px; } }\r\n\r\n#video-duration-seconds-text {\r\n  display: inline-block;\r\n  min-width: 51px; }\r\n\r\n#trim-modal-message {\r\n  background-color: #b4401f;\r\n  color: #fff;\r\n  display: block;\r\n  font-size: 1.0rem;\r\n  line-height: 1rem;\r\n  margin-bottom: 5px;\r\n  padding: 4px;\r\n  text-align: center; }\r\n\r\n.preview-container {\r\n  overflow: hidden;\r\n  position: relative;\r\n  margin: 0 auto; }\r\n\r\n#trim-video-duration {\r\n  -webkit-align-self: center;\r\n  -ms-flex-item-align: center;\r\n  align-self: center; }\r\n\r\nvideo {\r\n  position: absolute;\r\n  height: 100%;\r\n  top: 0;\r\n  left: 0; }\r\n\r\n#end-trim,\r\n#start-trim {\r\n  -webkit-box-align: center;\r\n  -ms-flex-align: center;\r\n  -webkit-align-items: center;\r\n  align-items: center;\r\n  display: -webkit-box;\r\n  display: -webkit-flex;\r\n  display: -ms-flexbox;\r\n  display: flex;\r\n  -webkit-box-direction: normal;\r\n  -webkit-box-orient: horizontal;\r\n  -webkit-flex-direction: row;\r\n  -ms-flex-direction: row;\r\n  flex-direction: row; }\r\n  #end-trim label,\r\n  #start-trim label {\r\n    margin-right: 7px; }\r\n\r\n#start-trim {\r\n  margin-right: 10px; }\r\n\r\n#end-trim {\r\n  margin-left: 10px; }\r\n\r\n#play-trim-video-button {\r\n  height: 100%;\r\n  left: 0;\r\n  position: absolute;\r\n  top: 0;\r\n  width: 100%;\r\n  z-index: 30; }\r\n  #play-trim-video-button .icon-play-video {\r\n    font-size: 54px;\r\n    height: 120px;\r\n    margin: 0;\r\n    width: 120px;\r\n    transform: translate(-50%, -50%);\r\n    top: 50%;\r\n    left: 50%;\r\n    z-index: 21;\r\n    position: absolute;\r\n    display: -webkit-box;\r\n    display: -webkit-flex;\r\n    display: -ms-flexbox;\r\n    display: flex;\r\n    -webkit-box-align: center;\r\n    -ms-flex-align: center;\r\n    -webkit-align-items: center;\r\n    align-items: center;\r\n    -webkit-box-pack: center;\r\n    -ms-flex-pack: center;\r\n    -webkit-justify-content: center;\r\n    justify-content: center; }\r\n    #play-trim-video-button .icon-play-video:before {\r\n      margin: 0 0 0 10px; }\r\n\r\n#video-trimmer {\r\n  display: block;\r\n  margin: 0 auto 20px auto;\r\n  position: relative; }\r\n\r\n.video-item {\r\n  margin: 0 auto 20px auto; }\r\n\r\n.video-trim-loading {\r\n  float: left;\r\n  font-family: \"Helvetica Neue\", Calibri, Helvetica, Arial, sans-serif;\r\n  font-size: 96px;\r\n  font-size: 6rem;\r\n  font-weight: 100;\r\n  line-height: 6rem;\r\n  position: relative;\r\n  top: 50%;\r\n  transform: translateY(-50%); }\r\n\r\n#video-trimmer-progress-bar {\r\n  background-color: #ffffff;\r\n  border: 1px solid rgba(50, 50, 50, 0.9);\r\n  border-radius: 2px;\r\n  height: 100px;\r\n  left: 0;\r\n  position: absolute;\r\n  top: 2px;\r\n  width: 4px; }\r\n\r\n.icon-play-video:before {\r\n  content: '';\r\n  width: 0;\r\n  height: 0;\r\n  border-top: 30px solid transparent;\r\n  border-bottom: 30px solid transparent;\r\n  border-left: 49px solid white; }\r\n\r\n.icon-loading:before {\r\n  content: \"\";\r\n  border: 2px solid #f3f3f3;\r\n  border-top: 2px solid transparent;\r\n  border-radius: 50%;\r\n  width: 7px;\r\n  height: 7px;\r\n  animation: spin 2s linear infinite; }\r\n\r\n.icon-loading:after,\r\n.icon-play-video:after {\r\n  content: '';\r\n  z-index: -1;\r\n  position: absolute;\r\n  border-radius: 50%;\r\n  background-color: rgba(74, 74, 74, 0.9);\r\n  height: 100%;\r\n  width: 100%;\r\n  left: 0;\r\n  top: 0; }\r\n\r\n._hidden {\r\n  display: none !important; }\r\n\r\n#trim-values {\r\n  color: #9b9b9b; }\r\n  #trim-values .video-trim-input {\r\n    border: 1px solid #979797;\r\n    border-radius: 1px;\r\n    color: #4A4A4A;\r\n    font-family: fira_sansregular, Helvetica, Arial, sans-serif;\r\n    letter-spacing: 1px;\r\n    padding: 7px;\r\n    width: 70px; }\r\n\r\n#video-thumbnail-slider {\r\n  height: 100px; }\r\n", ""]);

// exports


        /***/
    }),
    /* 3 */
    /***/ (function (module, exports) {

        /*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
        module.exports = function (useSourceMap) {
            var list = [];

            // return the list of modules as css string
            list.toString = function toString() {
                return this.map(function (item) {
                    var content = cssWithMappingToString(item, useSourceMap);
                    if (item[2]) {
                        return "@media " + item[2] + "{" + content + "}";
                    } else {
                        return content;
                    }
                }).join("");
            };

            // import a list of modules into the list
            list.i = function (modules, mediaQuery) {
                if (typeof modules === "string")
                    modules = [[null, modules, ""]];
                var alreadyImportedModules = {};
                for (var i = 0; i < this.length; i++) {
                    var id = this[i][0];
                    if (typeof id === "number")
                        alreadyImportedModules[id] = true;
                }
                for (i = 0; i < modules.length; i++) {
                    var item = modules[i];
                    // skip already imported module
                    // this implementation is not 100% perfect for weird media query combinations
                    //  when a module is imported multiple times with different media queries.
                    //  I hope this will never occur (Hey this way we have smaller bundles)
                    if (typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
                        if (mediaQuery && !item[2]) {
                            item[2] = mediaQuery;
                        } else if (mediaQuery) {
                            item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
                        }
                        list.push(item);
                    }
                }
            };
            return list;
        };

        function cssWithMappingToString(item, useSourceMap) {
            var content = item[1] || '';
            var cssMapping = item[3];
            if (!cssMapping) {
                return content;
            }

            if (useSourceMap && typeof btoa === 'function') {
                var sourceMapping = toComment(cssMapping);
                var sourceURLs = cssMapping.sources.map(function (source) {
                    return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
                });

                return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
            }

            return [content].join('\n');
        }

// Adapted from convert-source-map (MIT)
        function toComment(sourceMap) {
            // eslint-disable-next-line no-undef
            var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
            var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

            return '/*# ' + data + ' */';
        }


        /***/
    }),
    /* 4 */
    /***/ (function (module, exports, __webpack_require__) {

        /*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

        var stylesInDom = {};

        var memoize = function (fn) {
            var memo;

            return function () {
                if (typeof memo === "undefined") memo = fn.apply(this, arguments);
                return memo;
            };
        };

        var isOldIE = memoize(function () {
            // Test for IE <= 9 as proposed by Browserhacks
            // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
            // Tests for existence of standard globals is to allow style-loader
            // to operate correctly into non-standard environments
            // @see https://github.com/webpack-contrib/style-loader/issues/177
            return window && document && document.all && !window.atob;
        });

        var getElement = (function (fn) {
            var memo = {};

            return function (selector) {
                if (typeof memo[selector] === "undefined") {
                    var styleTarget = fn.call(this, selector);
                    // Special case to return head of iframe instead of iframe itself
                    if (styleTarget instanceof window.HTMLIFrameElement) {
                        try {
                            // This will throw an exception if access to iframe is blocked
                            // due to cross-origin restrictions
                            styleTarget = styleTarget.contentDocument.head;
                        } catch (e) {
                            styleTarget = null;
                        }
                    }
                    memo[selector] = styleTarget;
                }
                return memo[selector]
            };
        })(function (target) {
            return document.querySelector(target)
        });

        var singleton = null;
        var singletonCounter = 0;
        var stylesInsertedAtTop = [];

        var fixUrls = __webpack_require__(5);

        module.exports = function (list, options) {
            if (typeof DEBUG !== "undefined" && DEBUG) {
                if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
            }

            options = options || {};

            options.attrs = typeof options.attrs === "object" ? options.attrs : {};

            // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
            // tags it will allow on a page
            if (!options.singleton) options.singleton = isOldIE();

            // By default, add <style> tags to the <head> element
            if (!options.insertInto) options.insertInto = "head";

            // By default, add <style> tags to the bottom of the target
            if (!options.insertAt) options.insertAt = "bottom";

            var styles = listToStyles(list, options);

            addStylesToDom(styles, options);

            return function update(newList) {
                var mayRemove = [];

                for (var i = 0; i < styles.length; i++) {
                    var item = styles[i];
                    var domStyle = stylesInDom[item.id];

                    domStyle.refs--;
                    mayRemove.push(domStyle);
                }

                if (newList) {
                    var newStyles = listToStyles(newList, options);
                    addStylesToDom(newStyles, options);
                }

                for (var i = 0; i < mayRemove.length; i++) {
                    var domStyle = mayRemove[i];

                    if (domStyle.refs === 0) {
                        for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

                        delete stylesInDom[domStyle.id];
                    }
                }
            };
        };

        function addStylesToDom(styles, options) {
            for (var i = 0; i < styles.length; i++) {
                var item = styles[i];
                var domStyle = stylesInDom[item.id];

                if (domStyle) {
                    domStyle.refs++;

                    for (var j = 0; j < domStyle.parts.length; j++) {
                        domStyle.parts[j](item.parts[j]);
                    }

                    for (; j < item.parts.length; j++) {
                        domStyle.parts.push(addStyle(item.parts[j], options));
                    }
                } else {
                    var parts = [];

                    for (var j = 0; j < item.parts.length; j++) {
                        parts.push(addStyle(item.parts[j], options));
                    }

                    stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
                }
            }
        }

        function listToStyles(list, options) {
            var styles = [];
            var newStyles = {};

            for (var i = 0; i < list.length; i++) {
                var item = list[i];
                var id = options.base ? item[0] + options.base : item[0];
                var css = item[1];
                var media = item[2];
                var sourceMap = item[3];
                var part = {css: css, media: media, sourceMap: sourceMap};

                if (!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
                else newStyles[id].parts.push(part);
            }

            return styles;
        }

        function insertStyleElement(options, style) {
            var target = getElement(options.insertInto)

            if (!target) {
                throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
            }

            var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

            if (options.insertAt === "top") {
                if (!lastStyleElementInsertedAtTop) {
                    target.insertBefore(style, target.firstChild);
                } else if (lastStyleElementInsertedAtTop.nextSibling) {
                    target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
                } else {
                    target.appendChild(style);
                }
                stylesInsertedAtTop.push(style);
            } else if (options.insertAt === "bottom") {
                target.appendChild(style);
            } else if (typeof options.insertAt === "object" && options.insertAt.before) {
                var nextSibling = getElement(options.insertInto + " " + options.insertAt.before);
                target.insertBefore(style, nextSibling);
            } else {
                throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
            }
        }

        function removeStyleElement(style) {
            if (style.parentNode === null) return false;
            style.parentNode.removeChild(style);

            var idx = stylesInsertedAtTop.indexOf(style);
            if (idx >= 0) {
                stylesInsertedAtTop.splice(idx, 1);
            }
        }

        function createStyleElement(options) {
            var style = document.createElement("style");

            options.attrs.type = "text/css";

            addAttrs(style, options.attrs);
            insertStyleElement(options, style);

            return style;
        }

        function createLinkElement(options) {
            var link = document.createElement("link");

            options.attrs.type = "text/css";
            options.attrs.rel = "stylesheet";

            addAttrs(link, options.attrs);
            insertStyleElement(options, link);

            return link;
        }

        function addAttrs(el, attrs) {
            Object.keys(attrs).forEach(function (key) {
                el.setAttribute(key, attrs[key]);
            });
        }

        function addStyle(obj, options) {
            var style, update, remove, result;

            // If a transform function was defined, run it on the css
            if (options.transform && obj.css) {
                result = options.transform(obj.css);

                if (result) {
                    // If transform returns a value, use that instead of the original css.
                    // This allows running runtime transformations on the css.
                    obj.css = result;
                } else {
                    // If the transform function returns a falsy value, don't add this css.
                    // This allows conditional loading of css
                    return function () {
                        // noop
                    };
                }
            }

            if (options.singleton) {
                var styleIndex = singletonCounter++;

                style = singleton || (singleton = createStyleElement(options));

                update = applyToSingletonTag.bind(null, style, styleIndex, false);
                remove = applyToSingletonTag.bind(null, style, styleIndex, true);

            } else if (
                obj.sourceMap &&
                typeof URL === "function" &&
                typeof URL.createObjectURL === "function" &&
                typeof URL.revokeObjectURL === "function" &&
                typeof Blob === "function" &&
                typeof btoa === "function"
            ) {
                style = createLinkElement(options);
                update = updateLink.bind(null, style, options);
                remove = function () {
                    removeStyleElement(style);

                    if (style.href) URL.revokeObjectURL(style.href);
                };
            } else {
                style = createStyleElement(options);
                update = applyToTag.bind(null, style);
                remove = function () {
                    removeStyleElement(style);
                };
            }

            update(obj);

            return function updateStyle(newObj) {
                if (newObj) {
                    if (
                        newObj.css === obj.css &&
                        newObj.media === obj.media &&
                        newObj.sourceMap === obj.sourceMap
                    ) {
                        return;
                    }

                    update(obj = newObj);
                } else {
                    remove();
                }
            };
        }

        var replaceText = (function () {
            var textStore = [];

            return function (index, replacement) {
                textStore[index] = replacement;

                return textStore.filter(Boolean).join('\n');
            };
        })();

        function applyToSingletonTag(style, index, remove, obj) {
            var css = remove ? "" : obj.css;

            if (style.styleSheet) {
                style.styleSheet.cssText = replaceText(index, css);
            } else {
                var cssNode = document.createTextNode(css);
                var childNodes = style.childNodes;

                if (childNodes[index]) style.removeChild(childNodes[index]);

                if (childNodes.length) {
                    style.insertBefore(cssNode, childNodes[index]);
                } else {
                    style.appendChild(cssNode);
                }
            }
        }

        function applyToTag(style, obj) {
            var css = obj.css;
            var media = obj.media;

            if (media) {
                style.setAttribute("media", media)
            }

            if (style.styleSheet) {
                style.styleSheet.cssText = css;
            } else {
                while (style.firstChild) {
                    style.removeChild(style.firstChild);
                }

                style.appendChild(document.createTextNode(css));
            }
        }

        function updateLink(link, options, obj) {
            var css = obj.css;
            var sourceMap = obj.sourceMap;

            /*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
            var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

            if (options.convertToAbsoluteUrls || autoFixUrls) {
                css = fixUrls(css);
            }

            if (sourceMap) {
                // http://stackoverflow.com/a/26603875
                css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
            }

            var blob = new Blob([css], {type: "text/css"});

            var oldSrc = link.href;

            link.href = URL.createObjectURL(blob);

            if (oldSrc) URL.revokeObjectURL(oldSrc);
        }


        /***/
    }),
    /* 5 */
    /***/ (function (module, exports) {


        /**
         * When source maps are enabled, `style-loader` uses a link element with a data-uri to
         * embed the css on the page. This breaks all relative urls because now they are relative to a
         * bundle instead of the current page.
         *
         * One solution is to only use full urls, but that may be impossible.
         *
         * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
         *
         * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
         *
         */

        module.exports = function (css) {
            // get current location
            var location = typeof window !== "undefined" && window.location;

            if (!location) {
                throw new Error("fixUrls requires window.location");
            }

            // blank or null?
            if (!css || typeof css !== "string") {
                return css;
            }

            var baseUrl = location.protocol + "//" + location.host;
            var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

            // convert each url(...)
            /*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
            var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function (fullMatch, origUrl) {
                // strip quotes (if they exist)
                var unquotedOrigUrl = origUrl
                    .trim()
                    .replace(/^"(.*)"$/, function (o, $1) {
                        return $1;
                    })
                    .replace(/^'(.*)'$/, function (o, $1) {
                        return $1;
                    });

                // already a full url? no change
                if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
                    return fullMatch;
                }

                // convert the url to a full url
                var newUrl;

                if (unquotedOrigUrl.indexOf("//") === 0) {
                    //TODO: should we add protocol?
                    newUrl = unquotedOrigUrl;
                } else if (unquotedOrigUrl.indexOf("/") === 0) {
                    // path should be relative to the base url
                    newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
                } else {
                    // path should be relative to current directory
                    newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
                }

                // send back the fixed url(...)
                return "url(" + JSON.stringify(newUrl) + ")";
            });

            // send back the fixed css
            return fixedCss;
        };


        /***/
    }),
    /* 6 */
    /***/ (function (module, __webpack_exports__, __webpack_require__) {

        "use strict";
        Object.defineProperty(__webpack_exports__, "__esModule", {value: true});
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_0__css_videoTrimModal_css__ = __webpack_require__(1);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_0__css_videoTrimModal_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__css_videoTrimModal_css__);
        /* videoTrimModal - 1.0.0 - 01-Sep-2017 10:35:34 */


        var noUiSlider = __webpack_require__(0);

        (function (factory) {
            window.videoTrimModal = factory();
        }(function () {

            var VERSION = 1.0,
                options = null,
                slider = null,
                targetElement = null,
                startTime = null,
                endTime = null,
                progressBar = null,
                videoTrimPanel = null,
                videoTrimLoading = null,
                videoItem = null,
                videoElement = null,
                thumbnailCanvas = null,
                videoHeight = 0,
                videoWidth = 0,
                videoDuration = 0,
                previousVideoTime = 0,
                trimModalMessage = null,
                videoTrimmer = null,
                widthOfThumbnailCanvas = null,
                noUiSliderWidth = null,
                leftMarginOfThumbnailCanvas = 0,
                trimValues = null,
                startTrimElement = null,
                endTrimElement = null,
                videoTrimInputs = null,
                durationSeconds = null,
                durationMinutes = null,
                durationMinutesText = null,
                videoElementJQuery = null;

            function addElements(target) {

                var html =
                    '<div id="video-trim-loading" class="panel -message">Loading...</div>' +
                    '<div id="video-trim-panel" class="_hidden">' +
                    '<div class="screen-size-video video-item disable-video-loop" data-preview-video-src="">' +
                    '<div class="preview-container"></div>' +
                    '</div>' +
                    '<div id="trim-modal-message"></div>' +
                    '<div id="video-trimmer">' +
                    '<div id="video-trimmer-progress-bar" class="fast"></div>' +
                    '<canvas id="video-thumbnail-slider"></canvas>' +
                    '<div id="trim-slider"></div>' +
                    '</div>' +
                    '<div id="trim-values">' +
                    '<span id="start-trim">' +
                    '<label for="start-trim-time">Start Time</label>' +
                    '<input type="number" id="start-trim-time" class="input video-trim-input" maxlength="6"/>' +
                    '</span>' +
                    '<span id="trim-video-duration">Duration: ' +
                    '<span id="video-duration-minutes-text"><span id="video-duration-minutes"></span> min </span>' +
                    '<span id="video-duration-seconds-text"><span id="video-duration-seconds"></span> sec</span>' +
                    '</span>' +
                    '<span id="end-trim">' +
                    '<label for="end-trim-time">End Time</label>' +
                    '<input type="number" id="end-trim-time" class="input video-trim-input" maxlength="6"/>' +
                    '</span>' +
                    '</div>' +
                    '</div>';

                $(target).append(html);
                targetElement = $(target);
                videoTrimPanel = $('#video-trim-panel');
                videoTrimLoading = $('#video-trim-loading');
                slider = $('#trim-slider').get(0);
                videoTrimmer = $('#video-trimmer');
                trimModalMessage = $('#trim-modal-message');
                thumbnailCanvas = $('#video-thumbnail-slider');
                progressBar = $('#video-trimmer-progress-bar');
                trimValues = $('#trim-values');
                startTrimElement = $('#start-trim-time');
                endTrimElement = $('#end-trim-time');
                videoTrimInputs = $('.video-trim-input');
                durationSeconds = $('#video-duration-seconds');
                durationMinutes = $('#video-duration-minutes');
                durationMinutesText = $('#video-duration-minutes-text');
                trimModalMessage.hide();
            }

            /**
             * Loads thumbnail image
             */
            function createNoUiSlider() {
                videoTrimLoading.addClass('_hidden');
                videoTrimPanel.removeClass('_hidden');

                videoTrimInputs.on('blur', onInputKeyUpAndBlur.bind(this));
                attachTypingStoppedHandler(videoTrimInputs, onInputKeyUpAndBlur.bind(this));

                //Define slider
                noUiSlider.create(slider, {
                    start: [options.start[0], options.start[1]],
                    connect: false,
                    behaviour: 'drag',
                    margin: options.margin,
                    range: {
                        'min': options.range.min,
                        'max': options.range.max
                    }
                });

                startTime = options.start[0];
                endTime = options.start[1];

                var handlers = slider.querySelectorAll('.noUi-handle');
                var ids = ['first-trim-handler', 'second-trim-handler'];

                for (var i = 0; i < handlers.length; i++) {
                    $(handlers[i]).attr('id', ids[i]);
                }

                slider.noUiSlider.on('update', onUiSliderUpdate.bind(this));
                onVideoAdded();
            }

            /**
             * Handler for when user enters a number in start and end time ,
             * @param {Event} e
             */
            function onInputKeyUpAndBlur(e) {
                var target = $(e.target);
                if (!target.val()) {
                    target.val(0.00);
                }
                var startTimeVal = parseFloat(startTrimElement.val()),
                    endTimeVal = parseFloat(endTrimElement.val());

                if (startTimeVal > endTimeVal - options.margin) {
                    if (target.attr('id') === 'start-trim-time') {
                        startTrimElement.val(endTimeVal - options.margin);
                    } else {
                        endTrimElement.val(startTimeVal + options.margin);
                    }
                }
                slider.noUiSlider.set([parseFloat(startTrimElement.val()), parseFloat(endTrimElement.val())]);
            }

            /**
             * Handler function which updates the fancy text when the user stops typing in the fancy text input field.
             * @param {jQuery} el
             * @param {function} handler
             */
            function attachTypingStoppedHandler(el, handler) {
                el.on('keypress input paste', handler_);

                var inputChangeDelay = null;

                function handler_(e) {
                    if (inputChangeDelay) {
                        clearTimeout(inputChangeDelay);
                    }

                    if (typeof e.which !== 'undefined' && e.which === 13) {
                        handler(e);
                        return;
                    }

                    inputChangeDelay = setTimeout(handler.bind(this, e), 500);
                }
            }

            /**
             * Adds video to trim modal
             */
            function addVideo(src) {
                var newVideoElement = document.createElement('video');
                newVideoElement.crossOrigin = 'anonymous';
                newVideoElement.onloadedmetadata = onVideoDataLoaded.bind(this);
                newVideoElement.addEventListener('abort', onError.bind(this), false);
                newVideoElement.addEventListener('error', onError.bind(this), false);
                newVideoElement.style.zIndex = "3";
                newVideoElement.src = src;
                videoTrimPanel.find('.preview-container').append(newVideoElement);
                videoItem = $('#video-trim-panel .video-item');
                videoElementJQuery = videoItem.find('video');
                videoElementJQuery.attr('data-can-pause', '1');
                videoElementJQuery.attr('data-delayed-pause', '0');
                videoElement = videoElementJQuery.get(0);
            }

            function onVideoDataLoaded(e) {
                videoWidth = e.target.videoWidth;
                videoHeight = e.target.videoHeight;
                videoDuration = e.target.duration;

                //Set width and height of the preview to maximum possible
                var videoAspectRatio = videoWidth / videoHeight,
                    maxContentHeight = options.maxHeight - (videoTrimPanel.find('.video-item').outerHeight(true) - videoTrimPanel.find('.video-item').height()) - videoTrimmer.outerHeight(true) - trimValues.height(),
                    maxContentWidth = options.maxWidth,
                    height,
                    width;

                if (videoAspectRatio * maxContentHeight < maxContentWidth) {
                    height = maxContentHeight;
                    width = maxContentHeight * videoAspectRatio;
                } else {
                    height = maxContentWidth / videoAspectRatio;
                    width = maxContentWidth;
                }

                videoItem.find('.preview-container').css({
                    width: width + "px",
                    height: height + "px"
                });

                if (!options.start) {
                    options.start = [0, videoDuration];
                } else {
                    if (options.start[1] > videoDuration) {
                        options.start[1] = videoDuration;
                    }
                }
                if (!options.range) {
                    options.range = {
                        'min': 0,
                        'max': videoDuration
                    }
                } else {
                    if (options.range.max > videoDuration) {
                        options.start.max = videoDuration;
                    }
                }
                console.log('range', options.range);
                createNoUiSlider();
            }

            /**
             * Handler for when video element is added
             */
            function onVideoAdded() {
                createThumbnailSlider();
                onClick(videoElementJQuery, null, pauseVideo.bind(this));
                setInterval(animateProgressBar.bind(this), 20);
                videoElement.addEventListener('timeupdate', onVideoTimeUpdate.bind(this), false);
                videoElement.addEventListener('pause', showVideoPlayButton.bind(this), false);
                showVideoPlayButton();
            }

            /**
             * On click handler
             * @see https://api.jquerymobile.com/vclick/
             * @param {jQuery} el Bind click handler to this DOM element
             * @param {string|null} s An optional selector. Pass null if you don't want to specify this.
             * @param {Function} h The handler function
             * @returns {jQuery} The element passed
             */
            function onClick(el, s, h) {
                el.on('click', s, function (e) {
                    e.preventDefault();
                    h.apply(this, [e]);
                });

                return el;
            }

            /**
             * Animates the progress bar for video
             */
            function animateProgressBar() {
                if (videoElement.currentTime !== previousVideoTime) {
                    var videoCurrentTime = videoElement.currentTime,
                        allowedDifference = 0.1;

                    if (videoCurrentTime < startTime) {
                        videoElement.currentTime = startTime;
                    }
                    if (videoCurrentTime > endTime) {
                        videoElement.currentTime = endTime;
                    }

                    if (videoCurrentTime >= endTime || videoCurrentTime + allowedDifference < startTime) {
                        pauseVideo();
                    }

                    // CodeReviewHamza: above you are using the .animated class, but here you are using a Jquery function to animate. Try using only CSS, but if not possible then don't bother with the .animated class (or the .fast class)
                    progressBar.stop().animate({
                        left: ((videoElement.currentTime / videoDuration) * noUiSliderWidth) + leftMarginOfThumbnailCanvas + "px"
                    }, 20);
                    previousVideoTime = videoElement.currentTime;
                }
            }

            /**
             * Shows the play video button needed for mobile, because videos can't be played unless there is user action
             */
            function showVideoPlayButton() {
                var playVideoButton = $('#play-trim-video-button');

                if (!playVideoButton.get(0)) {
                    var playVideoElement = "<div id='play-trim-video-button'><i class='icon-play-video -big'></i></div>";
                    videoItem.find('.preview-container').append(playVideoElement);
                    playVideoButton = $('#play-trim-video-button');
                    onClick(playVideoButton, null, onPlayVideoButton.bind(this, playVideoButton));
                } else {
                    playVideoButton.show();
                }
            }

            /**
             * Handler for play video button.
             * @param {jQuery} playVideoButton
             */
            function onPlayVideoButton(playVideoButton) {
                if (videoElement.currentTime >= (endTime - 0.1)) {
                    videoElement.currentTime = startTime;
                }

                playVideoButton.hide();
                playVideo();
            }

            /**
             * Handler for when video time is update
             */
            function onVideoTimeUpdate() {
                var videoCurrentTime = videoElement.currentTime;

                if (videoCurrentTime < startTime) {
                    videoElement.currentTime = startTime;
                }
                if (videoCurrentTime >= endTime || videoCurrentTime < startTime) {
                    pauseVideo();
                    progressBar.removeClass('animated');
                } else if (!progressBar.hasClass('animated')) {
                    progressBar.addClass('animated');
                }
            }

            /**
             * Error callback
             */
            function onError() {
                console.error('Error on loading video please check if the url videoSrc provided is valid.');
            }

            /**
             * Pauses the video
             */
            function pauseVideo() {
                if (videoElementJQuery.attr('data-can-pause') === '1') {
                    videoElement.pause();
                } else {
                    videoElementJQuery.attr('data-delayed-pause', '1');
                }
            }

            /**
             * Plays the video
             */
            function playVideo() {
                videoElementJQuery.attr('data-can-pause', '0');
                var playPromise = videoElement.play();
                if (playPromise !== undefined) {
                    playPromise.then(
                        onVideoPlayed_
                    ).catch(function () {
                        onError();
                    });
                } else {
                    onVideoPlayed_();
                }
            }

            /**
             * Handler when video played has completed
             * @private
             */
            function onVideoPlayed_() {
                if (videoElementJQuery.attr('data-delayed-pause') === '1') {
                    videoElementJQuery.attr('data-delayed-pause', '0');
                    videoElement.pause();
                }
                videoElementJQuery.attr('data-can-pause', '1');
            }

            /**
             * Creates the thumbnail slider
             */
            function createThumbnailSlider() {
                var maxContentWidth = options.maxWidth,
                    heightOfCanvas = 100,
                    maxWidthOfEachThumbnail = 140,
                    fullWidthOfEachThumbnail = ((videoWidth / videoHeight) * heightOfCanvas),
                    widthOfEachThumbnail = fullWidthOfEachThumbnail > maxWidthOfEachThumbnail ? maxWidthOfEachThumbnail : fullWidthOfEachThumbnail,
                    numberOfThumbnails = Math.floor(maxContentWidth / widthOfEachThumbnail),
                    thumbnailIndex = 0,
                    canvas = thumbnailCanvas.get(0),
                    thumbnailsCreated = false,
                    ctx = canvas.getContext('2d');

                widthOfThumbnailCanvas = numberOfThumbnails * widthOfEachThumbnail;

                canvas.width = widthOfThumbnailCanvas;
                canvas.height = heightOfCanvas;

                $('#trim-slider').css({
                    width: widthOfThumbnailCanvas + "px",
                    height: heightOfCanvas + "px"
                });
                videoTrimmer.css({
                    width: widthOfThumbnailCanvas + "px",
                    height: heightOfCanvas + "px"
                });

                leftMarginOfThumbnailCanvas = parseFloat(($('.noUi-base').css('marginLeft')).replace('px', ''));
                onClick($('#trim-slider .noUi-base'), null, onTrimSlider.bind(this));
                noUiSliderWidth = $('.noUi-base').width();

                progressBar.css({
                    left: ((startTime / videoDuration) * noUiSliderWidth) + leftMarginOfThumbnailCanvas + "px",
                    height: (heightOfCanvas - 4) + "px"
                });

                var newVideoElement = document.createElement('video');
                newVideoElement.crossOrigin = 'anonymous';
                newVideoElement.onloadedmetadata = onCanvasVideoDataLoaded.bind(this);
                newVideoElement.addEventListener('abort', onError.bind(this), false);
                newVideoElement.addEventListener('error', onError.bind(this), false);
                newVideoElement.src = options.videoSrc;

                function onCanvasVideoDataLoaded(e) {
                    var videoWidth = e.target.videoWidth,
                        scaledRatio = e.target.videoHeight / heightOfCanvas;

                    newVideoElement.addEventListener('seeked', videoSeeked.bind(this), false);
                    newVideoElement.currentTime = 0.01;

                    function videoSeeked() {
                        if (!thumbnailsCreated) {

                            ctx.drawImage(newVideoElement, (videoWidth - widthOfEachThumbnail * scaledRatio) / 2, 0, widthOfEachThumbnail * scaledRatio, heightOfCanvas * scaledRatio, thumbnailIndex * widthOfEachThumbnail, 0, widthOfEachThumbnail, heightOfCanvas);
                            ctx.beginPath();
                            ctx.moveTo(thumbnailIndex * widthOfEachThumbnail, 0);
                            ctx.lineTo(thumbnailIndex * widthOfEachThumbnail, heightOfCanvas);
                            ctx.stroke();
                            thumbnailIndex++;
                            if (thumbnailIndex < numberOfThumbnails) {
                                newVideoElement.currentTime = thumbnailIndex * (videoDuration / (numberOfThumbnails + 1));
                            } else {
                                thumbnailsCreated = true;
                            }
                        }
                    }
                }
            }

            /**
             * Handler for when user clicks on the trim slider
             * @param e Event data
             */
            function onTrimSlider(e) {
                if ($(e.target).hasClass('noUi-handle')) {
                    return;
                }

                if (videoElement) {
                    var time = (e.offsetX / widthOfThumbnailCanvas) * videoDuration;
                    if (time >= startTime && time <= endTime) {
                        videoElement.currentTime = (e.offsetX / widthOfThumbnailCanvas) * videoDuration;

                        progressBar.css({
                            left: e.offsetX + leftMarginOfThumbnailCanvas + "px"
                        });
                        previousVideoTime = videoElement.currentTime;
                        pauseVideo();
                    }
                }
            }

            /**
             * Slider value update handler
             * @param {Array} values
             * @param {number} handle
             */
            function onUiSliderUpdate(values, handle) {
                var value = values[handle],
                    duration = values[1] - values[0],
                    secondPart = 0;

                if (handle === 0) {
                    startTime = parseFloat(value);
                    startTrimElement.val(startTime);
                } else {
                    endTime = parseFloat(value);
                    endTrimElement.val(endTime);
                }

                if (videoElement) {
                    videoElement.currentTime = (handle === 1 ? endTime : startTime);
                    progressBar.css({
                        left: ((videoElement.currentTime / videoDuration) * noUiSliderWidth) + leftMarginOfThumbnailCanvas + "px"
                    });
                    previousVideoTime = videoElement.currentTime;
                    pauseVideo();
                }


                if (duration < 60) {
                    // Same for the IDs / elements below: #video-duration-minutes-text, #video-duration-minutes, #video-duration-seconds
                    durationMinutesText.hide();
                    secondPart = Math.floor(duration * 100) / 100;
                } else {
                    var minutePart = Math.floor(duration / 60);

                    secondPart = Math.round((duration - minutePart * 60) * 100) / 100;
                    durationMinutesText.show();
                    durationMinutes.html(minutePart);
                }

                durationSeconds.html(secondPart);
                fireUpdateEvent(handle);
            }

            /**
             * Fires when either of the handle values are updated
             * @param handle
             */
            function fireUpdateEvent(handle) {
                targetElement.trigger("update", [[startTime, endTime], handle]);
            }

            /**
             * Checks if all the options are correct
             * @param options
             * @return array
             */
            function checkOptions(options) {
                if (!options.videoSrc) {
                    console.error('Error no videoSrc given');
                    return null;
                }
                if (options.margin && options.margin < 0) {
                    console.error("margin attribute can't be a negative number");
                    return null;
                }
                if (options.start && options.start.length !== 2) {
                    console.error('start property should be an array with 2 values i.e [0,4]');
                    return null;
                }
                if (options.range && (!options.range.min && !options.range.max)) {
                    console.error('range property should be an object with min and max keys');
                    return null;
                }
                if (!options.maxHeight) {
                    options.maxHeight = 500;
                }
                if (!options.maxWidth) {
                    options.maxWidth = 500;
                }
                if (!options.margin) {
                    options.margin = 0.1;
                }
                return options;
            }

            // Run the standard initializer
            function initialize(target, originalOptions) {
                options = checkOptions(originalOptions);
                if (!options) {
                    return;
                }
                target.style.width = options.maxWidth;
                target.style.height = options.maxHeight;
                addElements(target);
                addVideo(options.videoSrc);
            }

            return {
                version: VERSION,
                create: initialize
            };
        }));

        /***/
    })
    /******/]);