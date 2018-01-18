import { ExtensionContext, window } from 'vscode';
import ShareSpace from './share-space';
import * as redis from 'redis';

export default abstract class Generic {
    protected sharespace: ShareSpace;

    context: ExtensionContext;
    messagingClient: Object;

    readonly PROMPT_WS: string = '';
    readonly PROMPT_OWNER: string = '';

    constructor (context: ExtensionContext) {
        this.context = context;
        this.messagingClient = redis.createClient();
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

    abstract async onStart ()

    protected abstract getContributionBit(): number

    async start () {
        // Initial prompt to get the workspace name and user name
        const info = await this.gatherStartInfo();
        
        // ShareSpace config copy saved for each node. This copy contains information for the project
        this.populateShareSpaceConfig(info, this.getContributionBit());

        // OnStart hook called. The master has to load all the files on the central messaging server. Slave has to
        // look for files update.
        await this.onStart();
    }
}