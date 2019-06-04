import React, { Component } from 'react';
import axios from '../../../axios-orders';
import styles from './ContactData.module.scss';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

export class ContactData extends Component {
    state = {
        orderForm: {
            fname: 'Tony',
            lname: 'Bradshaw',
            street: '123 Sesame Street',
            city: 'Bronx',
            state: 'New York',
            zip: '76112',
            country: 'USA',
            phone: '817-867-5309',
            email: 'tonybradshaw@gmail.com',
            deliveryMethod: 'fastest'
        },
        loading: false
    };

    orderHandler = (evt) => {
        evt.preventDefault();
        this.setState( { loading: true } );
        const formData = {};

        for (let val in this.state.orderForm) {
            formData[val] = this.state.orderForm[val]
        }

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderData: formData
        };

        axios.post('/orders.json', order)
            .then(rsp => {
                this.setState({ loading: false });
                this.props.history.push('/');
            })
            .catch(err => {
                this.setState({ loading: false });
        });
    }

    inputChangeHandler = (evt) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        }

        updatedOrderForm[evt.target.name] = evt.target.value;
        this.setState({ orderForm: updatedOrderForm });
    }

    render() {
        let form = (
            <form className={styles.contactForm} onSubmit={this.orderHandler}>
                <div className={styles.formRow}>
                    <Input elementtype="input" type="text" name="fname" label="First Name" onChange={this.inputChangeHandler} />
                    <Input elementtype="input" type="text" name="lname" label="Last Name" onChange={this.inputChangeHandler} />
                </div>
                <div className={styles.formRow}>
                    <Input elementtype="input" type="text" name="email" label="Email" onChange={this.inputChangeHandler} />
                    <Input elementtype="input" type="text" name="phone" label="Phone" onChange={this.inputChangeHandler} />
                </div>
                <div className={styles.formRow}>
                    <Input elementtype="input" type="text" name="street" label="Street" onChange={this.inputChangeHandler} />
                    <Input elementtype="input" type="text" name="street2" label="Street2" onChange={this.inputChangeHandler} />
                </div>
                <div className={styles.formRow}>
                    <Input elementtype="input" type="text" name="city" label="City" onChange={this.inputChangeHandler} />
                    <Input elementtype="input" type="text" name="state" label="State" onChange={this.inputChangeHandler} />
                    <Input elementtype="input" type="text" name="zip" label="Zip" onChange={this.inputChangeHandler} />
                </div>
                <div className={styles.formRow}>
                    <Input elementtype="select" name="deliveryMethod" label="Delivery Method" onChange={this.inputChangeHandler}>
                        <option value="slowest">Slowest</option>
                        <option value="fastest">Fastest</option>
                        <option value="expensive">Expensive</option> 
                    </Input>
                </div>
                <div className={styles.formRow}>
                    <div className={[styles.formControl,styles.btnControl].join(' ')}>
                        <Button btnType="success">PLACE ORDER</Button>
                    </div>
                </div>
                {/* Input with placeholder text */}
                {/* <Input inputtype="input" 
                        type="text" 
                        name="fname" 
                        label="First Name" 
                        placeholder="First Name" 
                        onFocus={(e) => e.target.placeholder = ""} 
                        onBlur={(e) => e.target.placeholder = "First Name"}/> */}
            </form>
        );

        if (this.state.loading) {
            form = <Spinner />;
        }

        return (
            <div className={styles.contactData}>
                <h2>Contact Information</h2>
                {form}
            </div>
        );
    }
}

export default ContactData;
