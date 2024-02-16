interface Window {
    appBridge: ClientApplication<AppBridgeState>;
    getTokenAppBridge: () => Promise<string>;
}
