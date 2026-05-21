# Spotify Chrome Extension
This is the code for a spotify chrome extension I wrote that added extra functionality to the spotify webpage.

It added audio visualizers, improved UI & lyrics displays (similar to the iOS app version), and monkeypatched into the spotify web api.

Whenever Spotify pushes new code to the web version, the webpacked classnames change and so I have to update inject.js. I'm not actively maintaining it,
but it can be done without too much effort. Someone with more time can make it find the classnames dynamically. "classname list.txt" contains my notes on disecting the API.
