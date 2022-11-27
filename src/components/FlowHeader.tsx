import clsx from 'clsx';
import { useStoreContext } from '@/store/context';
import { gotoStep } from '@/store/actions';
import { StepState } from '@/utils/types';
import { CheckIcon } from './Icons/CheckIcon';

export function FlowHeader() {
    const { state, dispatch } = useStoreContext();

    const rows = state.steps.map((step) => (
        <div
            key={step.step}
            className={clsx(`${step.state}-step`, 'w-1/5 mb-4')}
            onClick={(e) => {
                e.preventDefault();
                dispatch(gotoStep(step.step));
            }}
        >
            <h3 className="flex items-center w-full text-4xl text-dark">
                {step.step}
                {step.state === StepState.Complete ? <CheckIcon className="w-6 h-6 fill-green-600" /> : null}
            </h3>
            <p className="text-dark">{step.name}</p>
        </div>
    ));

    return <div className="flex">{rows}</div>;
}
