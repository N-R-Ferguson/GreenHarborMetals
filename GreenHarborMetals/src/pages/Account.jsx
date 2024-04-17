import StoreMenu from './StoreMenu.jsx'
import '../assets/style/Account.css'
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
    const [inputs, setInputs] = useState();
    const [orders, setOrders] = useState(null);

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }));
    }

    const handleSubmit = async (event) => {
        event.preventDefault;

        try {
            const body = {
                metaltype: metal,
                name: userData[0].name,
                weight: inputs.weight,
                month: inputs.month,
                day: inputs.day,
                year: inputs.year,
            };
            const url = 'http://localhost:5000/add-metal'
            const options = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            };

            const response = await fetch(url, options);
        } catch (err) {
            console.log(err.message);
        }
    }

    const handleAccept = async (orderid) => {
        try {
            const body = {
                orderid: orderid
            };

            const url = "http://localhost:5000/accept-order";
            const options = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            };

            const response = await fetch(url, options);

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

        const getOrders = async () => {
            const url = "http://localhost:5000/get-orders";

            const response = await fetch(url);
            const orderInfo = await response.json();
            setOrders(orderInfo);
        };

        if (document.readyState === 'complete') {
            onPageLoad();
            userinfo();
            getOrders();
        } else {
            window.addEventListener('load', onPageLoad, false);
            return () => window.removeEventListener('load', onPageLoad);
        }
    }, []);


    if (userData != null) {
        if (userData[0].companytypeid == 3) {
            if (orders != null) {
                console.log(orders);
                return (
                    <>
                        <StoreMenu />
                        <div className='Container'>
                            <h1>Account Details</h1>
                            <div>
                                <div>
                                    {userData.map((data) => (
                                        <div key={data.userid}>
                                            <h3>First Name: {data.firstname}&ensp;&ensp;Last Name: {data.lastname}</h3>
                                            <h3>Position: {data.name}</h3>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <h1>Orders Ready For Processing</h1>
                            <div>
                                <div className='SalesOrdersContainer'>
                                    {orders.map((order) => (
                                        <div className='SalesOrders' key={order.orderid}>
                                            <p>First Name: {order.customerfirstname} LastName: {order.customerlastname}<br />
                                                Address: {order.shiptostreet}<br />
                                                City: {order.shiptocity}<br />
                                                State: {order.shiptostate}<br />
                                                Zipcode: {order.shiptozip}<br />
                                                Country: United State Of America</p>
                                            <button onClick={async () => handleAccept(order.orderid)}>Accept</button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </>
                )
            }
        } else if (userData[0].companytypeid == 2) {
            return (
                <>
                    <StoreMenu />
                    <div className='Container'>
                        <h2>Account Details</h2>
                        <div>
                            {userData.map((data) => (
                                <div key={data.userid}>
                                    <h3>First Name: {data.firstname}&ensp;&ensp;Last Name: {data.lastname}</h3>
                                    <h3>Company: {data.name}</h3>
                                    <h3>Street Address: {data.streetaddress}&ensp;&ensp;City: {data.city}</h3>
                                    <h3>State: {data.state}&ensp;&ensp;Zipcode: {data.zipcode}</h3>
                                    <h3>United State of America</h3>
                                </div>
                            ))}
                        </div>
                        <div>
                            <form>
                                <h2>Add Metal</h2>
                                <select if="metals" value={metal} onChange={(e) => setMetals(e.target.value)}>
                                    <option value="" >Select Metal</option>
                                    <option value="Gold" >Gold</option>
                                    <option value="Lithium" >Lithium</option>
                                    <option value="Neodymium" >Neodymium</option>
                                    <option value="Titanium" >Titanium</option>
                                </select>
                                <br />
                                <label htmlFor='weight'>Amount (g) </label>
                                <input id='weight' type='number' name='weight' min='1' step='any' onChange={handleChange}></input>
                                <br />
                                <label htmlFor='file'>Ethical Documenation</label>
                                <input type='file' onChange={handleChange}></input>
                                <br />
                                <label htmlFor='month'>Month</label>
                                <input className='Date' id='month' type='number' name='month' min='1' max='12' onChange={handleChange}></input>
                                <label htmlFor='day'>Day</label>
                                <input className='Date' id='day' type='number' name='day' min='1' max='31' onChange={handleChange}></input>
                                <label htmlFor='year'>Year</label>
                                <input className='Year' id='year' type='number' name='year' min='2023' onChange={handleChange}></input>
                                <br />
                                <input className='SubmitButton' type='button' value='Submit' onClick={handleSubmit}></input>
                            </form>
                        </div>
                    </div>
                </>
            )
        } else {
            return (
                <>
                    <StoreMenu />
                    <div className='Container'>
                        <h1>Account Details</h1>
                        {userData.map((data) => (
                            <div key={data.userid}>
                                <h3>First Name: {data.firstname}&ensp;&ensp;Last Name: {data.lastname}</h3>
                            </div>
                        ))}
                    </div>
                </>
            )
        }
    } else {
        return (
            <>
                <StoreMenu />
                <div className='Container'>
                    <h1>Account Details</h1>
                </div>
            </>
        )
    }
}

export default Account;