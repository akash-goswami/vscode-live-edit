import * as actions from './actions/index';
import ActionStatus from './action-status';
import { PubSubStore } from '../utils';

export default class Dispatcher {
    private endpoints: any;
    private host: any;
    private store: PubSubStore;

    constructor (pubClient: any, subClient: any, host: any) {
        this.endpoints = {
            pub: pubClient,
            sub: subClient
        };
        this.host = host;
        this.store = new PubSubStore();
        this.endpoints.sub.on('message', (channel, payload) => {
            this.store.list(channel).forEach(async fn => {
                const res = await fn(JSON.parse(payload));
                if (res.canRebounce()) {
                    const rebounceData = res.getRebounceData();
                    actions.publish(this.endpoints, {
                        spaceName: this.host.sharespace.name,
                        channel: rebounceData[0],
                        params: rebounceData[1]
                    });
                }
            });
        });
    }

    async dispatch (actionName: string, payload: Object): Promise<ActionStatus> {
        if (!payload) {
            payload = { timestamp: +new Date(), dispatcher: this };
        }
        return actions[actionName](this.endpoints, payload);
    }

    on(channelName: string, fn: Function): Dispatcher {
        const qualifiedChannelName = `${this.host.sharespace.name}.${channelName}`;
        console.log(qualifiedChannelName);
        if (!this.store.has(qualifiedChannelName)) {
            this.endpoints.sub.subscribe(qualifiedChannelName);
        }
        this.store.entry(qualifiedChannelName, fn);
        return this;
    }
}