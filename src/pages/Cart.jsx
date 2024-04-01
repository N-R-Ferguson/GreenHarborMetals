import Menu from "./Menu";
import '../assets/style/Cart.css'

function Cart(){
  
    return(
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
                        
                    </div>
                    <div className='CheckoutContainer'>
                            <div>
                                <h3>Checkout</h3>
                            </div>
                        </div>
                </div>
            </div>
        </>
    )
}

export default Cart;