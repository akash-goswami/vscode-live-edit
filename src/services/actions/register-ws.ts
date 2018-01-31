import ActionDef from './action-def-standard';
import ActionStatus from '../action-status';
import {
    MessageServerFeedbackCode,
    MessageServerStoringKeys
} from '../../constants';

let fn: ActionDef;
fn = async function(endpoints: any, payload: any): Promise<ActionStatus> {
    const resp = await endpoints.pub.$async$.sadd(MessageServerStoringKeys.SPACES, payload.spaceName);
    if (MessageServerFeedbackCode.SetEntry(resp) === MessageServerFeedbackCode.Global.SUCCESS) {
        return Promise.resolve(new ActionStatus(ActionStatus.SUCCESS, {}));
    } else {
        return Promise.reject(new ActionStatus(ActionStatus.FAILURE, { message: 'Already exist' }));
    }
};

export default fn;