import '../assets/style/Homepage.css';
import LogIn from './LogIn.jsx';
import Menu from './Menu.jsx';
import Store from './Store.jsx';
import User from './logedin.js';

const isLoggedIn = false;

function Homepage() {

   if (isLoggedIn){
    return (
        <>
            <Menu />
            <div>
                <div>
                    <Store />
                </div>
            </div>
       
        </>
    )
   }else{
    return (
        <>
            <Menu />
            <div>
                <div>
                    <LogIn />
                </div>
            </div>
        </>
    )
   }
}

export default Homepage;