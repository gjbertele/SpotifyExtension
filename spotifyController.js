class SpotifyController {
    playerAPI;
    mediaElement;
    APIHandler;
    audioNodes;
    audioCtx;
    #lastSongPlaying;

    #eventListeners = {};

    amplitudeGets = 0;

    beatController = {
        'lastBeatTime': 0,
        'volArr': [],
        'wSize': 45,
        'wSum': 0,
        'alpha': 0.7,
        'beatDist': 150,
        'songAvg': 0
    };

    skip = () => {
        if (this.playerAPI) this.playerAPI.skipToNext();

        return;
    }

    back = () => {
        if (this.playerAPI) this.playerAPI.skipToPrevious();

        return;
    }

    pause = () => {
        if (this.playerAPI) this.playerAPI.pause();

        return;
    }

    play = () => {
        if (this.playerAPI) this.playerAPI.resume();

        return;
    }

    seekForwards = (t) => {
        if (this.playerAPI) this.playerAPI.seekForward(t);

        return;
    }

    bassBoost = (db) => {
        if (this.audioNodes) {
            this.audioNodes['biquadNode'].frequency.value = 120;
            this.audioNodes['biquadNode'].gain.value = db;
        } else {
            this.messagingHandler.broadcastAsync({
                'type': 'dataUpdate',
                'data': 'bassUpdate',
                'bassVal': db
            });
        }
        return;

    }

    getAudioAmplitudes = async () => {
        this.amplitudeGets++;

        if (this.audioNodes) {
            const analyzerNode = this.audioNodes['analyzerNode'];

            const dataArray = new Uint8Array(analyzerNode.frequencyBinCount);
            analyzerNode.getByteTimeDomainData(dataArray);

            return dataArray;
        } else {
            let awaitedData = await this.messagingHandler.broadcastAsync({
                'type': 'dataRequest',
                'data': 'audioAmplitudes'
            });
            return awaitedData;
        }
    }

    getComputedVolume = async () => {
        if (this.audioNodes) {
            const analyzerNode = this.audioNodes['analyzerNode'];

            const dataArray = new Uint8Array(analyzerNode.frequencyBinCount);
            analyzerNode.getByteFrequencyData(dataArray);

            let sum = 0;
            for (let i = 0; i < dataArray.length / 2; i++) sum += dataArray[i] / 255;

            return sum * 2 / dataArray.length;
        } else {
            let awaitedData = await this.messagingHandler.broadcastAsync({
                'type': 'dataRequest',
                'data': 'computedVolume'
            });
            return awaitedData;
        }
    }

    getQueuePrivate = async () => {
        return await this.playerAPI._queue._queueManager.getInternalPlayerQueue();
    }

    getQueue = async () => {
        return (await this.getQueuePrivate()).next_items;
    }

    getCurrentSong = () => {
        return this.playerAPI._queue.getQueue().current;
    }

    getSongLyrics = async (uri) => {
        if (!this.lyricAPI) this.#updateLyricAPI();

        try {
            return await this.lyricAPI.S(uri, null, false, true);
        } catch (err) {
            return null;
        }
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
        if (!this.#eventListeners[event]) this.#eventListeners[event] = [];

        this.#eventListeners[event].push(callback);

        return;
    }

    #triggerEvent = (eventName, data) => {
        if (!this.#eventListeners[eventName]) return;
        for (let i in this.#eventListeners[eventName]) this.#eventListeners[eventName][i](data);

        return;
    }

    playerUpdate = (event) => {
        const item = event.data.item;
        if (!this.#lastSongPlaying || item.name != this.#lastSongPlaying.name) this.#triggerEvent('newsong', event.data);

        this.#lastSongPlaying = this.getCurrentSong();

        return;
    }

    #updatePlayerAPI = async () => {
        this.playerAPI = await window.getPlayerAPI();
        this.#lastSongPlaying = this.getCurrentSong();

        return;
    }

    #updateLyricAPI = () => {
        for (let idx in window.webpackRequire.m) {
            let mod = window.webpackRequire(idx);
            if (mod.S && mod.z) {
                this.lyricAPI = mod;
                return;
            }
        }

        return;
    }

    #dataRequestHandler = async (msg) => {
        if (msg.data.data == 'audioAmplitudes') {
            if (!this.audioNodes) return;
            let responseData = await this.getAudioAmplitudes();

            messagingHandler.broadcastResponse(responseData, msg.id);
        } else if (msg.data.data == 'computedVolume') {
            if (!this.audioNodes) return;
            let responseData = await this.getComputedVolume();

            messagingHandler.broadcastResponse(responseData, msg.id);
        }

        return;
    }

    #dataUpdateHandler = async (msg) => {
        if (msg.data.data == 'bassUpdate') {
            if (!this.audioNodes) return;
            this.bassBoost(msg.data.bassVal);
            this.messagingHandler.broadcastResponse({}, msg.id);
        }
    }


    songEventDetect = async () => {
        let volume = await this.getComputedVolume();
        let wSize = this.beatController.wSize;

        requestAnimationFrame(this.songEventDetect);

        if (isNaN(volume)) return;


        if (this.beatController.volArr.length >= wSize) {
            this.beatController.wSum -= this.beatController.volArr[0];
            this.beatController.volArr.splice(0, 1);

            this.beatController.volArr.push(volume);
            this.beatController.wSum += volume;
        } else {
            this.beatController.volArr.push(volume);
            this.beatController.wSum += volume;
            return;
        }

        let avg = this.beatController.wSum / wSize;
        let sd = 0;
        for (let i = 0; i < wSize; i++) sd += (this.beatController.volArr[i] - avg) ** 2;
        sd /= wSize - 1;
        sd = Math.sqrt(sd);

        let beatDiff = Date.now() - this.beatController.lastBeatTime;


        if (volume > avg + this.beatController.alpha * sd) {
            if(beatDiff > this.beatController.beatDist){
                this.fireSongEvent();
                this.beatController.lastBeatTime = Date.now();
            }
        }

        this.beatController.songAvg = avg + this.beatController.alpha * sd;

        return;
    }

    fireSongEvent = () => {
        let customEvent = new CustomEvent('songEvent');
        window.dispatchEvent(customEvent);

        return;
    }

    resetBeatController = () => {
        this.beatController = {
            'lastBeatTime': 0,
            'volArr': [],
            'wSize': 45,
            'wSum': 0,
            'alpha': 0.7,
            'beatDist': 150,
            'songAvg': 0
        };

        return;

    }

    initialize = () => {
        this.messagingHandler = new MessagingHandler();
        this.messagingHandler.initializeBroadcastHandler();

        this.messagingHandler.addBroadcastEventListener((e) => {
            if (e.data.data.type == 'dataRequest') this.#dataRequestHandler(e.data);
            if (e.data.data.type == 'dataUpdate') this.#dataUpdateHandler(e.data);
        });

        this.songEventDetect();
        this.addEventListener('newsong', this.resetBeatController)

        return;
    }


}