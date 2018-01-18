import { ExtensionContext, window } from 'vscode';

export default class Generic {
    context: ExtensionContext;

    readonly PROMPT_WS: string = '';
    readonly PROMPT_OWNER: string = '';

    constructor (context: ExtensionContext) {
        this.context = context;
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

    async start () {
        const info = await this.gatherStartInfo();
        console.log(info);
    }
}