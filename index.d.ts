
interface SoundOptions {
    autoPlay: boolean;
    id: string;
    url: string;
    volume: number;
}

declare enum PlayState {
    Stopped = 0,
    Playing = 1
}


declare class SMSound {
    
    playState: PlayState;
    
    constructor(oOptions: SoundOptions);

    /**
     * Begins loading a sound per its *url*.
     *
     * @param {object} oOptions: SoundOptions Optional: Sound options
     * @return {SMSound} The SMSound object
     */
    load(oOptions: SoundOptions) : SMSound;

    /**
     * Unloads a sound, canceling any open HTTP requests.
     *
     * @return {SMSound} The SMSound object
     */
    unload(): SMSound;

    /**
     * Unloads and destroys a sound.
     */
    destruct(_bFromSM): void;

    /**
     * Begins playing a sound.
     *
     * @param {object} oOptions: SoundOptions Optional: Sound options
     * @return {SMSound} The SMSound object
     */
    play(oOptions: SoundOptions, _updatePlayState): SMSound; 

    /**
     * Stops playing a sound (and optionally, all sounds)
     *
     * @param {boolean} bAll Optional: Whether to stop all sounds
     * @return {SMSound} The SMSound object
     */
    stop(bAll): SMSound;

    /**
     * Undocumented/internal: Sets autoPlay for RTMP.
     *
     * @param {boolean} autoPlay state
     */
    setAutoPlay(autoPlay): void;

    /**
     * Undocumented/internal: Returns the autoPlay boolean.
     *
     * @return {boolean} The current autoPlay value
     */
    getAutoPlay(): boolean;

    /**
     * Sets the position of a sound.
     *
     * @param {number} nMsecOffset Position (milliseconds)
     * @return {SMSound} The SMSound object
     */
    setPosition(nMsecOffset): SMSound;

    /**
     * Pauses sound playback.
     *
     * @return {SMSound} The SMSound object
     */
    pause(_bCallFlash): SMSound;

    /**
     * Resumes sound playback.
     *
     * @return {SMSound} The SMSound object
     */
    resume(): SMSound;

    /**
     * Toggles sound playback.
     *
     * @return {SMSound} The SMSound object
     */
    togglePause(): SMSound;

    /**
     * Sets the panning (L-R) effect.
     *
     * @param {number} nPan The pan value (-100 to 100)
     * @return {SMSound} The SMSound object
     */
    setPan(nPan, bInstanceOnly): SMSound;

    /**
     * Sets the volume.
     *
     * @param {number} nVol The volume value (0 to 100)
     * @return {SMSound} The SMSound object
     */
    setVolume(nVol: number, _bInstanceOnly): SMSound;
    setVolume(nVol: number): SMSound;

    /**
     * Mutes the sound.
     *
     * @return {SMSound} The SMSound object
     */
    mute(): SMSound;

    /**
     * Unmutes the sound.
     *
     * @return {SMSound} The SMSound object
     */
    unmute(): SMSound;

    /**
     * Toggles the muted state of a sound.
     *
     * @return {SMSound} The SMSound object
     */
    toggleMute(): SMSound;

    /**
     * Registers a callback to be fired when a sound reaches a given position during playback.
     *
     * @param {number} nPosition The position to watch for
     * @param {function} oMethod The relevant callback to fire
     * @param {object} oScope Optional: The scope to apply the callback to
     * @return {SMSound} The SMSound object
     */
    onPosition(nPosition:number, oMethod: Function, oScope: any): SMSound;
   
    /**
     * Removes registered callback(s) from a sound, by position and/or callback.
     *
     * @param {number} nPosition The position to clear callback(s) for
     * @param {function} oMethod Optional: Identify one callback to be removed when multiple listeners exist for one position
     * @return {SMSound} The SMSound object
     */
    clearOnPosition(nPosition:number, oMethod:Function): SMSound;

}


declare enum FlashRenderingMode {
    'transparent', 'opaque'
}

declare enum FlashScriptAccess {
    'always', 'sameDomain'
}

