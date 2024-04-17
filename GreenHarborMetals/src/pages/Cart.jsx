import StoreMenu from "./StoreMenu";
import '../assets/style/Cart.css'
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { checkCookie, } from "../assets/functions/cookies.js";
import getCookie from '../assets/functions/cookies.js'
function Cart() {
    const navigate = useNavigate();


    const [orders, setOrders] = useState(null);
    const [costs, setCosts] = useState(null);

    const convertToFloat = (price) => {
        let newprice = price.split('$');
        newprice = newprice[1].split(',');
        let str = ""
        for (let i = 0; i < newprice.length; i++) {
            str += newprice[i];
        }
        newprice = parseFloat(str).toFixed(2);
        return newprice;
    }

    const tax = (price) => {
        let newprice = convertToFloat(price)
        return newprice * 0.06;

    }

    const total = (price) => {
        let newprice = convertToFloat(price)
        const tax = newprice * 0.06;
        return newprice + tax;

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

        const getOrderInfo = async () => {
            let name = getCookie("user");
            const body = {
                name: name
            }

            let url = "http://localhost:5000/get-cart";
            const options = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            }

            let response = await fetch(url, options);
            const cart = await response.json();

            setOrders(cart);

            url = "http://localhost:5000/get-order-cost";

            response = await fetch(url, options);
            const cost = await response.json();
            setCosts(cost);
        }

        if (document.readyState === 'complete') {
            onPageLoad();
            getOrderInfo();
        } else {
            window.addEventListener('load', onPageLoad, false);
            return () => window.removeEventListener('load', onPageLoad);
        }
    }, []);

    if (orders != null && costs != null) {
        return (
            <>
                <StoreMenu />
                <div>
                    <div className="OverallContainer">
                        <div className="CartContainer">
                            <div className="Cart">
                                <h3 className="CartName">Cart</h3>
                                <div className="OrdersContainer">
                                    {orders.map((order) => (
                                        <div className='Orders' key={order.metalsid}>
                                            <p></p><h3>{order.metaltype}</h3>
                                            <p>Amount: {order.quantity} g<br />
                                                Price: {order.unitprice}/g<br />
                                                Cost: {order.computedcost}</p>
                                            <button className="CartButton">Remove</button>
                                        </div>
                                    ))}
                                </div>
                                <div className="CartButtonContainer">
                                    <Link to='/store'><button className="CartButton">Continue Shopping</button></Link>
                                </div>
                            </div>
                        </div>
                        <div className='CheckoutContainer'>
                            <div>
                                {costs.map((cost) => (
                                    <div className="Checkout" key={cost.orderid} >

                                        <p> Price: ${convertToFloat(cost.totalcost)}<br />
                                            Tax: ${tax(cost.totalcost)}<br />
                                            Total Price: ${total(cost.totalcost)}<br />
                                            <Link to='/checkout'><button className="CheckoutButton">Continue to payment</button></Link>
                                        </p>
                                    </div>))}
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default Cart;