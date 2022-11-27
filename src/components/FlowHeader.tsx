import clsx from 'clsx';
import { useStoreContext } from '@/store/context';
import { gotoStep } from '@/store/actions';
import { StepState } from '@/utils/types';
import { CheckIcon } from './Icons/CheckIcon';

export function FlowHeader() {
    const { state, dispatch } = useStoreContext();

    const rows = state.steps
        .filter((step) => step.visible)
        .map((step, index) => (
            <button
                key={step.step}
                disabled={step.state === StepState.Incomplete}
                className={clsx(`${step.state}-step`, 'flex-grow min-w-[20%] mb-4')}
                onClick={() => {
                    dispatch(gotoStep(step.step));
                }}
            >
                <h3
                    className={clsx(
                        'flex items-center w-full text-4xl',
                        step.state === StepState.Current ? 'text-primary' : 'text-gray-400',
                    )}
                >
                    {index + 1}
                    {step.state === StepState.Complete ? <CheckIcon className="w-6 h-6 fill-green-600" /> : null}
                </h3>
                <p className={clsx(step.state === StepState.Current ? 'text-primary' : 'text-gray-400')}>{step.name}</p>
            </button>
        ));

    return <div className="flex">{rows}</div>;
}
