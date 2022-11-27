import { AppState, ProductCaseType, ProductCaseWine, Step, StepPosition, StepState } from '@/utils/types';
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
            const gotoStep = state.steps.find(({ step }) => step === data);
            if (data === state.currentStep) return state; // Already on this step
            if (gotoStep?.state === StepState.Incomplete) return state; // Can't go to incomplete step
            const nextIndex = state.steps.findIndex(({ step }) => step === data);
            return {
                ...state,
                currentStep: gotoStep?.step ?? state.currentStep,
                steps: state.steps.map((step, index) => {
                    if (index === nextIndex) {
                        return {
                            ...step,
                            state: StepState.Current,
                        };
                    }
                    if (index < nextIndex) {
                        return {
                            ...step,
                            state: StepState.Complete,
                        };
                    }
                    if (index > nextIndex) {
                        return {
                            ...step,
                            state: StepState.Incomplete,
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
                showCustomiseStep,
                caseSize,
                selectedCaseCount: caseSize,
                customRules,
                caseType: data.product_case.case_type,
                caseItems: data.product_case.product_case_wines,
                selectedProductId: data.shopify_id,
                sellingPlanGroups: data.selling_plan_groups,
            };
        }

        case ActionType.SELECT_PLAN_GROUP: {
            if (!data) return state;
            return {
                ...state,
                sellingPlans: data.selling_plans,
                selectedSellingGroupPlanId: data.shopify_id,
            };
        }

        case ActionType.SELECT_PLAN: {
            if (!data) return state;
            return {
                ...state,
                selectedSellingPlanId: data.shopify_id,
            };
        }

        case ActionType.INCREMENT_CASE_ITEM: {
            if (!data) return state;
            const { caseItems, selectedCaseCount } = state;
            const newCaseItems: ProductCaseWine[] = caseItems.map((item) => {
                if (item.shopify_id === data.shopify_id) {
                    return {
                        ...item,
                        quantity: `${Number(item.quantity) + 1}`,
                    };
                }
                return item;
            });
            return {
                ...state,
                caseItems: newCaseItems,
                selectedCaseCount: selectedCaseCount + 1,
            };
        }
        case ActionType.DECREMENT_CASE_ITEM: {
            if (!data) return state;
            const { caseItems, selectedCaseCount } = state;
            const newCaseItems: ProductCaseWine[] = caseItems.map((item) => {
                if (item.shopify_id === data.shopify_id) {
                    return {
                        ...item,
                        quantity: `${Number(item.quantity) - 1}`,
                    };
                }
                return item;
            });
            return {
                ...state,
                caseItems: newCaseItems,
                selectedCaseCount: selectedCaseCount - 1,
            };
        }
        default:
            return state;
    }
}
