import { Row } from 'react-bootstrap';
import SixFrameBackground from '../assets/SixFrameBackground.png';
import SixFrameForeground from '../assets/SixFrameForeground.png';
import TwelveFrameBackground from '../assets/TwelveFrameBackground.png';
import TwelveFrameForeground from '../assets/TwelveFrameForeground.png';
import GenericRed from '../assets/GenericRed.png';
import GenericWhite from '../assets/GenericWhite.png';
import GenericRose from '../assets/GenericRose.png';
import GenericChampagne from '../assets/GenericChampagne.png';
import WineOrange from '../assets/WineOrange.png';
import WineSweet from '../assets/WineSweet.png';
import WineFortified from '../assets/WineFortified.png';

//TODO: Colour code the bottles!

export const CaseDiagram = ({ caseSize, caseItems }) => {
    const validItems = [];
    const itemIcons = [];

    for (let i = 0; i < caseItems.length; i++) {
        validItems.push(true);
        let icon = GenericRed;
        if (caseItems[i].wine_type === 'White') icon = GenericWhite;
        if (caseItems[i].wine_type === 'Rose') icon = GenericRose;
        if (caseItems[i].wine_type === 'Sparkling') icon = GenericChampagne;
        if (caseItems[i].wine_type === 'Sweet') icon = WineSweet;
        if (caseItems[i].wine_type === 'Fortified') icon = WineFortified;
        if (caseItems[i].wine_type === 'Orange') icon = WineOrange;
        itemIcons.push(icon);
        //}
    }

    for (let j = 0; j < caseSize - validItems.length; j++) {
        validItems.push(false);
    }

    const diagramClass = 'case-diagram case-' + caseSize;

    return (
        <Row className={diagramClass}>
            {caseSize === 6 ? (
                <>
                    <img className="case-background" src={window.asset_url + SixFrameBackground} alt="" />

                    {validItems[0] && <img className="bottle-six-back" src={itemIcons[0]} alt="" />}
                    {validItems[1] && <img className="bottle-six-midbackleft" src={itemIcons[1]} alt="" />}
                    {validItems[2] && <img className="bottle-six-midbackright" src={itemIcons[2]} alt="" />}
                    {validItems[3] && <img className="bottle-six-midleft" src={itemIcons[3]} alt="" />}
                    {validItems[4] && <img className="bottle-six-midright" src={itemIcons[4]} alt="" />}
                    {validItems[5] && <img className="bottle-six-front" src={itemIcons[5]} alt="" />}

                    <img className="case-foreground" src={window.asset_url + SixFrameForeground} alt="" />
                </>
            ) : (
                <>
                    <img className="case-background" src={window.asset_url + TwelveFrameBackground} alt="" />

                    {validItems[0] && <img className="bottle-12-0" src={itemIcons[0]} alt="" />}
                    {validItems[1] && <img className="bottle-12-1" src={itemIcons[1]} alt="" />}
                    {validItems[2] && <img className="bottle-12-2" src={itemIcons[2]} alt="" />}
                    {validItems[3] && <img className="bottle-12-3" src={itemIcons[3]} alt="" />}
                    {validItems[4] && <img className="bottle-12-4" src={itemIcons[4]} alt="" />}
                    {validItems[5] && <img className="bottle-12-5" src={itemIcons[5]} alt="" />}
                    {validItems[6] && <img className="bottle-12-6" src={itemIcons[6]} alt="" />}
                    {validItems[7] && <img className="bottle-12-7" src={itemIcons[7]} alt="" />}
                    {validItems[8] && <img className="bottle-12-8" src={itemIcons[8]} alt="" />}
                    {validItems[9] && <img className="bottle-12-9" src={itemIcons[9]} alt="" />}
                    {validItems[10] && <img className="bottle-12-10" src={itemIcons[10]} alt="" />}
                    {validItems[11] && <img className="bottle-12-11" src={itemIcons[11]} alt="" />}

                    <img className="case-foreground" src={window.asset_url + TwelveFrameForeground} alt="" />
                </>
            )}
        </Row>
    );
};
