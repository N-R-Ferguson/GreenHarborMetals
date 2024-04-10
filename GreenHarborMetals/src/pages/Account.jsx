import StoreMenu from './StoreMenu.jsx'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import getCookie, { checkCookie } from '../assets/functions/cookies.js';

function Account() {
    const navigate = useNavigate()

    const user = {
        user: getCookie("user"),
    };

    const [userData, setUserData] = useState(null);

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
            console.log('userinfo');
            const body = user;

            const url = "http://localhost:5000/accountinfo";
            const options = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            };

            const response = await fetch(url, options);
            const newUserInfo = await response.json();

            setUserData(newUserInfo);

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
        console.log(userData.companytypeid);
        if (userData.companytypeid == 3) {
            return (
                <>
                    <StoreMenu />
                    <div>
                        <h1>Account Staff</h1>
                    </div>
                </>
            )
        } else if (userData.companytypeid == 2) {
            return (
                <>
                    <StoreMenu />
                    <div>
                        <h1>Account Company</h1>
                    </div>
                </>
            )
        } else {
            return (
                <>
                    <StoreMenu />
                    <div>
                        <h1>Account Customer</h1>
                    </div>
                </>
            )
        }
    }
}

export default Account;