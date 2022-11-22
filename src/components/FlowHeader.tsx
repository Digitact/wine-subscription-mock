import { Row, Col } from 'react-bootstrap';
import clsx from 'clsx';
import Tick from '@/assets/tick.png';
import { useStoreContext } from '@/store/context';
import { gotoStep } from '@/store/actions';
import { StepState } from '@/utils/types';

export function FlowHeader() {
    const { state, dispatch } = useStoreContext();

    const rows = state.steps.map((step, index) => (
        <Col
            className={clsx(`${step.state}-step`)}
            onClick={(e) => {
                e.preventDefault();
                dispatch(gotoStep(index));
            }}
        >
            <h3 style={{ height: '36px', 'font-size': '36px' }} className="text-dark">
                {step.name}
                {step.state === StepState.Complete ? (
                    <>
                        <img
                            className="mx-2"
                            style={{ 'vertical-align': 'baseline' }}
                            alt="Tick"
                            src={window.asset_url + Tick}
                            width={26}
                            height={26}
                        />
                    </>
                ) : null}
            </h3>
            <p className="text-dark">{step.name}</p>
        </Col>
    ));

    return <Row>{rows}</Row>;
}
