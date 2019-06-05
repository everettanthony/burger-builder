import React, { Component } from 'react';
import axios from '../../../axios-orders';
import styles from './ContactData.module.scss';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

export class ContactData extends Component {
    state = {
        orderForm: {
            fname: {
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            lname: {
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            phone: {
                value: '',
                validation: {
                    required: false
                },
                valid: true,
                touched: false
            },
            street: {
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street2: {
                value: '',
                validation: {
                    required: false
                },
                valid: true,
                touched: false
            },   
            city: {
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },           
            state: {
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zip: {
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            }
        },
        formIsValid: false,
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
        let name = evt.target.name;

        const updatedOrderForm = {
            ...this.state.orderForm
        }

        updatedOrderForm[name].value = evt.target.value;
        updatedOrderForm[name].valid = this.isInputValid(updatedOrderForm[name].value, updatedOrderForm[name].validation);
        updatedOrderForm[name].touched = true;

        console.log('valid', updatedOrderForm[name].valid);

        let formIsValid = true;
        for (let inputId in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputId].valid && formIsValid;
        }

        this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid });
    }

    isInputValid = (value, rules) => {     
        let isValid = true;

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        return isValid;
    }

    render() {
        const formEls = [];
        for (let key in this.state.orderForm) {
            formEls.push({
                id: key,
                config: this.state.orderForm[key]
            }); 
        }

        let form = (
            <form className={styles.contactForm} onSubmit={this.orderHandler}>
                <div className={styles.formRow}>
                    <Input elementtype="input" value={formEls[0].config.value} invalid={!formEls[0].config.valid} touched={formEls[0].config.touched} type="text" name="fname" label="First Name" onChange={this.inputChangeHandler} required />
                    <Input elementtype="input" value={formEls[1].config.value} invalid={!formEls[1].config.valid} touched={formEls[1].config.touched} type="text" name="lname" label="Last Name" onChange={this.inputChangeHandler} required />
                </div>
                <div className={styles.formRow}>
                    <Input elementtype="input" value={formEls[2].config.value} invalid={!formEls[2].config.valid} touched={formEls[2].config.touched} type="text" name="email" label="Email" onChange={this.inputChangeHandler} required />
                    <Input elementtype="input" value={formEls[3].config.value} invalid={!formEls[3].config.valid} touched={formEls[3].config.touched} type="text" name="phone" label="Phone" onChange={this.inputChangeHandler} />
                </div>
                <div className={styles.formRow}>
                    <Input elementtype="input" value={formEls[4].config.value} invalid={!formEls[4].config.valid} touched={formEls[4].config.touched} type="text" name="street" label="Street" onChange={this.inputChangeHandler} required />
                    <Input elementtype="input" value={formEls[5].config.value} invalid={!formEls[5].config.valid} touched={formEls[5].config.touched} type="text" name="street2" label="Street2" onChange={this.inputChangeHandler} />
                </div>
                <div className={styles.formRow}>
                    <Input elementtype="input" value={formEls[6].config.value} invalid={!formEls[6].config.valid} touched={formEls[6].config.touched} type="text" name="city" label="City" onChange={this.inputChangeHandler} required />
                    <Input elementtype="input" value={formEls[7].config.value} invalid={!formEls[7].config.valid} touched={formEls[7].config.touched} type="text" name="state" label="State" onChange={this.inputChangeHandler} required />
                    <Input elementtype="input" value={formEls[8].config.value} invalid={!formEls[8].config.valid} touched={formEls[8].config.touched} type="text" name="zip" label="Zip" onChange={this.inputChangeHandler} required />
                </div>
                <div className={styles.formRow}>
                    <Input elementtype="select" value={formEls[9].config.value} invalid={!formEls[9].config.valid} touched={formEls[9].config.touched} name="deliveryMethod" label="Delivery Method" onChange={this.inputChangeHandler}>
                        <option value="slowest">Slowest</option>
                        <option value="fastest">Fastest</option>
                        <option value="expensive">Expensive</option> 
                    </Input>
                </div>
                <div className={styles.formRow}>
                    <div className={[styles.formControl,styles.btnControl].join(' ')}>
                        <Button btnType="success" disabled={!this.state.formIsValid}>PLACE ORDER</Button>
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
