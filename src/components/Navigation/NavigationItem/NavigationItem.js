import React from 'react';
import styles from './NavigationItem.module.scss';

const NavigationItem = (props) => (
    <li className={styles.navigationItem}>
        <a href={props.link} 
           className={props.active ? styles.active : null}
           target={props.target === 'new' ? '_blank' : '_self'}
            >{props.children}
        </a>
    </li>
);

export default NavigationItem;
