import React, {useState} from 'react'
import {Container, Row, Col} from 'react-bootstrap'
import WineClubAdminSteps from './WineClubAdminSteps'

export default({currentStep, clubName, rules}) => {

    return (
        <Container>
            <WineClubAdminSteps currentStep={currentStep} />
        </Container>
    )
}