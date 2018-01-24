import { readFile } from 'fs';
import { join } from 'path';

export default function(context: any): Function {
    return async function(payload: any): Promise<Object> {
        return new Promise((res, rej) => {
            payload = JSON.parse(payload);
            console.log('logging from service', context.rootPath, payload.filePath);
            // const absPath = join(context.rootPath, payload.filePath);
            // readFile(absPath, { encoding: 'utf-8' }, (err, data) => {
            //     if (err) {
            //         rej(err);
            //     } else {
            //         res(data);
            //     }
            // });
        });
    };
}