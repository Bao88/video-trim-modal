<html>
<head>
    <title>Testing Trim modal</title>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <script src="../distribution/videoTrimModal.js"></script>
</head>
<body>
<h1>Testing Trim Modal</h1>
<div id="temp" style="margin: 0 auto;"></div>

<script>

    createTrimModal();

    function createTrimModal() {
        var temp = document.getElementById('temp');
        videoTrimModal.create(temp, {
            videoSrc: 'http://local.dev/trimmodal/test/masking-help.mp4',
        });

        $(temp).on('update', onUpdate.bind(this));
    }

    /**
     * Slider value update handler
     * @param {Object} e
     * @param {Array} values
     * @param {number} handle
     */
    function onUpdate(e, values, handle) {
        console.log(values, handle);
    }
</script>
</body>
</html>