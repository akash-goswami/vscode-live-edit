'use strict';

import {
    commands,
    ExtensionContext,
    window
} from 'vscode';

import { Mode } from './constants';
import MasterNode from './nodes/master';
import SlaveNode from './nodes/slave';

export function activate(context: ExtensionContext) {
    const disposable = commands.registerCommand('extension.liveEdit', () => {
        // window.showInformationMessage('Live Edit!');

        const modeSelection = window.showQuickPick([Mode.MASTER, Mode.SLAVE]);
        modeSelection.then(select => {
            switch (select) {
                case Mode.MASTER:
                    // @todo: once this is started the options changes
                    new MasterNode(context).start();
                    break;

                case Mode.SLAVE:
                    // @todo: once this is started the option changes
                    new SlaveNode(context).start();
                    break;
            }
        });
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {
}