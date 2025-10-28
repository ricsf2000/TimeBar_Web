import React from 'react';
import './add.css';

function Add(props) {
  return (props.trigger) ? (
    <div className="add">
      <div className="add-inner">
        <button className='close2' onClick={() => props.setTrigger(false)}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        {props.children}
      </div>
    </div>
  ) : "";
}

export default Add