/**
  * soundManager configuration options list
  * defines top-level configuration properties to be applied to the soundManager instance (eg. soundManager.flashVersion)
  * to set these properties, use the setup() method - eg., soundManager.setup({url: '/swf/', flashVersion: 9})
  */
interface ISoundManagerOptions {
    url?: string;           // path (directory) where SoundManager 2 SWFs exist, eg., /path/to/swfs/
    flashVersion?: number;                 // flash build to use (8 or 9.) Some API features require 9.
    debugMode?: boolean;                  // enable debugging output (console.log() with HTML fallback)
    debugFlash?: boolean;                // enable debugging output inside SWF, troubleshoot Flash/browser issues
    useConsole?: boolean;                 // use console.log() if available (otherwise, writes to #soundmanager-debug element)
    consoleOnly?: boolean;                // if console is being used, do not create/write to #soundmanager-debug
    waitForWindowLoad?: boolean;         // force SM2 to wait for window.onload() before trying to call soundManager.onload()
    bgColor?: string;               // SWF background color. N/A when wmode = transparent
    useHighPerformance?: boolean;        // position?:fixed flash movie can help increase js/flash speed, minimize lag
    flashPollingInterval?: number;       // msec affecting whileplaying/loading callback frequency. If null, default of 50 msec is used.
    html5PollingInterval?: number;       // msec affecting whileplaying() for HTML5 audio, excluding mobile devices. If null, native HTML5 update events are used.
    flashLoadTimeout?: number;           // msec to wait for flash movie to load before failing (0 = infinity)
    wmode?: FlashRenderingMode;                      // flash rendering mode - null, transparent, or opaque (last two allow z-index to work)
    allowScriptAccess?: FlashScriptAccess;      // for scripting the SWF (object/embed property), always or sameDomain
    useFlashBlock?: boolean;             // *requires flashblock.css, see demos* - allow recovery from flash blockers. Wait indefinitely and apply timeout CSS to SWF, if applicable.
    useHTML5Audio?: boolean;              // use HTML5 Audio() where API is supported (most Safari, Chrome versions), Firefox (MP3/MP4 support varies.) Ideally, transparent vs. Flash API where possible.
    forceUseGlobalHTML5Audio?: boolean;  // if boolean, a single Audio() object is used for all sounds - and only one can play at a time.
    ignoreMobileRestrictions?: boolean;  // if boolean, SM2 will not apply global HTML5 audio rules to mobile UAs. iOS > 7 and WebViews may allow multiple Audio() instances.
    html5Test?: RegExp; // HTML5 Audio() format support test. Use /^probably$/i; if you want to be more conservative.
    preferFlash?: boolean;               // overrides useHTML5audio, will use Flash for MP3/MP4/AAC if present. Potential option if HTML5 playback with these formats is quirky.
    noSWFCache?: boolean;                // if boolean, appends ?ts={date} to break aggressive SWF caching.
    idPrefix?: string;
}

interface IFlash9Options extends ISoundManagerOptions {
    isMovieStar?: boolean;      // "MovieStar" MPEG4 audio mode. Null (default) = auto detect MP4; AAC etc. based on URL. true = force on; ignore URL
    usePeakData?: boolean;     // enable left/right channel peak (level) data
    useWaveformData?: boolean; // enable sound spectrum (raw waveform data) - NOTE?: May increase CPU load.
    useEQData?: boolean;       // enable sound EQ (frequency spectrum data) - NOTE?: May increase CPU load.
    onbufferchange?: Function;   // callback for "isBuffering" property change
    ondataerror?: Function       // callback for waveform/eq data access error (flash playing audio in other tabs/domains)
}

interface IFlash9MoviestarOptions extends IFlash9Options {
    bufferTime?: number;          // seconds of data to buffer before playback begins (null = flash default of 0.1 seconds - if AAC playback is gappy; try increasing.)
    serverURL?: string;        // rtmp?: FMS or FMIS server to connect to; required when requesting media via RTMP or one of its variants
    onconnect?: Function;        // rtmp?: callback for connection to flash media server
    duration?: number;          // rtmp?: song duration (msec)
}

