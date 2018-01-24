import Generic from './generic';
import { ContribStatus } from '../constants';

export default class SlaveNode extends Generic {
    readonly PROMPT_WS: string = 'Join workspace';
    readonly PROMPT_OWNER: string = 'Your Name';

    getContributionBit (): number {
        return ContribStatus.GUEST;
    }

    async onStart () {
    }

    getSubscriptionChannels(): string[] {
        return [
        ];
    }

    getChannelActions(): Object {
        return {};
    }
}