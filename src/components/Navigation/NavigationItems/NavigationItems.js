import React from 'react';
import styles from './NavigationItems.module.scss';
import NavigationItem from '../NavigationItem/NavigationItem';

const NavigationItems = (props) => (
    <ul className={styles.navigationItems}>
        <NavigationItem linkStyle={props.activeStyle} link='/' exact>Burger Builder</NavigationItem>
        <NavigationItem linkStyle={props.activeStyle} link='/orders'>Orders</NavigationItem>
    </ul>
);

export default NavigationItems;
