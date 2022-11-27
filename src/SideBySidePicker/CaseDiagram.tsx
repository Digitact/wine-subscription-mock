import SixFrameBackground from '@/assets/SixFrameBackground.png';
import SixFrameForeground from '@/assets/SixFrameForeground.png';
import TwelveFrameBackground from '@/assets/TwelveFrameBackground.png';
import TwelveFrameForeground from '@/assets/TwelveFrameForeground.png';
import GenericRed from '@/assets/GenericRed.png';
import GenericWhite from '@/assets/GenericWhite.png';
import GenericRose from '@/assets/GenericRose.png';
import GenericChampagne from '@/assets/GenericChampagne.png';
import WineOrange from '@/assets/WineOrange.png';
import WineSweet from '@/assets/WineSweet.png';
import WineFortified from '@/assets/WineFortified.png';
import { useStoreContext } from '@/store/context';
import { WineType } from '@/utils/types';

const wineTypeIcons = {
    [WineType.Red]: GenericRed,
    [WineType.White]: GenericWhite,
    [WineType.Rose]: GenericRose,
    [WineType.Sparkling]: GenericChampagne,
    [WineType.Orange]: WineOrange,
    [WineType.Sweet]: WineSweet,
    [WineType.Fortified]: WineFortified,
};

const wineBackgrounds: Record<number, string> = {
    6: SixFrameBackground,
    12: TwelveFrameBackground,
};

const wineForegrounds: Record<number, string> = {
    6: SixFrameForeground,
    12: TwelveFrameForeground,
};

// TODO: Colour code the bottles!
export function CaseDiagram() {
    const { state } = useStoreContext();

    const diagramClass = 'flex case-diagram case-' + state.caseSize;

    return (
        <div className={diagramClass}>
            <img
                className="case-background"
                src={`${window.asset_url}${wineBackgrounds[state.caseSize]}`}
                alt="background"
            />
            {state.caseItems.map((item, index) => {
                return (
                    <img
                        key={item.shopify_id}
                        className={`bottle-${state.caseSize}-${index}`}
                        src={wineTypeIcons[item.wine_type]}
                        alt={item.title}
                    />
                );
            })}

            <img
                className="case-foreground"
                src={`${window.asset_url}${wineForegrounds[state.caseSize]}`}
                alt="foreground"
            />
        </div>
    );
}
