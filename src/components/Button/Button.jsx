import React from 'react'
import Styled from './button.module.css';

// load more button 
const Button = ({ text, buttonClick }) => {
  return (
    <button className={Styled.Button} type='button' onClick={buttonClick}>{text}</button>
  )
}

export default Button