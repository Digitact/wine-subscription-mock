import { createContext, Dispatch, DispatchWithoutAction, useContext, useReducer } from 'react';
import { useMemoCompare } from '@/hooks/useMemoCompare';
import { AppState, StepState, StepPosition, StepTitle } from '@/utils/types';
import { Actions } from '@/store/actions';
import { storeReducer } from '@/store/reducer';

export const initialState: AppState = {
    currentStep: StepPosition.Step1,
    stepLabels: [{ key: '', name: '' }],
    steps: [
        {
            step: StepPosition.Step1,
            name: StepTitle.Step1,
            state: StepState.Current,
            visible: true,
        },
        {
            step: StepPosition.Step2,
            name: StepTitle.Step2,
            state: StepState.Incomplete,
            visible: true,
        },
        {
            step: StepPosition.Step3,
            name: StepTitle.Step3,
            state: StepState.Incomplete,
            visible: true,
        },
        {
            step: StepPosition.Step4,
            name: StepTitle.Step4,
            state: StepState.Incomplete,
            visible: true,
        },
        {
            step: StepPosition.Step5,
            name: StepTitle.Step5,
            state: StepState.Incomplete,
            visible: true,
        },
    ],
    products: [],
    caseSize: 12,
    customRules: [],
    customRuleId: '',
    showCustomiseStep: false,
    selectedProductId: '',
    selectedSellingPlanId: '',
};

type StoreContext = {
    state: AppState;
    dispatch: DispatchWithoutAction | Dispatch<Actions>;
};

// eslint-disable-next-line @typescript-eslint/no-empty-function
const StoreContext = createContext({ state: initialState, dispatch: (_a: Actions) => {} });

const StoreProvider = ({ ...props }) => {
    const [state, dispatch] = useReducer(storeReducer, initialState);

    const contextValue = useMemoCompare({ state, dispatch });

    return <StoreContext.Provider value={contextValue} {...props} />;
};

const useStoreContext = () => {
    return useContext(StoreContext);
};

export { StoreProvider, useStoreContext };
