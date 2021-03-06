import React from 'react';
import styles from './Button.module.scss';

const Button = (props) => (
    <button disabled={props.disabled} className={[styles.button, styles[props.btnType]].join(' ')} onClick={props.clicked}>{props.children}</button>
);

export default Button;
