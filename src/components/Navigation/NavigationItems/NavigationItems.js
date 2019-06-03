import React from 'react';
import styles from './NavigationItems.module.scss';
import NavigationItem from '../NavigationItem/NavigationItem';

const NavigationItems = (props) => (
    <ul className={styles.navigationItems}>
        <NavigationItem link='/' exact>Burger Builder</NavigationItem>
        <NavigationItem link='/orders'>Orders</NavigationItem>
    </ul>
);

export default NavigationItems;
