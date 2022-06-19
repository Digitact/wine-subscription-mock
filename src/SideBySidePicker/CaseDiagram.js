import React from 'react';
import {Row, Col} from 'react-bootstrap';
import SixFrameBackground from '../assets/SixFrameBackground.png'
import SixFrameForeground from '../assets/SixFrameForeground.png'
import TwelveFrameBackground from '../assets/TwelveFrameBackground.png'
import TwelveFrameForeground from '../assets/TwelveFrameForeground.png'
import GenericRed from '../assets/GenericRed.png'
import GenericWhite from '../assets/GenericWhite.png'
import GenericRose from '../assets/GenericRose.png'
import GenericChampagne from '../assets/GenericChampagne.png'

//TODO: Colour code the bottles!

export default({caseSize, caseItems}) => {
    let validItems = []
    let itemIcons = []
    for(let i = 0; i < caseSize; i++) {
        if(caseItems.length > i) {
            if(caseItems[i].title) {
                validItems.push(true)
                let icon = GenericRed
                if (caseItems[i].type=="White") icon = GenericWhite
                if (caseItems[i].type=="Rose") icon = GenericRose
                if (caseItems[i].type=="Sparkling") icon = GenericChampagne
                itemIcons.push(icon)
            }
            else {
                validItems.push(false)
            }
        }
        else {
            validItems.push(false)
        }
    }

    let diagramClass = 'case-diagram case-'+caseSize;
    
    return(
        <Row className={diagramClass}>
            {caseSize === 6 ? (<>
                <img className='case-background' src={SixFrameBackground}/>
                
                {validItems[0] && <img className='bottle-six-back' src={itemIcons[0]}/>}
                {validItems[1] && <img className='bottle-six-midbackleft' src={itemIcons[1]}/>}
                {validItems[2] && <img className='bottle-six-midbackright' src={itemIcons[2]}/>}
                {validItems[3] && <img className='bottle-six-midleft' src={itemIcons[3]}/>}
                {validItems[4] && <img className='bottle-six-midright' src={itemIcons[4]}/>}
                {validItems[5] && <img className='bottle-six-front' src={itemIcons[5]}/>}

                <img className='case-foreground' src={SixFrameForeground}/> 
            </>) : (<>
                <img className='case-background' src={TwelveFrameBackground}/>
                
                {validItems[0] && <img className='bottle-12-0' src={itemIcons[0]}/>}
                {validItems[1] && <img className='bottle-12-1' src={itemIcons[1]}/>}
                {validItems[2] && <img className='bottle-12-2' src={itemIcons[2]}/>}
                {validItems[3] && <img className='bottle-12-3' src={itemIcons[3]}/>}
                {validItems[4] && <img className='bottle-12-4' src={itemIcons[4]}/>}
                {validItems[5] && <img className='bottle-12-5' src={itemIcons[5]}/>}
                {validItems[6] && <img className='bottle-12-6' src={itemIcons[6]}/>}
                {validItems[7] && <img className='bottle-12-7' src={itemIcons[7]}/>}
                {validItems[8] && <img className='bottle-12-8' src={itemIcons[8]}/>}
                {validItems[9] && <img className='bottle-12-9' src={itemIcons[9]}/>}
                {validItems[10] && <img className='bottle-12-10' src={itemIcons[10]}/>}
                {validItems[11] && <img className='bottle-12-11' src={itemIcons[11]}/>}

                <img className='case-foreground' src={TwelveFrameForeground}/> 
            </>)}
        </Row>
    )
}
