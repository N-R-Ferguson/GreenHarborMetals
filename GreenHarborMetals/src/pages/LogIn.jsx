import { useState } from 'react'
import '../assets/style/Homepage.css'
import login from '../assets/functions/UserFunctions.js'
import { Link, useNavigate } from 'react-router-dom';


function LogIn() {
    const navigate = useNavigate();

    const [inputs, setInputs] = useState({})

    const handleChange = (event) =>{
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
    }

    const handleSubmit = async event => {
        event.preventDefault;
        
        try{
            const params =  {inputs};
            const url = 'http://localhost:5000/login';
            const options = {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                params: JSON.stringify(params),
            };

            // const response = await fetch(url,options);
            // console.log(response);
        }catch (err){
            console.log("Hello");
            console.log(err.message);
        }
        navigate('/store');
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