declare class SoundManager {
    /**
     * The SoundManager constructor.
     *
     * @constructor
     * @param {string} smURL Optional: Path to SWF files
     * @param {string} smID Optional: The ID to use for the SWF container element
     * @this {SoundManager}
     * @return {SoundManager} The new SoundManager instance
     */
    constructor(smURL: string, smID: string);
    constructor(smURL: string);

    /**
     * Configures top-level soundManager properties.
     *
     * @param {IFlash9MoviestarOptions} options Option parameters, eg. { flashVersion: 9, url: '/path/to/swfs/' }
     * onready and ontimeout are also accepted parameters. call soundManager.setup() to see the full list.
     */
    setup(options: IFlash9MoviestarOptions | IFlash9Options | ISoundManagerOptions): IFlash9MoviestarOptions ;

    /**
     * Creates a SMSound sound object instance. Can also be overloaded, e.g., createSound('mySound', '/some.mp3');
     *
     * @param {object} oOptions: SoundOptions Sound options (at minimum, url parameter is required.)
     * @return {object} SMSound The new SMSound object.
     */
    createSound(oOptions: SoundOptions, _url): SMSound;
    createSound(oOptions: SoundOptions): SMSound;

    /**
     * Destroys a SMSound sound object instance.
     *
     * @param {string} sID The ID of the sound to destroy
     */
    destroySound(sID: string, _bFromSound);
    destroySound(sID: string);

    /**
     * Calls the load() method of a SMSound object by ID.
     *
     * @param {string} sID The ID of the sound
     * @param {object} oOptions: SoundOptions Optional: Sound options
     */
    load(sID: string, oOptions: SoundOptions);

    /**
     * Calls the unload() method of a SMSound object by ID.
     *
     * @param {string} sID The ID of the sound
     */
    unload(sID: string);

    /**
     * Calls the onPosition() method of a SMSound object by ID.
     *
     * @param {string} sID The ID of the sound
     * @param {number} nPosition The position to watch for
     * @param {function} oMethod The relevant callback to fire
     * @param {object} oScope Optional: The scope to apply the callback to
     * @return {SMSound} The SMSound object
     */
    onPosition(sID: string, nPosition: number): SMSound;
    onPosition(sID: string, nPosition: number, oMethod: Function): SMSound;
    onPosition(sID: string, nPosition: number, oMethod:Function, oScope: any): SMSound;

    /**
     * Calls the clearOnPosition() method of a SMSound object by ID.
     *
     * @param {string} sID The ID of the sound
     * @param {number} nPosition The position to watch for
     * @param {function} oMethod Optional: The relevant callback to fire
     * @return {SMSound} The SMSound object
     */
    clearOnPosition(sID: string, nPosition, oMethod): SMSound;

    /**
     * Calls the play() method of a SMSound object by ID.
     *
     * @param {string} sID The ID of the sound
     * @param {object} oOptions: SoundOptions Optional: Sound options
     * @return {SMSound} The SMSound object
     */
    play(sID: string): SMSound;
    play(sID: string, oOptions: SoundOptions): SMSound;

    /**
     * Calls the setPosition() method of a SMSound object by ID.
     *
     * @param {string} sID The ID of the sound
     * @param {number} nMsecOffset Position (milliseconds)
     * @return {SMSound} The SMSound object
     */
    setPosition(sID: string, nMsecOffset): SMSound;

    /**
     * Calls the stop() method of a SMSound object by ID.
     *
     * @param {string} sID The ID of the sound
     * @return {SMSound} The SMSound object
     */
    stop(sID: string): SMSound;

    /**
     * Stops all currently-playing sounds.
     */
    stopAll();

    /**
     * Calls the pause() method of a SMSound object by ID.
     *
     * @param {string} sID The ID of the sound
     * @return {SMSound} The SMSound object
     */
    pause(sID: string): SMSound;

    /**
     * Pauses all currently-playing sounds.
     */
    pauseAll();

    /**
     * Calls the resume() method of a SMSound object by ID.
     *
     * @param {string} sID The ID of the sound
     * @return {SMSound} The SMSound object
     */
    resume(sID: string): SMSound;

