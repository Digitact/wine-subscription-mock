import { ProductCaseWine } from '@/utils/types';

export const WineList = ({ wines }: { wines: ProductCaseWine[] }) => {
    return (
        <div className="wine_list">
            <ul>
                {wines.map((wine) => (
                    <li key={wine.title}>
                        <p>
                            {wine.quantity} x {wine.title}
                        </p>
                    </li>
                ))}
            </ul>
        </div>
    );
};
