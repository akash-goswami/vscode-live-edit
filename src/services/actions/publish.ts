import ActionDef from './action-def-standard';
import ActionStatus from '../action-status';

let fn: ActionDef;
fn = async function(client: any, payload: any): Promise<ActionStatus> {
    const key = `${payload.spaceName}.${payload.channel}`;
    try {
        client.publish(key, payload.message);
        return Promise.resolve(new ActionStatus(ActionStatus.SUCCESS, {}));
    }  catch (e) {
        return Promise.resolve(new ActionStatus(ActionStatus.FAILURE, { e: e }));
    }
};

export default fn;