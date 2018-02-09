import React from 'react';
import classes from './Input.css';

const input = (props) => {
    let inputElement = null;
    let inputClasses = [classes.InputElement];

    if(props.invalid && props.shouldValidate && props.touched ){
        inputClasses.push(classes.InValid);
    }
    
    switch( props.elementtype){
        case ('input'): //console.log("sd");
            inputElement= <input 
                                className={inputClasses.join(' ')} 
                                {...props.elementconfig} 
                                value={props.value}
                                onChange={props.changed}/>
            break;
        case ('textarea'):
            inputElement = <textarea
                                 className={inputClasses.join(' ')} 
                                 {...props.elementconfig} 
                                 value={props.value}
                                 onChange={props.changed}/>
            break;
        case ('select'):
            inputElement = <select
                                className={inputClasses.join(' ')}  
                                value={props.value}
                                onChange={props.changed}> 
                                {props.elementconfig.options.map( options => (
                                    <option key={options.value} value={options.value}>
                                       {options.displayValue}
                                    </option>
                                ))
                                }
                            </select>
          break;
        default : 
            inputElement = <input 
                                className={inputClasses.join(' ')} 
                                {...props.elementconfig} 
                                value={props.value}
                                onChange={props.changed}/>
    }

    let validationError = null;
    if(props.invalid && props.touched){
        validationError=<p className={classes.ValidationError}>Please enter a valid value</p> 
    }

    return (
        <div className={classes.Input}>
            <label className={classes.Label} >{props.label}</label>
            {inputElement}
            {validationError}
        </div>
            
    );
};

export default input;