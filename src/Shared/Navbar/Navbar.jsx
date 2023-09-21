import './Navbar.css';
import taharLogo from '../../../public/photos/tahar-logo.png';
import userIMG from '../../../public/photos/Create_Account.png';
import favouriteIMG from '../../../public/photos/fav_icon.png';
import searchIMG from '../../../public/photos/search_icon.png';
import usa from '../../../public/photos/usa.png';
import { Link, NavLink } from 'react-router-dom';
import SideCart from '../../Pages/Home/SideCart/SideCart';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';


const Navbar = () => {
    const { user, logOut, categoryName, localCartData, setLocalCartData,favouriteData } = useContext(AuthContext);
    // const ParticularUserdata = AllcartData.filter(item => item.customerEmail === user?.email);
    // const [localCartData, setLocalCartData]= useState([]);
    // console.log(localCartData)

    useEffect(() => {
        const cartData = JSON.parse(localStorage.getItem('cartData')) || [];
        setLocalCartData(cartData);
    }, [setLocalCartData]);


    // console.log(localCartData)



    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(error => console.log(error));
    }

    const dropdownLink = <>
        <div >
            <button className=' mr-2  btn-md rounded-md bg-[#2c2a2a] w-[160px] h-[42px]'>Track Order</button>
            <select className=" mr-2 select  bg-[#2c2a2a] w-[138px] h-[42px] ">
                <option disabled selected>
                    <img src={usa} alt="" />
                    USD
                </option>
                <option>BDT</option>

            </select>
            <select className=" mr-2 select  bg-[#2c2a2a] w-[138px] h-[42px] ">
                <option disabled selected>Eng</option>
                <option>Ban</option>
            </select>
        </div>
    </>

    const navLink = <>
        {/* <NavLink to='/collections' >Collections</NavLink> */}
        <ul className="relative group px-3 py-2">
            <button className="hover:opacity-50 cursor-default uppercase custom-link">Collections</button>
            <div
                className="absolute top-0 -left-2 transition group-hover:translate-y-5 translate-y-0 opacity-0 invisible group-hover:opacity-100 group-hover:visible duration-500 ease-in-out group-hover:transform z-50 min-w-[260px] transform">
                <div className="relative top-6 p-6 bg-white rounded-xl shadow-xl w-full">
                    <div
                        className="w-10 h-10 bg-white transform rotate-45 absolute top-0 z-0 -translate-x-4 transition-transform group-hover:translate-x-3 duration-500 ease-in-out rounded-sm">
                    </div>
                    <div className="relative z-10">
                        <p className="uppercase tracking-wider text-gray-500 font-medium text-[13px]">Select</p>
                        <ul className="mt-3 text-[15px]">
                            <li>
                                {
                                    categoryName.map(cat =>
                                        <Link key={cat._id} to={`/product/category/${cat._id}`}
                                            className="bg-transparent bg-clip-text text-transparent bg-gradient-to-br from-indigo-400 to-pink-700 via-blue-500 font-semibold hover:from-blue-600 hover:to-indigo-600 hover:via-pink-400 py-1 block">
                                            {cat.title}
                                        </Link>

                                    )
                                }
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </ul>
        <NavLink to='/shop-men' className="custom-link">Shop Men</NavLink>
        <NavLink to='/shop-women' className="custom-link">Shop Women</NavLink>
        <NavLink to='/return' className="custom-link">Return/Exchange</NavLink>
        <NavLink to='/contact' className="custom-link">Contact</NavLink>
        <NavLink to='/customer-spotlight' className="custom-link">Customer Spotlight</NavLink>
        <NavLink to='/sale' className='custom-link text-[#FF7575]'>SALE</NavLink>
    </>
    return (
        <div>
            <div className="navbar nv-bg text-white  md:w-full md:h-[127px] md:px-[68px]">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            <div className=' flex flex-col'>
                                {dropdownLink}
                                <div className=' text-black'>
                                    {navLink}
                                </div>
                            </div>

                        </ul>
                    </div>
                    <div className='hidden lg:flex'>
                        {dropdownLink}
                    </div>
                </div>

                <div className="navbar-center ">
                    <Link to='/'><img className='w-[82px] h-[103px]' src={taharLogo} alt="" /></Link>
                </div>

                <div className="navbar-end flex flex-row gap-4">
                    <div className='hidden lg:flex'>
                        <img className='mr-[17px] w-full' src={searchIMG} alt="" />
                        {/* <img className='mr-[17px]' src={favouriteIMG} alt="" /> */}
                        <Link to='/favourite'>
                            <FontAwesomeIcon className=' text-3xl' icon={faHeart} />
                        </Link>
                    </div>
                    {
                        user ?
                            <>
                                <Link to='dashboard' className=" lg:btn lg:btn-sm bg-[#DBC896] border-[#DBC896] bg-transparent lg:w-[183.67px] lg:h-[44.67px]">
                                    <img src={userIMG} alt="" />
                                    <div className=' hidden lg:flex'>
                                        <h1>{user?.displayName}</h1>
                                    </div>
                                </Link>
                                <button onClick={handleLogOut} className="btn btn-outline border-[#DBC896] text-[#DBC896]">LOG OUT</button></>

                            :
                            <><Link to='/login' className=" lg:btn lg:btn-sm bg-[#DBC896] border-[#DBC896] bg-transparent lg:w-[183.67px] lg:h-[44.67px]">
                                <img src={userIMG} alt="" />
                                <div className=' hidden lg:flex'>
                                    <h1>Create Account</h1>
                                </div>
                            </Link></>
                    }

                    <div className="indicator">
                        <span className="indicator-item badge badge-secondary right-5">{localCartData.length}</span>
                        <SideCart localCartData={localCartData} setLocalCartData={setLocalCartData}></SideCart>
                    </div>


                </div>
            </div>
            <div className=' bg-black w-full h-[76px] hidden lg:flex'>
                <div className=' flex flex-row text-white gap-5 justify-center items-center align-middle w-full h-[76px] uppercase'>
                    {navLink}
                </div>
                <div className=' flex justify-end align-middle items-center mr-10'>
                    <select className="select w-[154px] h-[42px] bg-[#2c2a2a] text-white max-w-xs">
                        <option selected>Light Mode</option>
                        <option>Dark Mode</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default Navbar;