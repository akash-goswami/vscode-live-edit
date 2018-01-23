import * as glob from 'glob';
import * as promisify from 'util.promisify';
import { relative } from 'path';

export function getFilesFromPath(path: string): Promise<string[]> {
    return new Promise((res, rej) => {
        glob(`${path}/**/*`, {
            ignore: '**/node_modules/**'
        }, (err, resp) => {
            if (err) {
                rej(err);
            }
            res(resp.map(absPath => relative(path, absPath)));
        });
    });
}

export function promisifyMsgClientAPI(client: any): void {
    client.$async$ = {
        sadd: promisify(client.sadd).bind(client),
        lpush: promisify(client.lpush).bind(client)
    };
}

export class PubSubStore {
    private store: Object;
    private history: Object;

    constructor () {
        this.store = {};
        this.history = {};
    }

    entry (key: string, fn: Function): PubSubStore {
        if (!(key in this.store)) {
            (this.history[key] = this.history[key] || []).push(fn);
            return this;
        }
        this.store[key].push(fn);
        return this;
    }

    create (key: string): PubSubStore {
        if (key in this.store) {
            return this;
        }
        this.store[key] = [];
        this.store[key].push(...(this.history[key] || []));
        delete this.history[key];
        return this;
    }

    list (key: string): Function[] {
        return this[key] || [];
    }

    has (key: string): boolean {
        return (key in this.store);
    }
}