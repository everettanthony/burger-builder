import React from 'react';
import styles from './Input.module.scss';

const Input = (props) => {
    let inputEl = null;
    const inputStyles = [styles.inputElement];

    if (props.invalid && props.touched) {
        inputStyles.push(styles.error);
    }

    switch (props.elementtype) {
        case ('input'):
            inputEl = <input 
                className={inputStyles.join(' ')} 
                {...props.elementConfig} 
                value={props.value} 
                onChange={props.changed} />;
            break;
        case ('textarea'):
            inputEl = <textarea 
                className={inputStyles.join(' ')}
                {...props.elementConfig} 
                value={props.value} 
                onChange={props.changed} />;
            break;
        case ('select'):
            inputEl = (
                <select
                    className={inputStyles.join(' ')}
                    value={props.value}
                    onChange={props.changed}>
                    {props.elementConfig.options.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.displayValue}
                        </option>
                    ))}
                </select>
            );
            break;
        default:
            inputEl = <input 
                value={props.value} 
                {...props.elementConfig}
                className={inputStyles.join(' ')}
                onChange={props.changed} />;
    }

    return (
        <div className={styles.formControl}>
            <label>{props.elementConfig.label}</label>
            {inputEl}
        </div>
    );

};

export default Input;
