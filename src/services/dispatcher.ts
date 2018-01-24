import * as actions from './actions/index';
import ActionStatus from './action-status';
import { PubSubStore } from '../utils';

export default class Dispatcher {
    private endpoint: any;
    private host: any;
    private store: PubSubStore;

    constructor (client: Object, host: any) {
        this.endpoint = client;
        this.host = host;
        this.store = new PubSubStore();
        this.endpoint.on('message', (channel, payload) => {
            this.store.list(channel).forEach(fn => {
                fn(payload);
            });
        });
    }

    async dispatch (actionName: string, payload: Object): Promise<ActionStatus> {
        if (!payload) {
            payload = { timestamp: +new Date(), dispatcher: this };
        }
        return actions[actionName](this.endpoint, payload);
    }

    on(channelName: string, fn: Function): Dispatcher {
        const qualifiedChannelName = `${this.host.sharespace.name}.${channelName}`;
        console.log(qualifiedChannelName);
        if (!this.store.has(qualifiedChannelName)) {
            this.endpoint.subscribe(qualifiedChannelName);
        }
        this.store.entry(qualifiedChannelName, fn);
        return this;
    }
}