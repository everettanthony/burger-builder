import React, { Component } from 'react';
import { connect } from 'react-redux';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import axios from '../../axios-orders';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actionTypes from '../../store/actions';

class BurgerBuilder extends Component {
    // Old way of initializing state
    // constructor(props) {
    //     super(props);
    //     this.state = {...}
    // }

    state = {
        checkingOut: false,
        loading: false,
        error: false
    }

    componentDidMount() {
        console.log('PROPS: ', this.props);
        // axios.get('https://burger-builder-6498e.firebaseio.com/ingredients.json', 
        //     )
        //     .then(rsp => {
        //         this.setState({ ingredients: rsp.data });
        //     })
        //     .catch(err => {
        //         this.setState({ error: true });
        //     });
    }

    updateCheckoutState = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            }).reduce((sum, el) => {
                return sum + el;
            }, 0);

        return sum > 0;
    }

    checkoutHandler = () => {
        this.setState({checkingOut: true});
    }

    checkoutCancelHandler = () => {
        this.setState({checkingOut: false});
    }

    checkoutContinueHandler = () => {
        this.props.history.push('/checkout');
    }
    
    render(props) {
        const disabledInfo = { ...this.props.ings };

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        } // {lettuce: true, meat: false, bacon: true, ...}

        let orderSummary = null;
        let burger = this.state.error ? <p style={{ margin: '50px', textAlign: 'center'}}>No ingredients found.</p> : <Spinner />;

        // If we get ingredients back from Firebase
        if (this.props.ings) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls 
                        price={this.props.price}
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        disabled={disabledInfo}
                        checkout={this.updateCheckoutState(this.props.ings)}
                        ordering={this.checkoutHandler}/>
                </Aux>
            );

            orderSummary = <OrderSummary 
                price={this.props.price}
                checkoutCanceled={this.checkoutCancelHandler}
                checkoutContinue={this.checkoutContinueHandler}
                ingredients={this.props.ings} />;
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

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch({ type: actionTypes.ADD_INGREDIENT, ingredientName: ingName }),
        onIngredientRemoved: (ingName) => dispatch({ type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName })
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));