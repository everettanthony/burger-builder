import React from 'react';
import styles from './Order.module.scss';

const Order = (props) => {
    const ingredients = [];

    for ( let ingredientName in props.ingredients ) {
        ingredients.push(
            {
                name: ingredientName,
                amount: props.ingredients[ingredientName]
            }
        );
    }

    const ingredientOutput = ingredients.map(ig => {
        return <span className={styles.ingredient}
            key={ig.name}>{ig.name} ({ig.amount})</span>;
    });

    return (
        <div className={styles.order}>
            <div className={styles.item}>
                <label>Ingredients: </label> {ingredientOutput}
            </div>
            <div className={styles.item}>
                <label>Price: </label> ${props.price}
            </div>
            <div className={[styles.item, styles.customer].join(' ')}>
                <label>Customer Information: </label>
                <div className={styles.customerData}>
                    <div>
                        <label>First Name</label>
                        {props.customer.fname}
                    </div>
                    <div>
                        <label>Last Name</label>
                        {props.customer.lname}
                    </div>
                    <div>
                        <label>Email</label>
                        {props.customer.email}
                    </div>
                    <div>
                        <label>Phone</label>
                        {props.customer.phone}
                    </div>
                    <div>
                        <label>Address</label>
                        <div>{props.customer.street}</div>
                        {props.customer.street2 ? <div>{props.customer.street2}</div> : null}
                        <div>{props.customer.city}, {props.customer.state} {props.customer.zip}</div>
                    </div>
                    <div>
                        <label>Delivery Method</label>
                        {props.customer.deliveryMethod}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Order;
