import React from 'react';
import styles from './CheckoutSummary.module.scss';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';

const CheckoutSummary = (props) => {
    return (
        <div className={styles.checkoutSummary}>
            <h2>Thank you for your order</h2>
            <div className={styles.order}>
                <Burger ingredients={props.ingredients} />
            </div>
            <div className={styles.buttons}>
                <Button btnType="cancel" clicked={props.checkoutCanceled}>CANCEL</Button>
                <Button btnType="success" clicked={props.checkoutContinued}>CONTINUE</Button>
            </div>
        </div>
    );
}

export default CheckoutSummary;
