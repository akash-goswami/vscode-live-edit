import { ExtensionContext, window } from 'vscode';
import ShareSpace from './share-space';
import * as redis from 'redis';
import Dispatcher from '../services/dispatcher';
import { promisifyMsgClientAPI } from '../utils';
import Action from '../actionkit/action';

export default abstract class Generic {
    protected sharespace: ShareSpace;

    context: ExtensionContext;
    messagingClient: Object;
    dispatcher: Dispatcher;

    readonly PROMPT_WS: string = '';
    readonly PROMPT_OWNER: string = '';

    constructor (context: ExtensionContext) {
        this.context = context;
        this.messagingClient = redis.createClient();
        promisifyMsgClientAPI(this.messagingClient);
        this.dispatcher = new Dispatcher(this.messagingClient);
    }

    private gatherStartInfo (): Promise<string[]> {
        return new Promise((res, rej) => {
            let workspace = null;
            // @todo not a good model. Works for two prompts.
            // @todo Build an accumulator to accumulate and pass all the previous thenable value.
            window.showInputBox({ prompt: this.PROMPT_WS })
                .then(ws => {
                    if (ws === undefined) {
                        throw new Error('Workspace name not provided');
                    }
                    workspace = ws;
                    return window.showInputBox({ prompt: this.PROMPT_OWNER });
                })
                .then(owner => {
                    if (!owner) {
                        throw new Error('Owner name not provided');
                    }
                    res([workspace, owner]);
                });
        });

    }

    private populateShareSpaceConfig (configArr: string[], contribBit: number): void {
        this.sharespace = {
            name: configArr[0],
            user: [configArr[1], contribBit]
        };
    }

    abstract async onStart();

    protected abstract getContributionBit(): number;

    protected abstract getSubscriptionChannels(): string[];

    protected abstract getChannelActions(): Object;

    private onStartGeneric(): void {
        const subscriptionChannels: string[] = this.getSubscriptionChannels();
        const actions = this.getChannelActions();
        for (const channel of subscriptionChannels) {
            this.dispatcher.dispatch('subscribe', {
                channel: channel,
                fn: subscriptionChannels[channel],
                spaceName: this.sharespace.name
            });
        }
    }

    async start () {
        // Initial prompt to get the workspace name and user name
        const info = await this.gatherStartInfo();

        // ShareSpace config copy saved for each node. This copy contains information for the project
        this.populateShareSpaceConfig(info, this.getContributionBit());

        // Make entry of the sharespace name to the server, if the key already exist the ops fails
        const resp = await this.dispatcher.dispatch(Action.REGISTER_WORKSPACE, { spaceName: this.sharespace.name });

        // OnStart hook called. The master has to load all the files on the central messaging server. Slave has to
        // look for files update.
        await this.onStart();
        this.onStartGeneric();
    }
}