import ActionDef from './action-def-standard';
import ActionStatus from '../action-status';

let fn: ActionDef;
fn = async function(endpoints: any, payload: any): Promise<ActionStatus> {
    const key = `${payload.spaceName}.${payload.channel}`;
    console.log('publish', key);
    try {
        endpoints.pub.publish(key, JSON.stringify(payload.params));
        return Promise.resolve(new ActionStatus(ActionStatus.SUCCESS, {}));
    }  catch (e) {
        return Promise.resolve(new ActionStatus(ActionStatus.FAILURE, { e: e }));
    }
};

export default fn;