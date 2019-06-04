import React from 'react';
import styles from './NavigationItem.module.scss';
import { NavLink } from 'react-router-dom';

const NavigationItem = (props) => (
    <li className={styles.navigationItem}>
        <NavLink 
            to={props.link}
            exact={props.exact}
            activeClassName={props.linkStyle ? props.linkStyle : styles.active}>{props.children}</NavLink>
    </li>
);

export default NavigationItem;
