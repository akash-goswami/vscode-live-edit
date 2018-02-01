import ActionDef from './action-def-standard';
import ActionStatus from '../action-status';
import {
    MessageServerStoringKeys
} from '../../constants';

let fn: ActionDef;
fn = async function(endpoints: any, payload: any): Promise<ActionStatus> {
    const key = `${payload.spaceName}-${MessageServerStoringKeys.FILES}`;
    const client = endpoints.pub;
    let range = await client.$async$.llen(key);
    range = parseInt(range, 10);
    const resp = await client.$async$.lrange(key, 0, range);
    console.log('files', resp);
    return Promise.resolve(new ActionStatus(ActionStatus.SUCCESS, { files: resp }));
};

export default fn;