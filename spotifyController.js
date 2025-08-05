class SpotifyController {
    playerAPI;
    mediaElement;
    
    skip = () => {
        this.playerAPI.skipToNext();
    }

    back = () => {
        this.playerAPI.skipToPrevious();
    }

    pause = () => {
        this.playerAPI.pause();
    }

    play = () => {
        this.playerAPI.resume();
    }

    seekForwards = (t) => {
        this.playerAPI.seekForwards(t);
    }

    #getQueuePrivate = async () => {
        return await this.playerAPI.getQueue();
    }

    getQueue = async () => {
        return (await this.#getQueuePrivate()).nextUp;
    }

    getCurrentSong = async () => {
        return (await this.#getQueuePrivate()).current;
    }
}