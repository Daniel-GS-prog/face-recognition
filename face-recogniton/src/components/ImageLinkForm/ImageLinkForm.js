import React from 'react';

import './ImageLinkForm.css';


const ImageLinkForm = () => {
    return (
        <div>
        <p className='imageText'>
            {'You give us the image, we give you the face. No questions asked.'}
        </p>
        <div className='center flex box'>
            <div className='shadow-5 form'>
                 <input className='' type='text' />
                <button className=' grow bg-light-purple'>Detect</button>
                </div>
            </div>
    
        </div>
    );
}

export default ImageLinkForm;