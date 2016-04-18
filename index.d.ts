
interface ISoundManagerOptions {
    url : string;
}

declare class SoundManager {
    setup(options : ISoundManagerOptions);
}

declare var soundManager : SoundManager;