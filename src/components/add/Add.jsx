import React from 'react';
import './add.css';

function Add(props) {
  return (props.trigger) ? (
    <div className="add">
      <div className="add-inner">
        <button className='close2' style={{border: 'none'}} onClick={() => props.setTrigger(false)}>X</button>
        {props.children}
      </div>
    </div>
  ) : "";
}

export default Add