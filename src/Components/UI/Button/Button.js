import React from 'react';
import classes from './Button.css';

const button= (props) => (
    <button
        disabled= {props.disabled}
        className={[classes.Button, classes[props.btnType]].join(' ')}
        // Array of strings  for classes : using join they will concat
        onClick= { props.clicked }> { props.children } </button>
);

export default button;
