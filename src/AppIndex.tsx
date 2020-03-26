import React from 'react';
import Header from '@navikt/nap-header';
import KalkulatorInput from './components/KalkulatorInput';

const AppIndex = () => (
    <>
        <Header title="Omsorgsdagerkalkulator" />
        <KalkulatorInput />
    </>
);

export default AppIndex;
