import { readFile } from 'fs';
import { join } from 'path';
import ActionStatus from '../../services/action-status';

export default function(context: any): Function {
    return async function(payload: any): Promise<Object> {
        return new Promise((res, rej) => {
            const absPath = join(context.rootPath, payload.filePath);
            readFile(absPath, { encoding: 'utf-8' }, (err, data) => {
                if (err) {
                    rej(new ActionStatus(ActionStatus.FAILURE,  { err: err.message }));
                } else {
                    res(new ActionStatus(ActionStatus.SUCCESS, { })
                        .rebounce('POST_FILE_CONTENT')
                        .rebounceParam({
                            ack: payload.ack,
                            file: payload.filePath,
                            data
                        })
                    );
                }
            });
        });
    };
}