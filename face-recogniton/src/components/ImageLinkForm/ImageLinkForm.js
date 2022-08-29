import React from 'react';

import './ImageLinkForm.css';


const ImageLinkForm = () => {
    return (
        <div>
        <p className='f5 center pa2'>
            {'This Magic Brain will detect faces in your pictures. Give it a try'}
        </p>
        <div className='center'>
        <div className='pa4 br3 shadow-5 form center pa2'>
            <input className='f5 pa2 w-50' type='text' />
            <button className='w-30 grow f5 link ph1 pv2 dib white bg-light-purple'>Detect</button>
            </div>
        </div>
    
        </div>
    );
}

export default ImageLinkForm;