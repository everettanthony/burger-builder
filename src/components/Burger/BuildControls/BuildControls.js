import React from 'react';
import styles from './BuildControls.module.scss';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    { label: 'Lettuce', type: 'lettuce' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' }
];

const buildControls = (props) => (
    <div className={styles.buildControls}>
        <div className={styles.container}>
            {controls.map(ctrl => (
                <BuildControl 
                    key={ctrl.label} 
                    label={ctrl.label} 
                    added={() => props.ingredientAdded(ctrl.type)}
                    removed={() => props.ingredientRemoved(ctrl.type)}
                    disabled={props.disabled[ctrl.type]}
                />
            ))}
        </div>
        <div className={styles.container}>
            <div className={styles.priceLabel}>Total Price</div>
            <div className={styles.price}>${props.price.toFixed(2)}</div>
            <button 
                className={styles.orderButton}
                disabled={!props.checkout}
                onClick={props.ordering}>Place Order</button>
        </div>
    </div>
);

export default buildControls;
