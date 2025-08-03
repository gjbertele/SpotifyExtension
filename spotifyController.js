class SpotifyController {
    #playerAPI
    SpotifyController(api){
        this.#playerAPI = api;

        this.skip = this.#playerAPI.skipToNext;
        this.back = this.#playerAPI.skipToPrevious;
        this.pause = this.#playerAPI.pause;
        this.play = this.#playerAPI.resume;
        this.seekForwards = this.#playerAPI.seekForwards;
    }
    skip;
    back;
    pause;
    play;
    seekForwards;

}