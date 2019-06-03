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
        </div>
    );
};

export default Order;
