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
            inputEl = <input value={props.value} {...props} className={inputStyles.join(' ')} />;
            break;
        case ('textarea'):
            inputEl = <textarea value={props.value} {...props} className={inputStyles.join(' ')} />;
            break;
        case ('select'):
            inputEl = (
                <select value={props.value} {...props} className={inputStyles.join(' ')}>
                    {props.children}
                </select>
            );
            break;
        default:
            inputEl = <input value={props.value} {...props} className={inputStyles.join(' ')} />;
    }

    return (
        <div className={styles.formControl}>
            <label>{props.label}</label>
            {inputEl}
        </div>
    );

};

export default Input;
