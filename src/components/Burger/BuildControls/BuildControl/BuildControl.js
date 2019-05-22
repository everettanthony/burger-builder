import React from 'react';
import styles from './BuildControl.module.scss';

const buildControl = (props) => (
    <div className={styles.buildControl}>
        <div className={styles.label}>{props.label}</div>
        <button className={styles.less} onClick={props.removed} disabled={props.disabled}><i className="material-icons">remove</i></button>
        <button className={styles.more} onClick={props.added}><i className="material-icons">add</i></button>
    </div>
);

export default buildControl;
