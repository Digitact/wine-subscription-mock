import { SideBySideDisplay } from '@/SideBySidePicker/SideBySideDisplay';
import { incrementStep } from '@/store/actions';
import { useStoreContext } from '@/store/context';
import { Button } from '../Button';
import { FlowSelection } from '../FlowSelection';

export function CasePicker() {
    const { state, dispatch } = useStoreContext();

    const finishCase = () => {
        dispatch(incrementStep());
    };

    return (
        <div>
            <FlowSelection />

            <div className="flex items-center space-x-4">
                {state.selectedCaseCount !== state.caseSize ? (
                    <p className="text-center">Please finalise your selection before continuing</p>
                ) : (
                    <p className="text-center">You may now complete your order</p>
                )}

                <Button onClick={finishCase} disabled={state.selectedCaseCount !== state.caseSize} className="w-auto">
                    Continue
                </Button>
            </div>

            <SideBySideDisplay />
        </div>
    );
}
