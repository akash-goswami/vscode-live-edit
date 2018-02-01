import Generic from './generic';
import { workspace } from 'vscode';
import { getFilesFromPath } from '../utils';
import { ContribStatus } from '../constants';
import Action from '../services/action';
import * as MsgAction from './master-msg-actions/index';

export default class MasterNode extends Generic {
    static readonly ROOT_PATH = workspace.rootPath;

    readonly PROMPT_WS: string = 'Workspace name';
    readonly PROMPT_OWNER: string = 'Your name';

    getContributionBit (): number {
        return ContribStatus.OWNER;
    }

    getSubscriptionChannels(): string[] {
        return [
            'FILE_CONTENT'
        ];
    }

    getChannelActions(): Object {
        const preparedActions = { };
        for (const action in MsgAction) {
            if (!({}).hasOwnProperty.call(MsgAction, action)) {
                continue;
            }
            preparedActions[action] = MsgAction[action]({
                rootPath: MasterNode.ROOT_PATH
            });
        }
        return preparedActions;
    }

    async onStart () {
        // Make entry of the sharespace name to the server, if the key already exist the ops fails
        const resp = await this.dispatcher.dispatch(Action.REGISTER_WORKSPACE, { spaceName: this.sharespace.name });

        this.dispatcher.dispatch(Action.UPLOAD_FILES, {
            rootPath: MasterNode.ROOT_PATH,
            spaceName: this.sharespace.name
        });
    }
}