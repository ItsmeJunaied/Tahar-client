import React from 'react';
import './DashBoardHome.css';
import Revenue from './Revenue/Revenue';
import Scatistics from '../Scatistics/Scatistics';
import Stats from '../Stats/Stats';
const DashBoardHome = () => {
    return (
        <div className=' container mx-auto'>

            <Revenue></Revenue>
            <Scatistics></Scatistics>
            <Stats></Stats>
        </div>
    );
};

export default DashBoardHome;