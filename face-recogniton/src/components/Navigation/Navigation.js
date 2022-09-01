import React from 'react';
import './Navigation.css';

const Navigation = ({onRouteChange, isSignedIn, }) => {
    
        if(isSignedIn){
            return(
            <nav className="nav">
                <p 
                    className='f4'
                    onClick={() => onRouteChange('signout')}
                    >Sign Out
                </p>
            </nav>
            );
         } else{
            return(
                <nav className="nav">
                    <p 
                        className='f4'
                        onClick={() => onRouteChange('signin')}
                        >Sign In
                    </p>

                    <p 
                        className='f4'
                        onClick={() => onRouteChange('register')}
                        >Register
                    </p>
                </nav>
            );
         
        }
 
}

export default Navigation;