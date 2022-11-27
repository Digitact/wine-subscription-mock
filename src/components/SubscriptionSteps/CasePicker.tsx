import { SideBySideDisplay } from '@/SideBySidePicker/SideBySideDisplay';
import { incrementStep } from '@/store/actions';
import { useStoreContext } from '@/store/context';
import { FlowSelection } from '../FlowSelection';

export function CasePicker() {
    const { state, dispatch } = useStoreContext();

    const finishCase = () => {
        dispatch(incrementStep());
    };

    return (
        <div>
            <FlowSelection />

            <div className="flex">
                <div>
                    {state.selectedCaseCount !== state.caseSize ? (
                        <p className="text-center">Please finalise your selection before continuing</p>
                    ) : (
                        <p className="text-center">You may now complete your order</p>
                    )}
                </div>
                <div className="flex align-items-right">
                    <button
                        onClick={() => finishCase()}
                        disabled={state.selectedCaseCount !== state.caseSize}
                        className="w-full px-8 py-4 text-white bg-black"
                    >
                        Continue
                    </button>
                </div>
            </div>

            <div className="flex">
                <SideBySideDisplay />
            </div>
        </div>
    );
}
