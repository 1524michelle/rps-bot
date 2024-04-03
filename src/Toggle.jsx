// import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import sunIcon from '../public/sun.png';
import moonIcon from '../public/moon.png';
import './Toggle.css';

const Toggle = ({ mode , onClick }) => {
    const handleToggle = () => {
        onClick();
    }

    const handleKeyDown = (event) => {
        if (event.key === ' ' || event.key === 'Enter') {
            handleToggle();
        }
    };

    return (
        <>
            <div 
                className={`container ${mode}`} 
                role="switch"
                aria-checked={mode === 'dark' ? 'true' : 'false'}
                tabIndex="0"
                onClick={handleToggle}
                onKeyDown={handleKeyDown}
            >
                <div className={`switch ${mode}`}>
                    {mode === 'light' ? (
                        <img src={sunIcon} className='toggle-icon' alt="light mode" />
                    ) : (
                        <img src={moonIcon} className='toggle-icon' alt="dark mode" />
                    )}
                </div>
            </div>
        </>
    )
};

Toggle.propTypes = {
    mode: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
};

export default Toggle;