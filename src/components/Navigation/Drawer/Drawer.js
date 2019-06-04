import React from 'react';
import styles from './Drawer.module.scss';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Overlay from '../../UI/Overlay/Overlay';
import Aux from '../../../hoc/Auxiliary/Auxiliary';

const Drawer = (props) => {
    let classes = [styles.drawer, styles.close];

    if (props.open) {
        classes = [styles.drawer, styles.open];
    }

    return (
        <Aux>
            <div className={classes.join(' ')}>
                <i className={['material-icons', styles.iconClose].join(' ')} onClick={props.closed}>clear</i>
                <div className={styles.header}>
                    <div className={styles.logo}><Logo /></div>
                </div>
                <nav className={styles.navigation}>
                    <div className={styles.navigationItems}><NavigationItems activeStyle={styles.active} /></div>
                </nav>
            </div>
            <Overlay show={props.open} clicked={props.closed} />
        </Aux>
    );
};

export default Drawer;
