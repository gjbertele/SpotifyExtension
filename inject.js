window.webpackChunkclient_web = window.webpackChunkclient_web || [];
window.webpackChunkclient_web.push([
    [Math.random()],
    {},
    (req) => {
        window.webpackRequire = req;
    }
]);


let spotifyController = {
    'back': null,
    'skip': null,
    'play': null,
    'pause': null,

};


const originalActionHandler = navigator.mediaSession.setActionHandler;

navigator.mediaSession.setActionHandler = function(...args) {
    if (args[1] != null) {
        console.log(args[0], args[1]);
        switch (args[0]) {
            case 'previoustrack':
                spotifyController.back = args[1];
                break;
            case 'nexttrack':
                spotifyController.skip = args[1];
                break;
            case 'play':
                spotifyController.play = args[1];
                break;
            case 'pause':
                spotifyController.pause = args[1];
                break;
        }
    }

    const boundFn = originalActionHandler.apply(this, args);

    return function(...callArgs) {
        return boundFn.apply(this, callArgs );
    };

};


var getStackTrace = function() {
    var obj = {};
    Error.captureStackTrace(obj, getStackTrace);
    return obj.stack;
};


window.addEventListener('spotifyExtensionMessage', (e) => {
    if (e.detail.commandType) {
        switch (e.detail.commandType) {
            case 'previoustrack':
                spotifyController.back();
                break;
            case 'nexttrack':
                spotifyController.skip();
                break;
            case 'play':
                spotifyController.play();
                break;
            case 'pause':
                spotifyController.pause();
                break;
        }
    }
})