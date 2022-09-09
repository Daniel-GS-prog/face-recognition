import React from 'react';
import './Rank.css';

// updating the user's information from props name and entries:
const Rank = ({name, entries}) => {
    return (
        <div className='center display-flex '>
            <div className='white f4 text'>
            {`${name}, you're current rank is... `} 

                <div className='white f3'>
                {`${entries}`}
                </div>

            </div>

            
        </div>
    );
}

export default Rank;