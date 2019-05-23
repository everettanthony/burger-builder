import React from 'react';
import styles from './Overlay.module.scss';

const overlay = (props) => (
    props.show ? <div className={styles.overlay} onClick={props.clicked}></div> : null
);

export default overlay;
