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
import WineOrange from '../assets/WineOrange.png'
import WineSweet from '../assets/WineSweet.png'
import WineFortified from '../assets/WineFortified.png'

//TODO: Colour code the bottles!

export default({caseSize, caseItems}) => {
    let validItems = []
    let itemIcons = []

    //alert("caseSize:"+caseSize);
    //alert("caseItems.length:"+caseItems.length);

    for(let i = 0; i < caseItems.length; i++) {
        //alert("i:"+i);
        //for (let j = 0; j < caseItems[i].quantity; j++) {
            //console.log(caseItems[i]);
            //alert("j:"+j);
            //alert("caseItems[i].title:"+caseItems[i].title);
            validItems.push(true)
            let icon = GenericRed
            if (caseItems[i].wine_type=="White") icon = GenericWhite
            if (caseItems[i].wine_type=="Rose") icon = GenericRose
            if (caseItems[i].wine_type=="Sparkling") icon = GenericChampagne
            if (caseItems[i].wine_type=="Sweet") icon = WineSweet
            if (caseItems[i].wine_type=="Fortified") icon = WineFortified
            if (caseItems[i].wine_type=="Orange") icon = WineOrange
            itemIcons.push(icon)   
        //}
    }
    //alert("remaining:"+(caseSize-validItems.length));
    
    for (let j = 0; j < (caseSize-validItems.length); j++) {
        validItems.push(false)
    }

    let diagramClass = 'case-diagram case-'+caseSize;
    
    return(
        <Row className={diagramClass}>
            {caseSize === 6 ? (<>
                <img className='case-background' src={'https://howards-folly-wine.digitact.co.uk/' + SixFrameBackground}/>
                
                {validItems[0] && <img className='bottle-six-back' src={itemIcons[0]}/>}
                {validItems[1] && <img className='bottle-six-midbackleft' src={itemIcons[1]}/>}
                {validItems[2] && <img className='bottle-six-midbackright' src={itemIcons[2]}/>}
                {validItems[3] && <img className='bottle-six-midleft' src={itemIcons[3]}/>}
                {validItems[4] && <img className='bottle-six-midright' src={itemIcons[4]}/>}
                {validItems[5] && <img className='bottle-six-front' src={itemIcons[5]}/>}

                <img className='case-foreground' src={'https://howards-folly-wine.digitact.co.uk/' + SixFrameForeground}/> 
            </>) : (<>
                <img className='case-background' src={'https://howards-folly-wine.digitact.co.uk/' + TwelveFrameBackground}/>
                
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

                <img className='case-foreground' src={'https://howards-folly-wine.digitact.co.uk/' + TwelveFrameForeground}/> 
            </>)}
        </Row>
    )
}
