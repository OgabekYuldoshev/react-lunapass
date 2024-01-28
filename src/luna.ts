import {
    FrameStatus,
    LunaDetectingFunctionProps,
    LunaStartFunctionProps,
    Options,
} from "./types";

let lunaPass: any = null;
let lunaPassRender: any = null;
let rootNode = document.createElement("div");
let interval: NodeJS.Timeout;
let webSocketUrl: string;

const initialize = (node: HTMLDivElement, options?: Options) => {
    rootNode = node;
    lunaPass = new LunaPass(rootNode, options?.lunaPassOptions);
    lunaPassRender = new LPMessageRenderer(options?.lunaPassRenderOptions);
};

const connectWs = (ws: string): Promise<any> => lunaPass.connectWS(ws);

const setInterval = (ms: number, cb: LunaStartFunctionProps["onError"]) => {
    interval = setTimeout(async () => {
        await killProcess();
        cb && cb();
    }, ms);
};

export const checkLiveness = async ({
    onDetecting,
}: LunaDetectingFunctionProps): Promise<any> => {
    await lunaPass.attachCamera();
    await lunaPassRender.init(rootNode);
    return await lunaPass.checkLiveness((frameStatus: FrameStatus) => {
        onDetecting && onDetecting(frameStatus);
        lunaPassRender.render(frameStatus);
    });
};

export const killProcess = async () => {
    clearInterval(interval);
    lunaPassRender.destroy();
    await lunaPass.detachCamera();
    await lunaPass.disconnectWS();
};

export const startDetecting = async ({
    rootNode,
    options,
    wsUrl,
    onDetecting,
    onSuccess,
    onError,
    ms = 30000,
}: LunaStartFunctionProps) => {
    try {
        initialize(rootNode, options);

        webSocketUrl = wsUrl;

        await connectWs(webSocketUrl);

        setInterval(ms, onError);

        const result = await checkLiveness({
            onDetecting,
        });

        onSuccess && onSuccess(result);

        await killProcess();

        return result;
    } catch (error) {
        onError && onError();
        throw error;
    }
};
