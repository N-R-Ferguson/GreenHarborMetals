import { useState } from 'react'
import '../assets/style/Homepage.css'
import login from '../assets/functions/UserFunctions.js'
import { Link } from 'react-router-dom';

function LogIn() {
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

    
    return (
        <>
            <div className='LogInContainer'>
                <div className='LogIn'>
                    <div>
                        <div>
                            <h4 className='Title'>Login</h4>
                            <form onSubmit={handleSubmit}>
                                <div className='SignUpForm'>
                                    <label htmlFor='email'>Email </label>
                                    <input className='SignUpinput' id='email' type='text' name='uuid' onChange={handleChange} required></input>
                                </div>
                                <div className='SignUpForm'>
                                    <label htmlFor='password'>Password </label>
                                    <input className='SignUpInput' id='password' type='password' name='psw' onChange={handleChange} required></input>
                                </div>
                                <div className='SignUpForm'>
                                    <input type='submit' value='Login' className='SubmitButton'></input>
                                </div>
                            </form>
                            <div className='SignUpForm'>
                                <h1 className='LogInSignUp'>Don't have an account? 
                                    <Link to='/register'>Sign Up</Link>
                                </h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LogIn