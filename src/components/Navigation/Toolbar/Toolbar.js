import React from 'react';
import styles from './Toolbar.module.scss';
import Button from '../../UI/Button/Button';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';

const Toolbar = (props) => (
    <header className={styles.toolbar}>
        <div className={styles.container}>
            <div className={styles.menu}>
                <Button btnType="icon" clicked={props.drawerToggleClicked}>
                    <i className="material-icons">menu</i>
                </Button>
            </div>
            <div className={styles.logo}><Logo /></div>
            <nav className={styles.mainNav}>
                <NavigationItems activeStyle={styles.active} />
            </nav>
        </div>
    </header>
);

export default Toolbar;
