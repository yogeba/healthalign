declare module 'mic-recorder-to-mp3' {
    class MicRecorder {
        constructor(options: {
            bitRate: number;
            encoderPath?: string;
            mimeType?: string;
        });

        start(): Promise<void>;
        stop(): Promise<{ blob: Blob; buffer: ArrayBuffer }>;
        getMp3(): Promise<[ArrayBuffer, Blob]>;
        close(): void;
    }

    export = MicRecorder;
}
