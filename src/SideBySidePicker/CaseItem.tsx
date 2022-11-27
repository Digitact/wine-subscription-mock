import { Strings, Language } from '@/utils/Strings';
import { WineType } from '@/utils/types';

interface CaseItemProps {
    wineType: WineType;
    title: string;
    image: string;
    quantity: number;
    disabled: boolean;
    minQuantity: number;
    maxQuantity: number;
    onIncrement: () => void;
    onDecrement: () => void;
}

export function CaseItem({
    image,
    title,
    wineType,
    quantity,
    disabled,
    minQuantity,
    maxQuantity,
    onDecrement,
    onIncrement,
}: CaseItemProps) {
    const { CaseItem } = Strings[Language];
    const QtyText = CaseItem.Quantity;
    const LimitText = CaseItem.Limit;
    const MinimumText = CaseItem.Minimum;

    return (
        <div>
            <div className="flex h-[150px] w-full">
                <img src={image} height={140} className="object-contain px-5" alt={title} />
            </div>
            <div className="flex m-auto">
                <div className="flex justify-end w-1/4 p-0">
                    <button className={'circle-button-bg '} onClick={onDecrement} disabled={quantity === minQuantity}>
                        <b>-</b>
                    </button>
                </div>
                <div className="w-1/3 md:w-5/12">
                    <p className="text-center">
                        {QtyText}: {quantity}
                    </p>
                </div>
                <div className="flex justify-start w-1/4 p-0">
                    <button
                        className={'circle-button-bg'}
                        onClick={onIncrement}
                        disabled={disabled || quantity === maxQuantity}
                    >
                        <b>+</b>
                    </button>
                </div>
            </div>
            <div className="flex">
                <p className="text-center">{title}</p>
            </div>
            <div className="flex">
                <div>
                    <p>{wineType}</p>
                </div>
                <div>
                    <p>
                        {minQuantity > 0 ? (
                            <>
                                {' '}
                                {MinimumText} {minQuantity}
                                <br />
                            </>
                        ) : (
                            <></>
                        )}
                        {LimitText} {maxQuantity}
                    </p>
                </div>
            </div>
        </div>
    );
}
