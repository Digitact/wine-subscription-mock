export interface ActionCreator<ActionType = string, ActionData = unknown> {
    action: ActionType;
    data?: ActionData;
}

export enum ActionType {
    INCREMENT_STEP = 'INCREMENT_STEP',
    GOTO_STEP = 'GOTO_STEP',
}

export type Actions = ActionCreator<ActionType.INCREMENT_STEP> | ActionCreator<ActionType.GOTO_STEP, number>;

export const gotoStep = (data: number): Actions => ({ action: ActionType.GOTO_STEP, data });
export const incrementStep = (): Actions => ({ action: ActionType.INCREMENT_STEP });
