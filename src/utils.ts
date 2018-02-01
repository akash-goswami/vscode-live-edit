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
        lpush: promisify(client.lpush).bind(client),
        lrange: promisify(client.lrange).bind(client),
        llen: promisify(client.llen).bind(client)
    };
}

export class PubSubStore {
    private store: Object;
    constructor () {
        this.store = {};
    }

    entry (key: string, fn: Function): PubSubStore {
        let storeVal;
        if (key in this.store) {
            this.store[key].push(fn);
            return this;
        }
        storeVal = this.store[key] = [];
        storeVal.push(fn);
        return this;
    }

    list (key: string): Function[] {
        return this.store[key] || [];
    }

    has (key: string): boolean {
        return (key in this.store);
    }
}