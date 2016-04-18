
interface ISoundManagerOptions {
    url: string;
}

interface ISoundData {
    autoPlay: boolean;
    id: string;
    url: string;
    volume: number;
}

declare class SoundManagerSound {
    playState: number;
    setVolume(volume: number);
}

declare class SoundManager {
    createSound(options: ISoundData);
    destroySound(id: string): void;
    getSoundById(id: string): SoundManagerSound;
    onPosition(id: string, timeMs: number, callback: Function);
    play(id: string);
    reboot(): void;
    setup(options: ISoundManagerOptions);
}

declare var soundManager : SoundManager;