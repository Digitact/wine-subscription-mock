import { createContext, Dispatch, useContext, useReducer } from 'react';
import { useMemoCompare } from '@/hooks/useMemoCompare';
import { AppState, StepState, StepType } from '@/utils/types';
import { Actions } from '@/store/actions';
import { storeReducer } from '@/store/reducer';

export const initialState: AppState = {
    currentStep: StepType.Step1,
    stepLabels: [],
    steps: [
        {
            name: StepType.Step1,
            state: StepState.Current,
            visible: true,
        },
        {
            name: StepType.Step2,
            state: StepState.Incomplete,
            visible: true,
        },
        {
            name: StepType.Step3,
            state: StepState.Incomplete,
            visible: true,
        },
        {
            name: StepType.Step4,
            state: StepState.Incomplete,
            visible: true,
        },
        {
            name: StepType.Step5,
            state: StepState.Incomplete,
            visible: true,
        },
    ],
    products: [],
};

type StoreContext = {
    state: AppState;
    dispatch: Dispatch<Actions>;
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
