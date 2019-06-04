import React from 'react';
import styles from './CheckoutSummary.module.scss';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';

const CheckoutSummary = (props) => {
    return (
        <div className={styles.checkoutSummary}>
            <h2>Your Burger Is Ready</h2>
            <p>To complete your order, please click the green Complete Checkout button below.</p>
            <div className={styles.order}>
                <Burger ingredients={props.ingredients} />
            </div>
            <div className={styles.buttons}>
                <Button btnType="cancel" clicked={props.checkoutCanceled}>CANCEL ORDER</Button>
                <Button btnType="success" clicked={props.checkoutContinued}>COMPLETE CHECKOUT</Button>
            </div>
        </div>
    );
}

export default CheckoutSummary;
