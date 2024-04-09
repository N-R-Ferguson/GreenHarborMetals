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

    const handleSubmit = (event) => {
        event.preventDefault;
        // register(inputs);

        navigate('/store');
    }

    return(
        <>
            <MenuHomepage />
            <div className='LogInContainer'>
                <div className='LogIn'>
                    <div>
                        <div>
                            <h4 className='Title'>Register</h4>
                            <form onSubmit={handleSubmit}>
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
                                    <label htmlFor='companyName'>Supplier name </label>
                                    <input className='SignUpInput' type='text' name='suppplierName' onChange={handleChange} ></input>
                                </div>
                                <div className='SignUpForm'>
                                    <input type='submit' value='Register' className='SubmitButton'></input>
                                </div>
                            </form>
                            <div className='SignUpForm'>
                                <h1 className='LogInSignUp'>Already have an account? 
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