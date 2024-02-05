// custominput.js

import React, { useState } from "react";

const CustomInput = (props) => {
  const { type, i_class, i_id, label, name, val, onCh, onBlr } = props;
  const [focused, setFocused] = useState(false);

  const handleFocus = () => {
    setFocused(true);
  };

  const handleBlur = (event) => {
    if (!event.target.value) {
      setFocused(false);
    }
    // You can also call the provided onBlur callback if it exists
    if (onBlr) {
      onBlr(event);
    }
  };

  return (
    <div className="form-floating mt-3">
      <input
        type={type}
        className={`form-control ${i_class}`}
        id={i_id}
        name={name}
        value={val}
        onChange={onCh}
        onBlur={handleBlur} 
        onFocus={handleFocus}
      />
      <label
        htmlFor={i_id}
        style={{
          marginTop: val || focused ? '8px' : '0',
          opacity: focused ? '0.1' : '1',
          transition: 'all 0.3s ease',
          pointerEvents: focused ? 'none' : 'initial',
          userSelect: 'none',
        }}
      >
        {label}
      </label>
    </div>
  );
};

export default CustomInput;
