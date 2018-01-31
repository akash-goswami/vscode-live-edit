export default class ActionStatus {
    static readonly SUCCESS: string = 'Success';
    static readonly FAILURE: string = 'Failure';

    private status: string;
    private response: any;
    private rebounceChannel: any;

    constructor (status: string, response: Object) {
        this.status = status;
        this.response = response;
        this.rebounceChannel = null;
    }

    isSuccess (): boolean {
        return this.status === ActionStatus.SUCCESS;
    }

    isFailure (): boolean {
        return this.status === ActionStatus.FAILURE;
    }

    rebounce (channel: string): ActionStatus {
        this.rebounceChannel = channel;
        this.response = {
            $rebounceChannel: channel
        };
        return this;
    }

    getRebounceData (): string[] {
        return [this.response.$rebounceChannel, this.response.$rebounceParam];
    }

    canRebounce (): boolean {
        return !!this.rebounceChannel;
    }

    rebounceParam (param: any): ActionStatus {
        this.response.$rebounceParam = param;
        return this;
    }

    serialize (): Object {
        return {
            status: this.status,
            response: this.response
        };
    }
}