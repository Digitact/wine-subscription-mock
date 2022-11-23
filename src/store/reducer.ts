import { AppState, ProductCaseType, Step, StepPosition, StepState } from '@/utils/types';
import { Actions, ActionType } from '@/store/actions';

function getNextStep(steps: Step[]): StepPosition | undefined {
    return steps.find(({ state }) => state === StepState.Incomplete)?.step;
}

export function storeReducer(state = {} as AppState, { action, data }: Actions): AppState {
    switch (action) {
        case ActionType.INCREMENT_STEP: {
            const nextStep = getNextStep(state.steps) ?? state.currentStep;

            return {
                ...state,
                currentStep: nextStep,
                steps: state.steps.map((step) => {
                    if (step.step === state.currentStep) {
                        return {
                            ...step,
                            state: StepState.Complete,
                        };
                    }
                    if (step.step === nextStep) {
                        return {
                            ...step,
                            state: StepState.Current,
                        };
                    }
                    return step;
                }),
            };
        }
        case ActionType.GOTO_STEP: {
            if (!data) return state;
            const nextStep = getNextStep(state.steps) ?? state.currentStep;
            return {
                ...state,
                currentStep: state.steps[data].step,
                steps: state.steps.map((step) => {
                    if (step.step === state.currentStep) {
                        return {
                            ...step,
                            state: StepState.Complete,
                        };
                    }
                    if (step.step === nextStep) {
                        return {
                            ...step,
                            state: StepState.Current,
                        };
                    }
                    return step;
                }),
            };
        }
        case ActionType.ADD_PRODUCTS:
            if (!data) return state;
            return {
                ...state,
                products: data,
            };
        case ActionType.SELECT_PRODUCT: {
            if (!data) return state;
            const showCustomiseStep = data.product_case.case_type === ProductCaseType.Custom;
            const customRules = data.product_case.product_case_wines;
            const caseSize = Number(data.product_case.case_size);

            return {
                ...state,
                currentStep: nextStep,
                steps: state.steps.map((step) => {
                    if (step.step === state.currentStep) {
                        return {
                            ...step,
                            state: StepState.Complete,
                        };
                    }
                    if (step.step === nextStep) {
                        return {
                            ...step,
                            state: StepState.Current,
                        };
                    }
                    return step;
                }),
                showCustomiseStep,
                caseSize,
                customRules,
                selectedProductId: data.shopify_id,
                // caseItems: state.selectedProduct !== data.shopify_id ? [] : state.caseItems,
            };
        }

        case ActionType.SELECT_PLAN: {
            if (!data) return state;
            const nextStep = getNextStep(state.steps) ?? state.currentStep;
            return {
                ...state,
                currentStep: nextStep,
                selectedSellingPlanId: data,
            };
        }
        default:
            return state;
    }
}
