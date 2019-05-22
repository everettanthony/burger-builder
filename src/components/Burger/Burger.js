import React from 'react';
import styles from './Burger.module.scss';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
    // Build array of all ingredients listed in the ingredients object
    let burgerIngredients = Object.keys(props.ingredients)
        .map(igKey => {
            return [...Array(props.ingredients[igKey])].map((_, i) => {
                return <BurgerIngredient key={igKey + i} type={igKey} />;
            });
        })
        .reduce((arr, el) => {
            return arr.concat(el);
        }, []); // Use .reduce() to flatten the burgerIngredients array, which contains inner arrays

    if (burgerIngredients.length === 0) {
        burgerIngredients = <p className={styles.message}>Your burger is boring without any ingredients.</p>
    }    

    return (
        <div className={styles.burger}>
            <BurgerIngredient type="bread-top" />
                {burgerIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
}

export default burger;