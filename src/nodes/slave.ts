import Generic from './generic';
import Action from '../services/action';
import { ContribStatus } from '../constants';
import { window } from 'vscode';

export default class SlaveNode extends Generic {
    readonly PROMPT_WS: string = 'Join workspace';
    readonly PROMPT_OWNER: string = 'Your Name';

    getContributionBit (): number {
        return ContribStatus.GUEST;
    }

    async onStart () {
        const status = await this.dispatcher.dispatch(Action.DOWNLOAD_FILES, {
            spaceName: this.sharespace.name
        });
        window.showQuickPick(status.serialize().response.files);
    }

    getSubscriptionChannels(): string[] {
        return [
            'POST_FILE_CONTENT'
        ];
    }

    getChannelActions(): Object {
        return {};
    }
}