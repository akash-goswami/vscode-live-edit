import ActionDef from './action-def-standard';
import ActionStatus from '../action-status';
import {
    MessageServerFeedbackCode,
    MessageServerStoringKeys
} from '../../constants';

let fn: ActionDef;
fn = async function(client: any, payload: any): Promise<ActionStatus> {
    const resp = await client.$async$.sadd(MessageServerStoringKeys.SPACES, payload.spaceName);
    if (resp === MessageServerFeedbackCode.SetEntry.SUCCESS) {
        return Promise.resolve(new ActionStatus(ActionStatus.SUCCESS, {}));
    } else {
        return Promise.reject(new ActionStatus(ActionStatus.FAILURE, { message: 'Already exist' }));
    }
};

export default fn;