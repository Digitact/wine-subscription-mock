export const WineList = ({ wines }) => {
    return (
        <div className="wine_list">
            <ul>
                {wines.map(wine => {
                    return (
                        <li key={wine.title}>
                            <p>
                                {wine.quantity} x {wine.title}
                            </p>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};
