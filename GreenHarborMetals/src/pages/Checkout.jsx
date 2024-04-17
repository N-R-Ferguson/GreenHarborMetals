import StoreMenu from "./StoreMenu";
import { useState, useEffect } from 'react'
import '../assets/style/Checkout.css'
import { Link, useNavigate } from 'react-router-dom';
import { checkCookie } from "../assets/functions/cookies";
import getCookie from "../assets/functions/cookies";

function Checkout() {

    const navigate = useNavigate()

    useEffect(() => {
        const onPageLoad = () => {
            try {
                let cookie = checkCookie();
                if (cookie == false) {
                    navigate('/');
                }
            } catch (err) {
                console.log(err.message);
            }
        };

        if (document.readyState === 'complete') {
            onPageLoad();
        } else {
            window.addEventListener('load', onPageLoad, false);
            return () => window.removeEventListener('load', onPageLoad);
        }
    });

    const [inputs, setInputs] = useState()

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }

    const handleSubmit = async (event) => {
        event.preventDefault;
        if (inputs != null) {
            const body = {
                name: getCookie("user"),
                address: inputs.shippingaddress,
                city: inputs.citySA,
                state: inputs.stateSA,
                zip: inputs.zipSA
            }

            const url = "http://localhost:5000/sales-order";
            const options = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            };

            const response = await fetch(url, options);
            navigate('/');
        }

    }

    return (
        <>
            <StoreMenu />
            <div>
                <div>
                    <div className='paymentContainer'>
                        <form className='paymentForm'>
                            <h2 >Payment Method</h2>
                            <div>
                                <select id='payment' required>
                                    <option value='mastercard'>MasterCard</option>
                                    <option value='discover'>Discover</option>
                                    <option value='americanexpress'>American Express</option>
                                    <option value='visa'>Visa</option>
                                </select>
                                <div>
                                    <label htmlFor='cardnumber'>Card Number </label>
                                    <input type='text' name='cardnumber' onChange={handleChange} required></input>
                                    <br />
                                    <label htmlFor='expirationdate'>ExpirationDate </label>
                                    <select id='month' defaultValue='--' required>
                                        <option value='--'>--</option>
                                        <option value='1'>1</option>
                                        <option value='2'>2</option>
                                        <option value='3'>3</option>
                                        <option value='4'>4</option>
                                        <option value='5'>5</option>
                                        <option value='6'>6</option>
                                        <option value='7'>7</option>
                                        <option value='8'>8</option>
                                        <option value='9'>9</option>
                                        <option value='10'>10</option>
                                        <option value='11'>11</option>
                                        <option value='12'>12</option>
                                    </select>
                                    <select id='year' defaultValue='----' required>
                                        <option value='----'>----</option>
                                        <option value='2024'>2024</option>
                                        <option value='2025'>2025</option>
                                        <option value='2026'>2026</option>
                                        <option value='2027'>2027</option>
                                        <option value='2028'>2028</option>
                                        <option value='2029'>2029</option>
                                        <option value='2030'>2030</option>
                                        <option value='2031'>2031</option>
                                        <option value='2032'>2032</option>
                                        <option value='2033'>2033</option>
                                        <option value='2034'>2034</option>
                                        <option value='2035'>2035</option>
                                    </select>
                                    <label htmlFor='securitycode'>Security Code </label>
                                    <input className='securityCode' type='text' id='securitycode' name='security code' maxLength={3} onChange={handleChange} required></input>

                                </div>
                            </div>

                            <div>
                                <h3>Billing Address</h3>
                                <label htmlFor='firstnameBA'>First name </label>
                                <input type='text' id='firstNameBa' name='firstnameBA' onChange={handleChange} required></input>
                                <br />
                                <label htmlFor='lastnameBA'>Last name </label>
                                <input type='text' id='lastNameBa' name='lastnameBA' onChange={handleChange} required></input>
                                <br />
                                <label htmlFor='billingaddressBA'>Billing address </label>
                                <input type='text' id='billingaddressBA' name='billingaddressBA' onChange={handleChange} required></input>
                                <br />
                                <label htmlFor='cityBA'>City </label>
                                <input type='text' id='cityBA' name='cityBA' onChange={handleChange} required></input>
                                <br />
                                <label htmlFor='stateBA'>State </label>
                                <input type='text' id='stateBA' name='stateBA' onChange={handleChange} required></input>
                                <br />
                                <label htmlFor='zipBA'>Zip or postal code </label>
                                <input type='text' id='zipBA' name='zipBA' onChange={handleChange} required></input>
                                <br />
                                <label htmlFor='CountryBA'>Country </label>
                                <input type='text' value='United States' id='countryBA' name='countryBA' required></input>
                                <br />
                                <label htmlFor='phonenumberBA'>Phone number </label>
                                <input type='text' id='phonenumberBA' name='phonenumberBA' onChange={handleChange} required></input>
                            </div>
                            <div>
                                <h3>Shipping Address</h3>
                                <label htmlFor='firstnameSA'>First name </label>
                                <input type='text' id='firstNameSa' name='firstnameSA' onChange={handleChange} required></input>
                                <br />
                                <label htmlFor='lastnameSA'>Last name </label>
                                <input type='text' id='lastNameSa' name='lastnameSA' onChange={handleChange} required></input>
                                <br />
                                <label htmlFor='shippingaddressSA'>Shipping address </label>
                                <input type='text' id='shippingaddress' name='shippingaddress' onChange={handleChange} required></input>
                                <br />
                                <label htmlFor='citySA'>City </label>
                                <input type='text' id='citySA' name='citySA' onChange={handleChange} required></input>
                                <br />
                                <label htmlFor='stateSA'>State </label>
                                <input type='text' id='stateSA' name='stateSA' onChange={handleChange} required></input>
                                <br />
                                <label htmlFor='zipSA'>Zip or postal code </label>
                                <input type='text' id='zipSA' name='zipSA' onChange={handleChange} required></input>
                                <br />
                                <label htmlFor='CountrySA'>Country </label>
                                <input type='text' value='United States' id='countrySA' name='countrySA' required></input>
                                <br />
                                <label htmlFor='phonenumberSA'>Phone number </label>
                                <input type='text' id='phonenumberSA' name='phonenumberSA' onChange={handleChange} required></input>
                            </div>
                            <div className='CheckoutButtonContainer'>
                                <Link to='/cart'><button className='PaymentButton'>Back</button></Link>
                                <label htmlFor='paymentButton'></label>
                                <input className='PaymentButton' type='button' id='paymentButton' name='paymentButton' value='Submit' onClick={handleSubmit}></input>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Checkout;