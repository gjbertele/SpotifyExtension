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

let APIList;

async function getAPIs(){
    if(APIList) return APIList;
    let x = webpackRequire(48627)
    let y = await x.createPlatformWeb()
    let z = y.getRegistry();
    APIList = Array.from(z._map);
    return APIList;
}

async function getPlayerAPI(){
    return (await getAPIs())[19][1].instance;
}

let playerAPI = null;

async function createPlayerAPI(){
    window.playerAPI  = await getPlayerAPI();
    if(window.playerAPI == null) setTimeout(createPlayerAPI, 1000);
    
}


document.body.onload = () => {
    createPlayerAPI();
}


window.addEventListener('spotifyExtensionMessage', (e) => {

    if (e.detail.type == 'command'){
        if(spotifyController[e.detail.data]){
            spotifyController[e.detail.data]();
        } else if(e.detail.data == 'seekforwards'){
            window.playerAPI.seekForward(e.detail.time*1000);
        }
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

