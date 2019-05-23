import React from 'react';
import Aux from '../../hoc/Auxiliary';
import styles from './Layout.module.scss';
import Toolbar from '../Navigation/Toolbar/Toolbar';

const layout = ( props ) => (
    <Aux>
        <div className={styles.container}>
            <Toolbar />
            <main  className={styles.main}>
                {props.children}
            </main>
        </div>
    </Aux>
);

export default layout;
