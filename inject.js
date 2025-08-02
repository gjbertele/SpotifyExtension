window.webpackChunkclient_web = window.webpackChunkclient_web || [];
window.webpackChunkclient_web.push([
    [Math.random()],
    {},
    (req) => {
        window.webpackRequire = req;
    }
]);


let spotifyController = {}


const originalActionHandler = navigator.mediaSession.setActionHandler;

navigator.mediaSession.setActionHandler = function(...args) {
    if (args[1] != null) {
        spotifyController[args[0]] = args[1];
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
    if (e.detail.commandType) spotifyController[e.detail.commandType]();
})