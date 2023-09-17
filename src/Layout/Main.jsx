
import { Outlet } from 'react-router-dom';
import Navbar from '../Shared/Navbar/Navbar';
import Footer from '../Shared/Footer/Footer';
import Partners from '../Pages/Home/Partners/Partners';
import Newsletter from '../Pages/Home/Newsletter/Newsletter';

const Main = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Partners></Partners>
            <Newsletter></Newsletter>
            <Footer></Footer>
        </div>
    );
};

export default Main;