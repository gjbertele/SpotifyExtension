let APIList, spotifyController, APIHandler, songPlaying = {};


const patchPlayerElement = () => {
    const originalPlay = HTMLMediaElement.prototype.play;

    HTMLMediaElement.prototype.play = function (...args) {
        if(this.parentElement == null && this.src && spotifyController){
            spotifyController.mediaElement = this; 
            
            insertAudioContext(this);
        }

        return originalPlay.apply(this, args);
    }
    
}

const insertAudioContext = (element) => {
    if(spotifyController.audioCtx) return;

    const audioCtx = new AudioContext();
    const source = audioCtx.createMediaElementSource(element);

    const analyzerNode = audioCtx.createAnalyser();
    const biquadNode = audioCtx.createBiquadFilter();

    source.connect(biquadNode);

    biquadNode.connect(analyzerNode);
    biquadNode.type = 'lowshelf';


    analyzerNode.connect(audioCtx.destination);
    analyzerNode.fftSize = 2048;

    spotifyController.audioCtx = audioCtx;
    spotifyController.audioNodes = {
        'analyzerNode':analyzerNode,
        'biquadNode':biquadNode
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
    APIHandler = null;
    for(let id in webpackRequire.m){
        let mod = webpackRequire(id);
        if(mod.createPlatformWeb){
            APIHandler = mod;
            break;
        }
    }
    if(APIHandler == null) throw new Error('No API handler found');

    let y = await APIHandler.createPlatformWeb();
    let z = y.getRegistry();
    APIList = Array.from(z._map);
    return APIList;
}

const getPlayerAPI = async () => {
    return (await getAPIs())[19][1].instance;
}

window.getPlayerAPI = getPlayerAPI;

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

    spotifyController = new SpotifyController();
    spotifyController.setPlayerAPI(window.playerAPI);
    spotifyController.setAPIHandler(APIHandler);
    spotifyController.initialize();

    window.spotifyController = spotifyController;

    window.playerAPI.getEvents().addListener('update', playerUpdated);
    window.playerAPI.getEvents().addListener('update', spotifyController.playerUpdate);

    let newEvent = new CustomEvent('spotifyControllerCreated');
    window.dispatchEvent(newEvent);
    
    return;
}

const fireMainAppLoad = () => {
    let event = new CustomEvent('mainAppLoaded');
    window.dispatchEvent(event);

    return;
}

const playerUpdated = (e) => {
    if(e.data.item.name == songPlaying.title && e.data.item.artists[0].name == songPlaying.artist) return;

    if(!songPlaying.title) fireMainAppLoad();

    songPlaying.title = e.data.item.name;
    songPlaying.artist = e.data.item.artists[0].name;
    postAlert({
        'type':'newSong',
        'songData': songPlaying
    });

    return;
}

const commandHandler = (detail) => {
    if(detail.data == 'seekforwards'){
        spotifyController.seekForwards(detail.time * 1000);
    } else if(detail.data == 'bassboost'){
        spotifyController.bassBoost(detail.dbDiff);
    } else if (spotifyController[detail.data]) {
        spotifyController[detail.data]();
    }

    return;
}

const postResponse = (data) => {
    let newEvent = new CustomEvent('spotifyExtensionMessageResponse', {
        'detail': data
    });

    window.dispatchEvent(newEvent);

    return;
}

const postAlert = (data) => {
    let newEvent = new CustomEvent('spotifyExtensionAlert', {
        'detail': data
    });

    window.dispatchEvent(newEvent);

    return;
}

const songDataRequest = (detail) => {
        let newDetail = {}

        if (window.playerAPI != null && window.playerAPI._harmony._controller._state) {
            let controller = window.playerAPI._harmony._controller;
            newDetail.data = {
                'title': controller._state.track_window.current_track.name,
                'artist': controller._state.track_window.current_track.artists[0].name,
                'time': controller._progressPosition,
                'id':detail.id
            }
        }

        postResponse(newDetail)

        return;
}

const rawSongDataRequest = (detail) => {
    let newDetail = {
        'id':detail.id
    }

    if (window.playerAPI != null && window.playerAPI._harmony._controller._state) {
        let controller = window.playerAPI._harmony._controller;
        newDetail.data = {
            'current_track':controller._state.track_window.current_track,
            'time': controller._progressPosition
        }
    }

    postResponse(newDetail);

    return;

}

const audioDataRequest = async (detail) => {
    let id = detail.id;
    let responseData = await spotifyController.getAudioAmplitudes();
    
    postResponse({
        'forward':true,
        'id':id,
        'data':responseData
    });

    return;
}

const initializeConnectionChannel = () => {
    window.addEventListener('spotifyExtensionMessage', (e) => {
        if (e.detail.type == 'command') {
            commandHandler(e.detail)
        } else if (e.detail.data == 'songData') {
            songDataRequest(e.detail)
        } else if(e.detail.type == 'audioDataRequest'){
            audioDataRequest(e.detail);
        }
    });

    return;
}

const postMessageAsync = async (type, data) => {
    let id = Math.random();
    let newEvent = new CustomEvent('spotifyExtensionMessage', {
        'detail':{
            'type':type,
            'data':data,
            'id':id
        }
    });
    let promise = new Promise((resolve) => {
        window.addEventListener('spotifyExtensionMessageResponse', (e) => {
            if(e.detail.id != id) return;
            window.removeEventListener('spotifyExtensionMessageResponse', this);
            resolve(e.detail.data);
        });
    });
    window.dispatchEvent(newEvent);
    return promise;

}

window.postMessageAsync = postMessageAsync;


try {
    patchPlayerElement();
    initializeWebpackAccess();
    initializeConnectionChannel();
} catch(err){
    console.log(err);
}