export enum ContribStatus {
    OWNER,
    GUEST
}

export enum Mode {
    MASTER = 'Start a workspace',
    SLAVE = 'Join a workspace'
}

export const MessageServerStoringKeys = {
    SPACES: 'SPACES',
    FILES: 'FILES',
    BROADCAST: 'BROADCAST'
};

export const MessageServerFeedbackCode = {
    SetEntry: val => val > 0 ? MessageServerFeedbackCode.Global.SUCCESS : MessageServerFeedbackCode.Global.FAILURE,
    ListEntry: val => val > 0 ? MessageServerFeedbackCode.Global.SUCCESS : MessageServerFeedbackCode.Global.FAILURE,
    Global: {
        SUCCESS: 1,
        FAILURE: 0
    }
};

export const SubscriptionMessages = {
    FILES_UPLOADED: 'FILES_UPLOADED',
    FILE_CONTENT: 'FILE_CONTENT'
};