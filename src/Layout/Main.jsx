
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../Shared/Navbar/Navbar';
import Footer from '../Shared/Footer/Footer';
import Partners from '../Pages/Home/Partners/Partners';
import Newsletter from '../Pages/Home/Newsletter/Newsletter';
import { useContext } from 'react';
import { AuthContext } from '../Provider/AuthProvider';

const Main = () => {
    const {there} = useContext(AuthContext)
    const location= useLocation();
    const noHeaderFooter= location.pathname.includes('shipping')
    return (
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Partners there={there}></Partners>
            <Newsletter></Newsletter>
            <Footer></Footer>
        </div>
    );
};

export default Main;