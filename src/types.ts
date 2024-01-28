declare global {
    const LunaPass: any;
    const LPMessageRenderer: any;
}

export interface LunaPassOptionProps {
    requestInterval: number;
    video: MediaTrackConstraints;
    image: {
        mimetype: string;
        quality: number;
    };
    mode: "operator" | "selfie";
    headers: {
        heartbeatInterval: number;
    };
    "session-id": string;
    debug: boolean;
}
export interface LunaPassRenderOptionProps {
    text: boolean;
    graphics: boolean;
    errorMessages: {
        [key in string]: string;
    };
}

export interface FrameStatus {
    isOk: boolean;
    errors: number[];
    details: {
        ags: any;
        quality: {
            blur: number;
            isBlurred: boolean;
            light: number;
            isHighlighted: boolean;
            darkness: number;
            isDark: boolean;
            illumination: number;
            isIlluminated: boolean;
            specularity: number;
            isSpecular: boolean;
        };
        faceFramePosition: {
            faceRect: {
                x: number;
                y: number;
                width: number;
                height: number;
            };
            frameRect: {
                x: number;
                y: number;
                width: number;
                height: number;
            };
            margins: number[];
        };
        headPose: {
            yaw: number;
            rall: number;
            pinch: number;
        };
        mouth: {
            opened: number;
            smile: number;
            occluded: number;
        };
        eyeglasses: string;
        liveness: {
            score: number;
            qualityScore: number;
        };
    };
}

export type Options = {
    lunaPassOptions?: Partial<LunaPassOptionProps>;
    lunaPassRenderOptions?: Partial<LunaPassRenderOptionProps>;
};

export type LunaDetectingFunctionProps = {
    onDetecting?: (frameStatus: FrameStatus) => void;
};

export interface LunaStartFunctionProps {
    ms?: number;
    closeBtnTitle?: string;
    rootNode: HTMLDivElement;
    options?: Options;
    wsUrl: string;
    onDetecting?: LunaDetectingFunctionProps["onDetecting"];
    onSuccess?: (val: { isOk: boolean; jwt: string }) => void;
    onError?: () => void;
    onClose?: () => void;
}
export type ReactLunaPassProps = Omit<LunaStartFunctionProps, "rootNode">;
