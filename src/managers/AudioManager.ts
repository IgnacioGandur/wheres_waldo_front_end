import audioData from "../assets/data/audio.json";

type AudioObjects = {
    [name: string]: HTMLAudioElement;
};

class AudioManager {
    audios: AudioObjects;

    constructor() {
        let audios: AudioObjects = {

        };

        for (let i = 0; i < audioData.soundEffects.length; i++) {
            const current = audioData.soundEffects[i];
            audios[current.name] = new Audio(current.route);
        }

        this.audios = audios;
    }

    playSoundEffect(soundEffect: keyof AudioObjects): void {
        if (!this.audios.hasOwnProperty(soundEffect)) {
            console.log(`The sound effect: ${soundEffect} doesn't exist`);
            return;
        }
        this.audios[soundEffect].currentTime = 0;
        this.audios[soundEffect].play();
    }

}

export default new AudioManager();
