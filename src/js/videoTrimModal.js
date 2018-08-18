/* videoTrimModal - 1.0.0 - 01-Sep-2017 10:35:34 */
import '../css/videoTrimModal.css';

var noUiSlider = require('nouislider');

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