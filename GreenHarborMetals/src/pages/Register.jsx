import MenuHomepage from "./MenuHomepage";
// import { register } from '../assets/functions/UserFunctions.js'
import '../assets/style/Homepage.css'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';


function Register(){
    const navigate = useNavigate();

    const [inputs, setInputs] = useState({})

    const handleChange = (event) =>{
        const name = event.target.name;
        const value = event.target.value;
        
        setInputs(values => ({...values, [name]: value}))
    }

    const handleSubmit = async event => {
        event.preventDefault;

        const body = inputs;

        const url = 'http://localhost:5000/register';
        const options = {
            method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
        };

        const response = await fetch(url, options);

        navigate('/');
    }

    return(
        <>
            <MenuHomepage />
            <div className='RegisterContainer'>
                <div className='Register'>
                    <div>
                        <div>
                            <h4 className='Title'>Register</h4>
                            <form>
                            <div className='SignUpForm'>
                                    <label htmlFor='firstname'>First Name </label>
                                    <input className='SignUpInput' id='firstname' type='text' name='firstname' onChange={handleChange} required></input>
                                </div>
                                <div className='SignUpForm'>
                                    <label htmlFor='lastname'>Last Name </label>
                                    <input className='SignUpInput' id='lastname' type='text' name='lastname' onChange={handleChange} required></input>
                                </div>
                                <div className='SignUpForm'>
                                    <label htmlFor='email'>Email </label>
                                    <input className='SignUpInput' id='email' type='text' name='uuid' onChange={handleChange} required></input>
                                </div>
                                <div className='SignUpForm'>
                                    <label htmlFor='password'>Password </label>
                                    <input className='SignUpInput' id='password' type='password' name='psw' onChange={handleChange} required></input>
                                </div>
                                <div className='SignUpForm'>
                                    <label>Supplier?</label>
                                    <input type='radio' id='yes' name='supplier'value='yes'  onChange={handleChange}></input>
                                    <label htmlFor='yes'>Yes</label>
                                    <input type='radio' id='no' name='supplier' value='no'  onChange={handleChange}></input>
                                    <label htmlFor='no'>No</label>
                                    <br />
                                    <h5 className='SubSection'>Supplier Section</h5>
                                    <label htmlFor='companyName'>Supplier name </label>
                                    <input className='SignUpInput' type='text' name='supplierName' onChange={handleChange} ></input>
                                </div>
                                <div className='SignUpForm'>
                                    <label htmlFor='street'>Street Address </label>
                                    <input className='SignUpInput' id='street' type='text' name='street' onChange={handleChange} required></input>
                                </div>
                                <div className='SignUpForm'>
                                    <label htmlFor='city'>City </label>
                                    <input className='SignUpInput' id='city' type='text' name='city' onChange={handleChange} required></input>
                                </div>
                                <div className='SignUpForm'>
                                    <label htmlFor='state'>State Abb.</label>
                                    <input className='SignUpInput' id='state' type='text' name='state' onChange={handleChange} required></input>
                                </div>
                                <div className='SignUpForm'>
                                    <label htmlFor='zipcode'>Zipcode </label>
                                    <input className='SignUpInput' id='zipcode' type='text' name='zip' onChange={handleChange} required></input>
                                </div>
                                <div className='SignUpForm'>
                                    <input type='button' value='Register' className='SubmitButton' onClick={handleSubmit}></input>
                                </div>
                            </form>
                            <div className='SignUpForm'>
                                <h1 className='LogInSignUp'>Already have an account?&ensp;
                                    <Link to='/'>Login</Link>
                                </h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Register;