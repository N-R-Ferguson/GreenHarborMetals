import StoreMenu from "./StoreMenu";
import { useState, useEffect } from 'react'
import '../assets/style/Checkout.css'
import { useNavigate } from 'react-router-dom';
import { checkCookie } from "../assets/functions/cookies";
function Checkout(){

    const navigate = useNavigate()

    useEffect(() => {
        const onPageLoad = () => {
            try{
                let cookie = checkCookie();
                if (cookie == false){
                     navigate('/');
                }
            }catch(err) {  
                console.log(err.message);
            }
        };

        if (document.readyState === 'complete'){
            onPageLoad();
        } else {
            window.addEventListener('load', onPageLoad, false);
            return () => window.removeEventListener('load', onPageLoad);
        }
    });

    const [inputs, setInputs] = useState({})

    const handleChange = (event) =>{
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
    }

    const handleSubmit = (event) => {
        event.preventDefault;
        login(inputs)
    }

    return(
        <>
            <StoreMenu />
            <div>
                <div>
                    <div className='paymentContainer'>
                        <form class='paymentForm' onSubmit={handleSubmit}>
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
                                    <input type='text' name='cardnumber'onChange={handleChange} required></input>
                                    <br />
                                    <label htmlFor='expirationdate'>ExpirationDate </label>
                                    <select id='month' defaultValue='--' required>
                                        <option value='--'>--</option>
                                        <option value='1'>1</option>
                                        <option value='2'>1</option>
                                        <option value='3'>1</option>
                                        <option value='4'>1</option>
                                        <option value='5'>1</option>
                                        <option value='6'>1</option>
                                        <option value='7'>1</option>
                                        <option value='8'>1</option>
                                        <option value='9'>1</option>
                                        <option value='10'>1</option>
                                        <option value='11'>1</option>
                                        <option value='12'>1</option>
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
                                <label htmlFor='billingaddressBA2'>Billing address 2 </label>
                                <input type='text' id='billingaddressBA2' name='billingaddressBA2' onChange={handleChange} ></input>
                                <br />
                                <label htmlFor='cityBA'>City </label>
                                <input type='text' id='cityBA' name='cityBA' onChange={handleChange} required></input>
                                <br />
                                <label htmlFor='stateBA'>State </label>
                                <input type='text' id='stateBA' name='stateBA' onChange={handleChange} required></input>
                                <br />
                                <label htmlFor='zipBA'>Zip or postal code </label>
                                <input type='text' id='sipBA' name='aipBA' onChange={handleChange} required></input>
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
                                <label htmlFor='billingaddressSA'>Billing address </label>  
                                <input type='text' id='billingaddressSA' name='billingaddressSA' onChange={handleChange} required></input>
                                <br />
                                <label htmlFor='billingaddressSA2'>Billing address 2 </label>
                                <input type='text' id='billingaddressSA2' name='billingaddressSA2' onChange={handleChange} ></input>
                                <br />
                                <label htmlFor='citySA'>City </label>
                                <input type='text' id='citySA' name='citySA' onChange={handleChange} required></input>
                                <br />
                                <label htmlFor='stateSA'>State </label>
                                <input type='text' id='stateSA' name='stateSA' onChange={handleChange} required></input>
                                <br />
                                <label htmlFor='zipSA'>Zip or postal code </label>
                                <input type='text' id='sipSA' name='aipSA' onChange={handleChange} required></input>
                                <br />
                                <label htmlFor='CountrySA'>Country </label>
                                <input type='text' value='United States' id='countrySA' name='countrySA' required></input>
                                <br />
                                <label htmlFor='phonenumberSA'>Phone number </label>
                                <input type='text' id='phonenumberSA' name='phonenumberSA' onChange={handleChange} required></input>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Checkout;