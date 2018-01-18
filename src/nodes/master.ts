import Generic from './generic';
import { workspace } from 'vscode';
import { getFilesFromPath } from '../utils';
import { ContribStatus } from '../constants';

export default class MasterNode extends Generic {
    static readonly ROOT_PATH = workspace.rootPath;

    readonly PROMPT_WS: string = 'Workspace name';
    readonly PROMPT_OWNER: string = 'Your name';

    getContributionBit (): number {
        return ContribStatus.OWNER;
    }

    async onStart () {
        const files = await getFilesFromPath(MasterNode.ROOT_PATH);
        console.log(files);
    }
}