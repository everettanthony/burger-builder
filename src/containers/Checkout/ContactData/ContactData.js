import React, { Component } from 'react';
import styles from './ContactData.module.scss';
import Button from '../../../components/UI/Button/Button';

export class ContactData extends Component {
    state = {
        fname: '',
        lname: '',
        email: '',
        phone: '',
        address: {
            street: '',
            street2: '',
            city: '',
            state: '',
            zip: ''
        }
    };

    render() {
        return (
            <div className={styles.contactData}>
                <h2>Contact Information</h2>
                <form className={styles.contactForm}>
                    <div className={styles.formRow}>
                        <div className={styles.formControl}>
                            <label>First Name</label>
                            <input type="text" name="fname" />
                        </div>
                        <div className={styles.formControl}>
                            <label>Last Name</label>
                            <input type="text" name="lname" />
                        </div>
                    </div>
                    <div className={styles.formRow}>
                        <div className={styles.formControl}>
                            <label>Email</label>
                            <input type="text" name="email" />
                        </div>
                        <div className={styles.formControl}>
                            <label>Phone</label>
                            <input type="text" name="phone" />
                        </div>
                    </div>
                    <div className={styles.formRow}>
                        <div className={styles.formControl}>
                            <label>Street</label>
                            <input type="text" name="street" />
                        </div>
                        <div className={styles.formControl}>
                            <label>Street 2</label>
                            <input type="text" name="street2" />
                        </div>
                    </div>
                    <div className={styles.formRow}>
                        <div className={styles.formControl}>
                            <label>City</label>
                            <input type="text" name="city" />
                        </div>
                        <div className={styles.formControl}>
                            <label>State</label>
                            <input type="text" name="state" />
                        </div>
                        <div className={styles.formControl}>
                            <label>Zip Code</label>
                            <input type="text" name="zip" />
                        </div>
                    </div>
                    <div className={styles.formRow}>
                        <div className={[styles.formControl,styles.btnControl].join(' ')}>
                            <Button btnType="success">ORDER</Button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default ContactData;
