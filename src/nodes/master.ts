import Generic from './generic';
import { workspace } from 'vscode';
import { getFilesFromPath } from '../utils';
import { ContribStatus } from '../constants';
import Action from '../services/action';

export default class MasterNode extends Generic {
    static readonly ROOT_PATH = workspace.rootPath;

    readonly PROMPT_WS: string = 'Workspace name';
    readonly PROMPT_OWNER: string = 'Your name';

    getContributionBit (): number {
        return ContribStatus.OWNER;
    }

    async onStart () {
        this.dispatcher.dispatch(Action.UPLOAD_FILES, {
            rootPath: MasterNode.ROOT_PATH,
            spaceName: this.sharespace.name
        });
    }
}