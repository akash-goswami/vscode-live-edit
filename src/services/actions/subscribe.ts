import ActionDef from './action-def-standard';
import ActionStatus from '../action-status';
import { PubSubStore } from '../../utils';

const store = new PubSubStore();

let fn: ActionDef;
fn = async function(client: any, payload: any): Promise<ActionStatus> {
    const qualifedChannel = `${payload.spaceName}.${payload.channel}`;
    store.entry(qualifedChannel, payload.fn);
    try {
        if (!store.has(qualifedChannel)) {
            client.subscribe(qualifedChannel, (channel, message) => {
                store[channel].forEach(fn => {
                    fn(message);
                });
            });
        }
        return Promise.resolve(new ActionStatus(ActionStatus.SUCCESS, {}));
    }  catch (e) {
        return Promise.resolve(new ActionStatus(ActionStatus.FAILURE, { e: e }));
    }
};

export default fn;