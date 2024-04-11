import StoreMenu from './StoreMenu.jsx'
import Select from './Select.jsx'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import getCookie, { checkCookie } from '../assets/functions/cookies.js';

function Account() {
    const navigate = useNavigate()
    const user = {
        user: getCookie("user"),
    };

    const [userData, setUserData] = useState(null);
    const [metal, setMetals] = useState("");
    const [inputs,setInputs] = useState(0)

    const handleChange = (event) => {
        const value = event.target.value;
        setInputs(values => ({...values, value}));
    }

    const handleSubmit = (event) => {
        event.preventDefault;

        try {
            
            const body = {
                metaltype: metal,
                name: userData[0].name,
                
            };
            const url = 'http://localhost:5000/add-metal'
            console.log()
        } catch (err) {
            console.log(err.message);
        }
    }


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

        const userinfo = async () => {
            const body = user;

            const url = "http://localhost:5000/accountinfo";
            const options = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            };

            const response = await fetch(url, options);
            const newUserInfo = await response.json();

            setUserData([newUserInfo]);

        };

        if (document.readyState === 'complete') {

            onPageLoad();
            userinfo();
        } else {
            window.addEventListener('load', onPageLoad, false);
            return () => window.removeEventListener('load', onPageLoad);
        }
    }, []);

    if (userData != null) {

        if (userData[0].companytypeid == 3) {
            return (
                <>
                    <StoreMenu />
                    <div>
                        <h1>Account Details</h1>
                        <div>
                            <div>

                            </div>
                        </div>
                    </div>
                </>
            )
        } else if (userData[0].companytypeid == 2) {
            return (
                <>
                    <StoreMenu />
                    <div>
                        <h2>Account Details</h2>
                        <div>
                            {userData.map((data) => (
                                <div key={data.userid}>
                                    <h3>First Name: {data.firstname}   Last Name: {data.lastname}</h3>
                                    <h3>Company: {data.name}</h3>
                                    <h3>Street Address {data.streetaddress}   City: {data.city}</h3>
                                    <h3>State: {data.state}   Zipcode: {data.zipcode}</h3>
                                    <h3>United State of America</h3>
                                </div>
                            ))}
                        </div>
                        <h2>Add Metal</h2>
                        <div>
                            <form><select if="metals" value={metal} onChange={(e) => setMetals(e.target.value)}>
                                    <option value="" >Select Metal</option>
                                    <option value="Gold" >Gold</option>
                                    <option value="Lithium" >Lithium</option>
                                    <option value="Neodymium" >Neodymium</option>
                                    <option value="Titanium" >Titanium</option>
                                </select>
                                <br />
                                <label htmlFor='weight'>Weight(lbs) </label>
                                <input id='weight' type='number' min='0' step='any' onChange={handleChange}></input>
                                <br />
                                <label htmlFor='file'>Ethical Documenation</label>
                                <input type='file' onChange={handleChange}></input>
                                <br />
                                <input type='button' value='Submit' onClick={handleSubmit}></input> 
                            </form>
                        </div>
                    </div>
                </>
            )
        } else {
            return (
                <>
                    <StoreMenu />
                    <div>
                        <h1>Account Details</h1>

                    </div>
                </>
            )
        }
    }
}

export default Account;