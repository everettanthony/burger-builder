import React, { Component } from 'react';
import styles from './Modal.module.scss';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import Overlay from '../Overlay/Overlay';

class Modal extends Component {
    shouldComponentUpdate ( nextProps, nextState ) {
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
    }

    componentWillUpdate () {
        console.log('[Modal] WillUpdate');
    } 

    render() {
        return (
            <Aux>
                <div 
                    className={styles.modal}
                    style={{
                        transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.show ? '1' : '0'
                    }}>
                    <i className={['material-icons', styles.close].join(' ')} onClick={this.props.modalClosed}>clear</i>
                    {this.props.children}
                </div>
                <Overlay show={this.props.show} clicked={this.props.modalClosed} />
            </Aux>
        );
    }
};

export default Modal;

