import React from 'react';
import Tilt from 'react-parallax-tilt';
import image from './face-detection.png';

import './Logo.css';


const Logo = () => {
    return (
        <div className='' >
        <Tilt className=' Tilt br2 shadow-2' >
            
                <img src={image}/>
           
         </Tilt>

        </div>
    );
}

export default Logo;