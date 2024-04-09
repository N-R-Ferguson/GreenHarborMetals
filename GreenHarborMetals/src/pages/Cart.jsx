import StoreMenu from "./StoreMenu";
import '../assets/style/Cart.css'
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import {checkCookie} from "../assets/functions/cookies";

function Cart() {
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
    return (
        <>
            <StoreMenu />
            <div>
                <div>
                    <div className="CartContainer">
                        <div className='Cart'>
                            <h3>Cart</h3>
                            <div>
                                <div>

                                </div>
                            </div>
                        </div>
                        <br />
                        <div>
                            <button><Link to='/store'>Continue Shopping</Link></button>
                        </div>
                        
                    </div>
                    <div className='CheckoutContainer'>
                        <div>
                            <button><Link to='/checkout'>Continue to payment</Link></button>
                        </div>
                    </div>


                </div>
            </div>
        </>
    )
}

export default Cart;