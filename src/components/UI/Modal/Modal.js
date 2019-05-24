import React from 'react';
import styles from './Modal.module.scss';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import Overlay from '../Overlay/Overlay';

const modal = (props) => (
    <Aux>
        <div style={{
                transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                opacity: props.show ? '1' : '0'
            }} className={styles.modal}>
            <i className={['material-icons', styles.close].join(' ')} onClick={props.modalClosed}>clear</i>
            {props.children}
        </div>
        <Overlay show={props.show} clicked={props.modalClosed} />
    </Aux>
);

export default modal;

