import '../assets/style/Homepage.css';
import LogIn from './LogIn.jsx';
import MenuHomepage from './MenuHomepage.jsx';

function Homepage() {
    return (
        <>
            <MenuHomepage />
            <div>
                <div>
                    <LogIn />
                </div>
            </div>
        </>
    )
}

export default Homepage;