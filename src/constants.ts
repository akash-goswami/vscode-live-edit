export enum ContribStatus {
    OWNER,
    GUEST
}

export enum Mode {
    MASTER = 'Start a workspace',
    SLAVE = 'Join a workspace'
}

export enum MessageServerStoringKeys {
    SPACES = 'SPACES'
}

export const MessageServerFeedbackCode = {
    SetEntry: {
        SUCCESS: 1,
        FAILURE: 0
    }
};