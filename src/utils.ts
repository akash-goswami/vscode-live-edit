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