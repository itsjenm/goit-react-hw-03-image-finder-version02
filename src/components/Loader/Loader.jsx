import React from 'react';
import Styled from './loader.module.css';
import { Audio } from 'react-loader-spinner';

const Loader = () => {
  return (
    <div className={Styled.Loader}>
        <Audio
        height = "80"
        width = "80"
        radius = "9"
        color = 'green'
        ariaLabel = 'three-dots-loading'     
        wrapperStyle
        wrapperClass
        />
       
    </div>
  )
}

export default Loader