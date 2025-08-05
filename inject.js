let APIList, spotifyController;

const patchPlayerElement = () => {
    const originalPlay = HTMLMediaElement.prototype.play;

    HTMLMediaElement.prototype.play = function (...args) {
        if(this.src && spotifyController){
            spotifyController.mediaElement = this; 
            
        }
        return originalPlay.apply(this, args);
    }
    
}

const initializeWebpackAccess = () => {
    window.webpackChunkclient_web = window.webpackChunkclient_web || [];
    window.webpackChunkclient_web.push([
        [Math.random()],
        {},
        (req) => {
            window.webpackRequire = req;
        }
    ]);

    return;
}

const getAPIs = async () => {
    if (APIList) return APIList;
    let x = webpackRequire(48627)
    let y = await x.createPlatformWeb()
    let z = y.getRegistry();
    APIList = Array.from(z._map);
    return APIList;
}

const getPlayerAPI = async () => {
    return (await getAPIs())[19][1].instance;
}

const createPlayerAPI = async () => {
    window.playerAPI = await getPlayerAPI();
    if (window.playerAPI == null){
        setTimeout(createPlayerAPI, 1000);
    } else {
        playerAPICreated();
    }
    return;
}

document.body.onload = createPlayerAPI;

const playerAPICreated = () => {
    window.playerAPI.getEvents().addListener('update', playerUpdated);

    spotifyController = new SpotifyController();
    spotifyController.playerAPI = window.playerAPI;
}

const songPlaying = {};

const playerUpdated = (e) => {
    if(e.data.item.name == songPlaying.title && e.data.item.artists[0].name == songPlaying.artist) return;
    songPlaying.title = e.data.item.name;
    songPlaying.artist = e.data.item.artists[0].name;
    postAlert({
        'type':'newSong',
        'songData': songPlaying
    });
}

const commandHandler = (detail) => {
    if (spotifyController[detail.data]) {
        spotifyController[detail.data]();
    } else if (detail.data == 'seekforwards') {
        spotifyController.seekForward(detail.time * 1000);
    }
}

const postResponse = (data) => {
    let newEvent = new CustomEvent('spotifyExtensionMessageResponse', {
        'detail': data
    });

    window.dispatchEvent(newEvent);
}

const postAlert = (data) => {
    let newEvent = new CustomEvent('spotifyExtensionAlert', {
        'detail': data
    });

    window.dispatchEvent(newEvent);
}

const dataRequestHandler = (detail) => {
    if (detail.data == 'songData') {
        let newDetail = {}

        if (window.playerAPI != null && window.playerAPI._harmony._controller._state) {
            let controller = window.playerAPI._harmony._controller;
            newDetail.data = {
                'title': controller._state.track_window.current_track.name,
                'artist': controller._state.track_window.current_track.artists[0].name,
                'time': controller._progressPosition
            }
        }

        postResponse(newDetail)
    }
}

const initializeConnectionChannel = () => {
    window.addEventListener('spotifyExtensionMessage', (e) => {
        if (e.detail.type == 'command') {
            commandHandler(e.detail)
        } else if (e.detail.type == 'dataRequest') {
            dataRequestHandler(e.detail)
        }
    });

    return;
}

patchPlayerElement();
initializeWebpackAccess();
initializeConnectionChannel();

