import clsx from 'clsx';
import { useStoreContext } from '@/store/context';
import { decrementCaseItem, incrementCaseItem } from '@/store/actions';
import { ProductCaseWine } from '@/utils/types';
import { CaseItem } from './CaseItem';

export function GlobalPicker() {
    const { state, dispatch } = useStoreContext();

    const handleIncrement = (item: ProductCaseWine) => {
        dispatch(incrementCaseItem(item));
    };

    const handleDecrement = (item: ProductCaseWine) => {
        dispatch(decrementCaseItem(item));
    };

    return (
        <div>
            <div className="my-2">
                <div>
                    <h3>
                        Selected: {state.selectedCaseCount}/{state.caseSize}
                    </h3>
                </div>
            </div>
            <div className="flex scrollable">
                <div className="flex flex-wrap">
                    {state.caseItems.map((item, index) => (
                        <CaseItem
                            key={item.image}
                            className={clsx('w-1/2', index % 3 ? 'case-item-light' : 'case-item-dark')}
                            onIncrement={() => handleIncrement(item)}
                            onDecrement={() => handleDecrement(item)}
                            image={item.image}
                            title={item.title}
                            disabled={state.selectedCaseCount === state.caseSize}
                            wineType={item.wine_type}
                            quantity={Number(item.quantity)}
                            maxQuantity={Number(item.max)}
                            minQuantity={Number(item.min)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default GlobalPicker;
