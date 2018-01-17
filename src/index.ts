'use strict';

import {
    ExtensionContext,
    commands,
    window
} from 'vscode';

export function activate(context: ExtensionContext) {

    let disposable = commands.registerCommand('extension.liveEdit', () => {
        window.showInformationMessage('Live Edit!');
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {
}