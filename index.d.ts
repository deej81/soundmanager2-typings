
interface ISoundManagerOptions {
    url : string;
}

interface ISoundData {
    id: string;
    url: string;
    autoplay: boolean;
    volume: number;
}

declare class SoundManagerSound {
    playState: number;
    setVolume(volume: number);
}

declare class SoundManager {
    setup(options : ISoundManagerOptions);
    createSound(options :ISoundData);
    play(id:string);
    onPosition(id: string, timeMs: number, callback: Function);
    getSoundById(id:string): SoundManagerSound;
    reboot(): void;
}

declare var soundManager : SoundManager;