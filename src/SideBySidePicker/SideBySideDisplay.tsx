import { GlobalPicker } from './GlobalPicker';
import { CaseDiagram } from './CaseDiagram';

export function SideBySideDisplay() {
    return (
        <div className="pb-5">
            <div className="flex">
                <div className="md:w-1/2">
                    <GlobalPicker />
                </div>

                {/** sm=8 since the col moves to its own row */}
                <div className="mx-auto sm:w-2/3 md:w-1/2 lg:w-5/12 xl:w-1/3 min-h-[700px]">{<CaseDiagram />}</div>
            </div>

            {/** magic div that sits behind the case picker in mobile view */}
            <div className="mx-auto md:hidden min-h-[700px]" />
        </div>
    );
}

export default SideBySideDisplay;
