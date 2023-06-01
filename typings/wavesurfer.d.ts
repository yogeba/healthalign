declare module 'wavesurfer.js' {
    const WaveSurfer: {
        create(params: WaveSurferParams): WaveSurfer;
    };

    export default WaveSurfer;

    interface WaveSurferParams {
        container: string | HTMLElement;
        waveColor?: string;
        progressColor?: string;
        height: number;
        autoCenter?: boolean;
        barWidth?: number;
        barRadius?: number;
        barGap?: number;
        cursorColor?: string;
    }

    interface WaveSurfer {
        load(url: string): void;
        playPause(): void;
        destroy(): void;
    }
}
