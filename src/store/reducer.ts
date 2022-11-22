import { AppState, StepState } from '@/utils/types';
import { Actions, ActionType } from '@/store/actions';

export function storeReducer(state = {} as AppState, { action, data }: Actions) {
    switch (action) {
        case ActionType.INCREMENT_STEP:
            return {
                ...state,
                currentStep: state.steps.find((step) => step.state === StepState.Incomplete)?.name,
            };
        case ActionType.GOTO_STEP:
            if (stepIndex >= 0 && stepIndex < Object.keys(steps).length) {
                setStepIndex(i);
                const sl = stepLabels;
                sl.forEach((label, j) => {
                    if (j >= i) sl[j] = { key: '', name: '' };
                });
                setStepLabels(sl);
            }
            return {
                ...state,
                currentStep: data,
            };
        default:
            return state;
    }
}
