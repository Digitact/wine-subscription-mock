import clsx from 'clsx';
import { Strings, Language } from '@/utils/Strings';
import { WineType } from '@/utils/types';
import { Button } from '@/components/Button';

interface CaseItemProps {
    wineType: WineType;
    title: string;
    image: string;
    className?: string;
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
    className = '',
    onDecrement,
    onIncrement,
}: CaseItemProps) {
    const { CaseItem } = Strings[Language];
    const QtyText = CaseItem.Quantity;
    const LimitText = CaseItem.Limit;
    const MinimumText = CaseItem.Minimum;

    return (
        <div className={clsx(className, 'space-y-2')}>
            <div className="flex h-[150px] w-full">
                <img src={image} height={140} className="h-full px-5 mx-auto" alt={title} />
            </div>
            <div className="flex m-auto">
                <div className="flex">
                    <Button className="rounded-full" onClick={onDecrement} disabled={quantity === minQuantity}>
                        <b>-</b>
                    </Button>
                </div>
                <div className="w-1/3 md:w-5/12">
                    <p className="text-center">
                        {QtyText}: {quantity}
                    </p>
                </div>
                <div className="flex">
                    <Button
                        className="rounded-full"
                        onClick={onIncrement}
                        disabled={disabled || quantity === maxQuantity}
                    >
                        <b>+</b>
                    </Button>
                </div>
            </div>
            <div className="flex">
                <p className="w-full text-center">{title}</p>
            </div>
            <div className="flex justify-between">
                <p>{wineType}</p>
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
    );
}
