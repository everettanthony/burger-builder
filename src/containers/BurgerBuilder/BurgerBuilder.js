import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import axios from '../../axios-orders';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
    lettuce: 0.5,
    bacon: 0.7,
    cheese: 0.4,
    meat: 1.3
}

class BurgerBuilder extends Component {
    // Old way of initializing state
    // constructor(props) {
    //     super(props);
    //     this.state = {...}
    // }

    state = {
        ingredients: null,
        totalPrice: 2,
        checkOutReady: false,
        checkingOut: false,
        loading: false,
        error: false
    }

    componentDidMount() {
        axios.get('https://burger-builder-6498e.firebaseio.com/ingredients.json')
            .then(rsp => {
                console.log('INGREDIENTS: ', rsp);
                this.setState({ ingredients: rsp.data });
            })
            .catch(err => {
                console.log('ERROR', err);
                this.setState({ error: true });
            });
    }

    updateCheckoutState = (ingredients) => {
        const sum = Object.keys(ingredients).map(igKey => {
            return ingredients[igKey];
        }).reduce((sum, el) => {
            return sum + el;
        }, 0);

        this.setState({checkOutReady: sum > 0})
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = { 
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const newPrice = this.state.totalPrice + priceAddition;
        this.setState({ingredients: updatedIngredients, totalPrice: newPrice});
        this.updateCheckoutState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];

        if (oldCount <= 0) {         
            return;
        }

        const updatedCount = oldCount - 1;
        const updatedIngredients = { 
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceDeduction = INGREDIENT_PRICES[type];
        const newPrice = this.state.totalPrice - priceDeduction;
        this.setState({ingredients: updatedIngredients, totalPrice: newPrice});
        this.updateCheckoutState(updatedIngredients);
    }

    checkoutHandler = () => {
        this.setState({checkingOut: true});
    }

    checkoutCancelHandler = () => {
        this.setState({checkingOut: false});
    }

    checkoutContinueHandler = () => {
        // console.log('You have continued.');
        // this.setState( { loading: true } );
        // const order = {
        //     ingredients: this.state.ingredients,
        //     price: this.state.totalPrice,
        //     customer: {
        //         fname: 'Tony',
        //         lname: 'Bradshaw',
        //         address: {
        //             street: '123 Sesame Street',
        //             city: 'Bronx',
        //             state: 'New York',
        //             zip: '76112',
        //             country: 'USA'
        //         },
        //         phone: '817-867-5309',
        //         email: 'tonybradshaw@gmail.com'
        //     },
        //     deliveryMethod: 'fastest'
        // };

        // axios.post('/orders.json', order).then(rsp => {
        //     console.log( 'ORDER: ', rsp );
        //     this.setState({ loading: false, checkingOut: false });
        // }).catch(err => {
        //     console.log( 'ERROR: ', err);
        //     this.setState({ loading: false, checkingOut: false });
        // });

        const params = [];
        for (let i in this.state.ingredients) {
            params.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
        }

        const queryString = params.join('&');

        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        });
    }
    
    render(props) {
        const disabledInfo = { ...this.state.ingredients };

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        } // {lettuce: true, meat: false, bacon: true, ...}

        let orderSummary = null;
        let burger = this.state.error ? <p style={{ margin: '50px', textAlign: 'center'}}>No ingredients found.</p> : <Spinner />;

        // If we get ingredients back from Firebase
        if (this.state.ingredients) {
            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls 
                        price={this.state.totalPrice}
                        ingredientAdded={this.addIngredientHandler}
                        ingredientRemoved={this.removeIngredientHandler}
                        disabled={disabledInfo}
                        checkout={this.state.checkOutReady}
                        ordering={this.checkoutHandler}/>
                </Aux>
            );

            orderSummary = <OrderSummary 
                price={this.state.totalPrice}
                checkoutCanceled={this.checkoutCancelHandler}
                checkoutContinue={this.checkoutContinueHandler}
                ingredients={this.state.ingredients} />;
        }

        if (this.state.loading) {
            orderSummary = <Spinner />;
        }

        return (
            <Aux>
                <Modal show={this.state.checkingOut} modalClosed={this.checkoutCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);