import * as glob from 'glob';
import * as promisify from 'util.promisify';

export function getFilesFromPath(path: string): Promise<string[]> {
    return new Promise((res, rej) => {
        glob(`${path}/**/*`, {
            ignore: '**/node_modules/**'
        }, (err, resp) => {
            if (err) {
                rej(err);
            }
            res(resp);
        });
    });
}

export function promisifyMsgClientAPI(client: any): void {
    client.$async$ = {
        sadd: promisify(client.sadd).bind(client)
    };
}