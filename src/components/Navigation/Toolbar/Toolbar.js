import React from 'react';
import styles from './Toolbar.module.scss';

const Toolbar = (props) => (
    <header className={styles.toolbar}>
        <div className={styles.container}>
            <div className={styles.menu}>MENU</div>
            <div className={styles.logo}>LOGO</div>
            <nav className={styles.mainNav}>
                NAV ITEMS
            </nav>
        </div>
    </header>
);

export default Toolbar;
