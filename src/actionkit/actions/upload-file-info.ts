import ActionDef from './action-def-standard';
import ActionStatus from '../action-status';
import publish from './publish';
import {
    getFilesFromPath
} from '../../utils';
import {
    MessageServerFeedbackCode,
    MessageServerStoringKeys,
    SubscriptionMessages
} from '../../constants';

let fn: ActionDef;
fn = async function(client: any, payload: any): Promise<ActionStatus> {
    const key = `${payload.spaceName}-${MessageServerStoringKeys.FILES}`;
    const files = await getFilesFromPath(payload.rootPath);
    const resp = await client.$async$.lpush(key, files);
    console.log('from service', key);
    if (MessageServerFeedbackCode.ListEntry(resp) === MessageServerFeedbackCode.Global.SUCCESS) {
        await publish(client, {
            channel: `${payload.spaceName}-${MessageServerStoringKeys.BROADCAST}`,
            message: { code: SubscriptionMessages.FILES_UPLOADED,  params: {
                key: key,
                noOfFiles: resp
            }}
        });
        return Promise.resolve(new ActionStatus(ActionStatus.SUCCESS, { }));
    } else {
        return Promise.reject(new ActionStatus(ActionStatus.FAILURE, { message: `${resp} files uploaded `}));
    }
};

export default fn;