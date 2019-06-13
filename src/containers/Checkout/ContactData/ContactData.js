import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from '../../../axios-orders';
import styles from './ContactData.module.scss';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

export class ContactData extends Component {
    state = {
        orderForm: {
            fname: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    label: 'First Name',
                    placeholder: ''
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                group: 1
            },
            lname: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    label: 'Last Name',
                    placeholder: ''
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                group: 1
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    label: 'Email',
                    placeholder: ''
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                group: 2
            },
            phone: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    label: 'Phone',
                    placeholder: ''
                },
                value: '',
                validation: {
                    required: false
                },
                valid: true,
                touched: false,
                group: 2
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    label: 'Street',
                    placeholder: ''
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                group: 3
            },
            street2: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    label: 'Street 2',
                    placeholder: ''
                },
                value: '',
                validation: {
                    required: false
                },
                valid: true,
                touched: false,
                group: 3
            },   
            city: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    label: 'City',
                    placeholder: ''
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                group: 4
            },           
            state: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    label: 'State',
                    placeholder: ''
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                group: 4
            },
            zip: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    label: 'Zip Code',
                    placeholder: ''
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                group: 4
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    label: 'Delivery Method',
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                group: 5
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
            ingredients: this.props.ings,
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

    inputChangedHandler = (evt, inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        };
        const updatedFormElement = { 
            ...updatedOrderForm[inputIdentifier]
        };

        updatedFormElement.value = evt.target.value;
        updatedFormElement.valid = this.isInputValid(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;

        let formIsValid = true;
        for (let inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});
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
                group: this.state.orderForm[key].group,
                id: key,
                config: this.state.orderForm[key]
            }); 
        }

        const formGroups = formEls.reduce(function (acc, obj) {
            var key = obj['group'];
            if (!acc[key]) {
              acc[key] = [];
            }
            acc[key].push(obj);
            return acc;
        }, {});

        console.log( formGroups );

        let form = (
            <form className={styles.contactForm} onSubmit={this.orderHandler}>
                <div className={styles.formRow}>
                    <Input elementtype={formEls[0].config.elementType} 
                            elementConfig={formEls[0].config.elementConfig} 
                            value={formEls[0].config.value} 
                            invalid={!formEls[0].config.valid} 
                            touched={formEls[0].config.touched} 
                            changed={(event) => this.inputChangedHandler(event, formEls[0].id)} required />
                    <Input elementtype={formEls[1].config.elementType} 
                            elementConfig={formEls[1].config.elementConfig} 
                            value={formEls[1].config.value} 
                            invalid={!formEls[1].config.valid} 
                            touched={formEls[1].config.touched} 
                            changed={(event) => this.inputChangedHandler(event, formEls[1].id)} required />
                </div>
                <div className={styles.formRow}>
                    <Input elementtype={formEls[2].config.elementType} 
                            elementConfig={formEls[2].config.elementConfig} 
                            value={formEls[2].config.value} 
                            invalid={!formEls[2].config.valid} 
                            touched={formEls[2].config.touched} 
                            changed={(event) => this.inputChangedHandler(event, formEls[2].id)} required />
                    <Input elementtype={formEls[3].config.elementType} 
                            elementConfig={formEls[3].config.elementConfig} 
                            value={formEls[3].config.value} 
                            invalid={!formEls[3].config.valid} 
                            touched={formEls[3].config.touched} 
                            changed={(event) => this.inputChangedHandler(event, formEls[3].id)} />
                </div>
                <div className={styles.formRow}>
                    <Input elementtype={formEls[4].config.elementType} 
                            elementConfig={formEls[4].config.elementConfig} 
                            value={formEls[4].config.value} 
                            invalid={!formEls[4].config.valid} 
                            touched={formEls[4].config.touched} 
                            changed={(event) => this.inputChangedHandler(event, formEls[4].id)} required />
                    <Input elementtype={formEls[5].config.elementType} 
                            elementConfig={formEls[5].config.elementConfig} 
                            value={formEls[5].config.value} 
                            invalid={!formEls[5].config.valid} 
                            touched={formEls[5].config.touched} 
                            changed={(event) => this.inputChangedHandler(event, formEls[5].id)} />
                </div>
                <div className={styles.formRow}>
                    <Input elementtype={formEls[6].config.elementType} 
                            elementConfig={formEls[6].config.elementConfig} 
                            value={formEls[6].config.value} 
                            invalid={!formEls[6].config.valid} 
                            touched={formEls[6].config.touched} 
                            changed={(event) => this.inputChangedHandler(event, formEls[6].id)} required />
                    <Input elementtype={formEls[7].config.elementType} 
                            elementConfig={formEls[7].config.elementConfig} 
                            value={formEls[7].config.value} 
                            invalid={!formEls[7].config.valid} 
                            touched={formEls[7].config.touched} 
                            changed={(event) => this.inputChangedHandler(event, formEls[7].id)} required />
                    <Input elementtype={formEls[8].config.elementType} 
                            elementConfig={formEls[8].config.elementConfig} 
                            value={formEls[8].config.value} 
                            invalid={!formEls[8].config.valid} 
                            touched={formEls[8].config.touched} 
                            changed={(event) => this.inputChangedHandler(event, formEls[8].id)} required />
                </div>
                <div className={styles.formRow}>
                    <Input elementtype={formEls[9].config.elementType} 
                            elementConfig={formEls[9].config.elementConfig} 
                            value={formEls[9].config.value} 
                            invalid={!formEls[9].config.valid} 
                            touched={formEls[9].config.touched} 
                            changed={(event) => this.inputChangedHandler(event, formEls[9].id)} />
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

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    }
};

export default connect(mapStateToProps)(ContactData);
