import React from 'react';
import styles from './OrderSummary.module.scss';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients)
        .map(igKey => {
            return <li key={igKey}><span className={{textTransform: 'capitalize'}}>{igKey}</span>: {props.ingredients[igKey]}</li>
        });

    return (
        <div className={styles.orderSummary}>
            <h3>Your Order</h3>
            <p>Your tasty burger contains the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <div className={styles.priceInfo}>
                <div className={styles.priceLabel}>Total Price:</div>
                <div className={styles.price}>${props.price.toFixed(2)}</div>
            </div>
            <div className={styles.checkout}>
                <h3>Continue to Checkout?</h3>
                <div className={styles.btn}>
                    <Button btnType="cancel" clicked={props.checkoutCanceled}>Cancel</Button>
                    <Button btnType="success" clicked={props.checkoutContinue}>Continue</Button>
                    {/* <button className={styles.btnCancel} onClick={props.cancel}>Cancel</button>
                    <button>Continue</button> */}
                </div>
            </div>
        </div>
    );
};

export default orderSummary;