    /**
     * Resumes all currently-paused sounds.
     */
    resumeAll();

    /**
     * Calls the togglePause() method of a SMSound object by ID.
     *
     * @param {string} sID The ID of the sound
     * @return {SMSound} The SMSound object
     */
    togglePause(sID: string): SMSound;

    /**
     * Calls the setPan() method of a SMSound object by ID.
     *
     * @param {string} sID The ID of the sound
     * @param {number} nPan The pan value (-100 to 100)
     * @return {SMSound} The SMSound object
     */
    setPan(sID: string, nPan): SMSound;

    /**
     * Calls the setVolume() method of a SMSound object by ID
     * Overloaded case: pass only volume argument eg., setVolume(50) to apply to all sounds.
     *
     * @param {string} sID The ID of the sound
     * @param {number} nVol The volume value (0 to 100)
     * @return {SMSound} The SMSound object
     */
    setVolume(sID: string, nVol): SMSound;

    /**
     * Calls the mute() method of either a single SMSound object by ID, or all sound objects.
     *
     * @param {string} sID Optional: The ID of the sound (if omitted, all sounds will be used.)
     */
    mute(sID: string);

    /**
     * Mutes all sounds.
     */
    muteAll();

    /**
     * Calls the unmute() method of either a single SMSound object by ID, or all sound objects.
     *
     * @param {string} sID Optional: The ID of the sound (if omitted, all sounds will be used.)
     */
    unmute(sID: string);

    /**
     * Unmutes all sounds.
     */
    unmuteAll();

    /**
     * Calls the toggleMute() method of a SMSound object by ID.
     *
     * @param {string} sID The ID of the sound
     * @return {SMSound} The SMSound object
     */
    toggleMute(sID: string): SMSound;

    /**
     * Retrieves the memory used by the flash plugin.
     *
     * @return {number} The amount of memory in use
     */
    getMemoryUse();


    /**
     * Determines playability of a MIME type, eg. 'audio/mp3'.
     */
    canPlayMIME(sMIME);

    /**
     * Determines playability of a URL based on audio support.
     *
     * @param {string} sURL The URL to test
     * @return {boolean} URL playability
     */
    canPlayURL(sURL);

    /**
     * Determines playability of an HTML DOM &lt;a&gt; object (or similar object literal) based on audio support.
     *
     * @param {object} oLink an HTML DOM &lt;a&gt; object or object literal including href and/or type attributes
     * @return {boolean} URL playability
     */
    canPlayLink(oLink);

    /**
     * Retrieves a SMSound object by ID.
     *
     * @param {string} sID The ID of the sound
     * @return {SMSound} The SMSound object
     */
    getSoundById(sID: string, _suppressDebug): SMSound;
    getSoundById(sID: string): SMSound;

    /**
     * Queues a callback for execution when SoundManager has successfully initialized.
     *
     * @param {function} oMethod The callback method to fire
     * @param {object} oScope Optional: The scope to apply to the callback
     */
    onready(oMethod, oScope);

    /**
     * Queues a callback for execution when SoundManager has failed to initialize.
     *
     * @param {function} oMethod The callback method to fire
     * @param {object} oScope Optional: The scope to apply to the callback
     */
    ontimeout(oMethod, oScope);

    /**
     * Restarts and re-initializes the SoundManager instance.
     *
     * @param {boolean} resetEvents Optional: When true, removes all registered onready and ontimeout event callbacks.
     * @param {boolean} excludeInit Options: When true, does not call beginDelayedInit() (which would restart SM2).
     * @return {object} soundManager The soundManager instance.
     */
    reboot(resetEvents: boolean, excludeInit: boolean);
    reboot();

    reset();

    /**
     * Undocumented: Determines the SM2 flash movie's load progress.
     *
     * @return {number or null} Percent loaded, or if invalid/unsupported, null.
     */
    getMoviePercent();

    /**
     * Additional helper for manually invoking SM2's init process after DOM Ready / window.onload().
     */
    beginDelayedInit();

    /**
     * Destroys the SoundManager instance and all SMSound instances.
     */
    destruct();
}

declare var soundManager: SoundManager;