class SpotifyController {
    playerAPI;
    mediaElement;
    APIHandler;
    audioNodes;
    audioCtx;
    #lastSongPlaying;
    broadcastChannel;

    #eventListeners = {};

    skip = () => {
        if(this.playerAPI) this.playerAPI.skipToNext();
        
        return;
    }

    back = () => {
        if(this.playerAPI) this.playerAPI.skipToPrevious();
        
        return;
    }

    pause = () => {
        if(this.playerAPI) this.playerAPI.pause();
        
        return;
    }

    play = () => {
        if(this.playerAPI) this.playerAPI.resume();

        return;
    }

    seekForwards = (t) => {
        if(this.playerAPI) this.playerAPI.seekForward(t);

        return;
    }

    bassBoost = (db) => {
        if(this.audioNodes){
            this.audioNodes['biquadNode'].frequency.value = 120;
            this.audioNodes['biquadNode'].gain.value = db;
        }

        return;
    }

    getAudioAmplitudes = async () => {
        if(!this.audioNodes){
            return await this.#broadcastAsync({
                'type':'dataRequest',
                'data':'audioAmplitudes'
            });
        } else {
            const analyzerNode = this.audioNodes['analyzerNode'];

            const dataArray = new Uint8Array(analyzerNode.frequencyBinCount);
            analyzerNode.getByteTimeDomainData(dataArray);

            return dataArray;
        }
    }


    #getQueuePrivate = async () => {
        return await this.playerAPI._queue._queueManager.getInternalPlayerQueue();
    }

    getQueue = async () => {
        return (await this.#getQueuePrivate()).next_items;
    }

    getCurrentSong = () => {
        return this.playerAPI._queue.getQueue().current;
    }

    clearQueue = async () => {
        this.playerAPI._queue.clearQueue();

        return;
    }

    setAPIHandler = (handler) => {
        this.APIHandler = handler;

        return;
    }

    setPlayerAPI = (api) => {
        this.playerAPI = api;

        return;
    }

    addEventListener = (event, callback) => {
        if(!this.#eventListeners[event]) this.#eventListeners[event] = [];

        this.#eventListeners[event].push(callback);

        return;
    }

    #triggerEvent = (eventName, data) => {
        if(!this.#eventListeners[eventName]) return;
        for(let i in this.#eventListeners[eventName]) this.#eventListeners[eventName][i](data);

        return;
    }

    playerUpdate = (event) => {
        const item = event.data.item;
        if(!this.#lastSongPlaying || item.name != this.#lastSongPlaying.name) this.#triggerEvent('newsong', event.data);
        
        this.#lastSongPlaying = this.getCurrentSong();

        return;
    }

    #updatePlayerAPI = async () => {
        this.playerAPI = await window.getPlayerAPI();
        this.#lastSongPlaying = this.getCurrentSong();

        return;
    }


    #initializeBroadcastHandler = () => {
        this.broadcastChannel = new BroadcastChannel('spotifyExtensionBroadcast');

        this.broadcastChannel.addEventListener('message', (e) => {
            const msg = e.data;

            if(msg.data.type == 'dataRequest') this.#dataRequestHandler(msg);
        });

        return;
    }

    #dataRequestHandler = async (msg) => {
        if(msg.data.data == 'audioAmplitudes'){
            if(!this.audioNodes) return;
            let responseData = await this.getAudioAmplitudes();
            this.#broadcastResponse(responseData, msg.id);
        }

        return;
    }

    initialize = () => {
        this.#initializeBroadcastHandler();

        return;
    }

    #broadcastResponse = (data, id) => {
        this.broadcastChannel.postMessage({
            'data': data,
            'id': id
        });

        return;
    }

    #broadcastAsync = async (data) => {
        let id = Math.random();

        this.broadcastChannel.postMessage({
            'data':data,
            'id':id
        });

        return new Promise((resolve) => {
            this.broadcastChannel.addEventListener('message', (e) => {
                let msg = e.data;
                if(msg.id != id) return;
                resolve(msg.data);
            });
        });
    }
}