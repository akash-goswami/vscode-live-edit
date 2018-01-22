import ActionDef from './action-def-standard';
import ActionStatus from '../action-status';

let fn: ActionDef;
fn = async function(client: any, payload: any): Promise<ActionStatus> {
    try {
        client.publish(payload.channel, payload.message);
        return Promise.resolve(new ActionStatus(ActionStatus.SUCCESS, {}));
    }  catch (e) {
        return Promise.resolve(new ActionStatus(ActionStatus.FAILURE, { e: e }));
    }
};

export default fn;