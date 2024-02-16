function subscribeCustomEvent({ eventName, listener }: EventDefine) {
    document.addEventListener(eventName, listener);
}

function unsubscribeCustomEvent({ eventName, listener }: EventDefine) {
    document.removeEventListener(eventName, listener);
}

function dispatchCustomEvent({ eventName, data }: PublishEvent) {
    const event = new CustomEvent(eventName, { detail: data });
    document.dispatchEvent(event);
}

export { dispatchCustomEvent, subscribeCustomEvent, unsubscribeCustomEvent };

interface EventDefine {
    eventName: string,
    listener: (payload: CustomEventInit) => void
}

interface PublishEvent {
    eventName: string,
    data: unknown
}