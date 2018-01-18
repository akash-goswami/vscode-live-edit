import * as actions from './actions/index';
import ActionStatus from './action-status';

export default class Dispatcher {
    private endpoint: Object;

    constructor (client: Object) {
        this.endpoint = client;
    }

    async dispatch (actionName: string, payload: Object): Promise<ActionStatus> {
        return actions[actionName](this.endpoint, payload);
    }
}