import React from 'react';
import styles from './NavigationItems.module.scss';
import NavigationItem from '../NavigationItem/NavigationItem';

const NavigationItems = (props) => (
    <ul className={styles.navigationItems}>
        <NavigationItem link={'http://google.com'} target="new">Google</NavigationItem>
        <NavigationItem link={'http://udemy.com'} target="new">Udemy</NavigationItem>
        <NavigationItem link={'http://github.com'} target="new">Github</NavigationItem>
    </ul>
);

export default NavigationItems;
