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

async function getAPIs(){
    let x = webpackRequire(48627)
    let y = await x.createPlatformWeb()
    let z = y.getRegistry();
    return Array.from(z._map)
}

async function getPlayerAPI(){
    return (await getAPIs())[19][1].instance;
}

let playerAPI = null;

async function createPlayerAPI(){
    window.playerAPI  = await getPlayerAPI();
    if(window.playerAPI == null) setTimeout(createPlayerAPI, 1000);
    
}

document.body.onload = createPlayerAPI;


window.addEventListener('spotifyExtensionMessage', (e) => {

    if (e.detail.type == 'command'){
        spotifyController[e.detail.data]();
    } else if(e.detail.type == 'dataRequest'){
        if(e.detail.data == 'songData'){
            let detail = {}
            if(window.playerAPI != null && window.playerAPI._harmony._controller._state){
                let controller = window.playerAPI._harmony._controller;
                detail.data = {
                    'title': controller._state.track_window.current_track.name,
                    'artist': controller._state.track_window.current_track.artists[0].name,
                    'time': controller._progressPosition
                }
            }
            let newEvent = new CustomEvent('spotifyExtensionMessageResponse',{
                'detail': detail
            });

            window.dispatchEvent(newEvent);
        }
    }
})