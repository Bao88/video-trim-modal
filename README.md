# videoTrimModal

videoTrimModal is lightweight JavaScript modal for trimming videos.

- **No dependencies**
- All modern browsers are supported


License
-------
videoTrimModal is licensed [WTFPL](http://www.wtfpl.net/about/). You can use it **for free** and **without any attribution**, in any personal or commercial project. You may also fork the project and re-release it under another license you prefer.

npm [(package)](https://www.npmjs.com/package/video-trim-modal)
---
`npm install video-trim-modal --save`

How to use
----------
Download the distribution/videoTrimModal.js or distribution/videoTrimModal.min.js (for smaller buy ugly looking code)
and include the script in your code which ever way you like then use as following

```javascript
var modal = document.getElementById('modal');

videoTrimModal.create(modal, {
  videoSrc: "[video link]"
});
```

Browserify
----------
You can use it in this way:

```javascript
var videoTrimModal = require('videoTrimModal');

var modal = document.getElementById('modal');

videoTrimModal.create(modal, {
  videoSrc: "[video link]"
});
```

Browser support
---------------

All major browsers are supported. 
