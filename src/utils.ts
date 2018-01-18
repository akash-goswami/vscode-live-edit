import * as glob from 'glob';

export function getFilesFromPath(path:string): Promise<string[]> {
    return new Promise((res, rej) => {
        glob(`${path}/**/*`, {
            ignore: '**/node_modules/**'
        }, (err, resp) => {
            if (err)
                rej(err);
            res(resp);
        })
    });
}