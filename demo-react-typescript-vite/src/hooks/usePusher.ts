import Pusher from "pusher-js";

const pusher = new Pusher(import.meta.env.VITE_PUSHER_APP_KEY, {
    cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
});

// console.log(import.meta.env.VITE_PUSHER_APP_CLUSTER,import.meta.env.VITE_PUSHER_APP_KEY)
interface usePusherType {
    StrChannel: string;
}

export const usePusher = ({ StrChannel }: usePusherType) => {
    const channel = pusher.subscribe(StrChannel);

    return {
        pusher,
        channel,
    };
};
