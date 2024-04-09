import StoreMenu from './StoreMenu.jsx';
// import test from '../assets/databaseFunctions/read-data.js'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkCookie } from '../assets/functions/cookies.js';

function Store(){
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

    // test();
    return (
        <>
            <StoreMenu />
            <div>
                <div>
                    <h1>Item will be shown here</h1>
                </div>
            </div>
        </>
    )
}

export default Store;