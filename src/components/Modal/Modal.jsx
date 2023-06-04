import React, { useEffect } from 'react';
import Styled from './modal.module.css';

const Modal = ({ onModalClose, children }) => {
    useEffect(() => {
        function handleKeyDown(event) {
            if(event.code === 'Escape') {
                onModalClose(); 
            }
        }

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        }
    }, [onModalClose]);

    const handleBackdropClick = event => {
        if (event.currentTarget === event.target) {
            onModalClose(); 
        }
    }

  return (
    <div className={Styled.Overlay} onClick={handleBackdropClick}>
        
        <div className={Styled.Modal}>
           {children}
        </div>
    </div>
  )
}

export default Modal