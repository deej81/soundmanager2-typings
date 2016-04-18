
interface ISoundManagerOptions {
    url : string;
}

interface ISoundManager {
    setup(options : ISoundManagerOptions);
}

declare var soundManager : ISoundManager;