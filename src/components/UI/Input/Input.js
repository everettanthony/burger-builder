import React from 'react';
import styles from './Input.module.scss';

const Input = (props) => {
    let inputEl = null;

    switch (props.elementtype) {
        case ('input'):
            inputEl = <input value={props.value} {...props} />;
            break;
        case ('textarea'):
            inputEl = <textarea value={props.value} {...props} />;
            break;
        case ('select'):
            inputEl = (
                <select value={props.value} {...props}>
                    {props.children}
                </select>
            );
            break;
        default:
            inputEl = <input value={props.value} {...props} />;
    }

    return (
        <div className={styles.formControl}>
            <label>{props.label}</label>
            {inputEl}
        </div>
    );

};

export default Input;
