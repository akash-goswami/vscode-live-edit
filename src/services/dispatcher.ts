import * as actions from './actions/index';
import ActionStatus from './action-status';
import { PubSubStore } from '../utils';

export default class Dispatcher {
    private pubEndpoint: any;
    private subEndpoint: any;
    private host: any;
    private store: PubSubStore;

    constructor (pubClient: any, subClient: any, host: any) {
        this.pubEndpoint = pubClient;
        this.subEndpoint = subClient;
        this.host = host;
        this.store = new PubSubStore();
        this.subEndpoint.on('message', (channel, payload) => {
            this.store.list(channel).forEach(fn => {
                fn(payload);
            });
        });
    }

    async dispatch (actionName: string, payload: Object): Promise<ActionStatus> {
        if (!payload) {
            payload = { timestamp: +new Date(), dispatcher: this };
        }
        return actions[actionName]({ pub: this.pubEndpoint, sub: this.subEndpoint }, payload);
    }

    on(channelName: string, fn: Function): Dispatcher {
        const qualifiedChannelName = `${this.host.sharespace.name}.${channelName}`;
        console.log(qualifiedChannelName);
        if (!this.store.has(qualifiedChannelName)) {
            this.subEndpoint.subscribe(qualifiedChannelName);
        }
        this.store.entry(qualifiedChannelName, fn);
        return this;
    }
}