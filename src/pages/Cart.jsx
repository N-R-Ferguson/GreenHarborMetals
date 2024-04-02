import Menu from "./Menu";
import '../assets/style/Cart.css'
import { Link } from 'react-router-dom';

function Cart() {

    return (
        <>
            <Menu />
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