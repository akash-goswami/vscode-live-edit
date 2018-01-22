export default class ActionStatus {
    static readonly SUCCESS: string = 'Success';
    static readonly FAILURE: string = 'Failure';

    private status: string;
    private response: Object;

    constructor (status: string, response: Object) {
        this.status = status;
        this.response = response;
    }

    isSuccess (): boolean {
        return this.status === ActionStatus.SUCCESS;
    }

    isFailure (): boolean {
        return this.status === ActionStatus.FAILURE;
    }

    serialize (): Object {
        return {
            status: this.status,
            response: this.response
        };
    }
}