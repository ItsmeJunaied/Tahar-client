import './Navbar.css';
import taharLogo from '../../../public/photos/tahar-logo.png';
import userIMG from '../../../public/photos/Create_Account.png';
import usa from '../../../public/photos/usa.png';
import { Link, NavLink, useLocation } from 'react-router-dom';
import SideCart from '../../Pages/Home/SideCart/SideCart';
import { useContext, useEffect, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faArrowRightFromBracket, faBagShopping, faChartLine } from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from '../../Provider/AuthProvider';
import Searchbar from '../Searchbar/Searchbar';


const Navbar = () => {
    const { user, logOut, loading, setLoading, categoryName, localCartData, setLocalCartData, loggedUser, selectedCurrencyValue, setSelectedCurrencyValue, doller } = useContext(AuthContext);
    const [open, setOpen] = useState(false);

    // console.log(user)

    const matchedUser = loggedUser.find(logeduser => logeduser?.email === user?.email);

    useEffect(() => {
        const cartData = JSON.parse(localStorage.getItem('cartData')) || [];
        setLocalCartData(cartData);
    }, [setLocalCartData]);

    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(error => console.log(error));
    }



    const handleSelectCurrencyChange = (e) => {
        const selectedValue = e.target.value;
        setSelectedCurrencyValue(selectedValue);
        localStorage.setItem('selectedCurrency', selectedValue);
    }

    useEffect(() => {
        localStorage.setItem('selectedCurrency', selectedCurrencyValue);
    }, [selectedCurrencyValue]);



    const location = useLocation();
    const noHeaderFooter = location.pathname.includes('shipping')
    const dropdownLink = !noHeaderFooter && (
        <div className=' flex flex-row'>
            <NavLink to='trackorder' className='text-center mr-2 btn-md rounded-md bg-[#2c2a2a] flex justify-center align-middle items-center w-[160px] h-[42px]'>
                Track Order
            </NavLink>

            {/* Select Currency */}
            <select
                value={selectedCurrencyValue}
                onChange={handleSelectCurrencyChange}
                className="mr-2 select bg-[#2c2a2a] w-[138px] h-[42px]"
            >
                <option value="BDT">BDT</option>
                <option value="USD">USD</option>
            </select>

            {/* Select Language */}
            <select className="mr-2 select bg-[#2c2a2a] w-[138px] h-[42px]">
                <option disabled selected>Eng</option>
                <option>Ban</option>
            </select>
        </div>
    );


    const handleColorModeCheck = (event) => {
        const selectedOption = event.target.value;
        const htmlElement = document.querySelector('html');
        if (selectedOption === "Light Mode") {
            htmlElement.setAttribute('data-theme', 'light');
        } else if (selectedOption === "Dark Mode") {
            htmlElement.setAttribute('data-theme', 'forest');
        }
    }

    const navLink = <>
        {/* <NavLink to='/collections' >Collections</NavLink> */}
        <ul className="relative group px-3 py-2">
            <button className="hover:opacity-50 cursor-default uppercase custom-link [font-family:'Helvetica_Now_Display-Medium',Helvetica]">Collections</button>
            <div
                className="absolute top-0 -left-2 transition group-hover:translate-y-5 translate-y-0 opacity-0 invisible group-hover:opacity-100 group-hover:visible duration-500 ease-in-out group-hover:transform z-50 min-w-[260px] transform">
                <div className="relative top-6 p-6 bg-white rounded-xl shadow-xl w-full">
                    <div
                        className="w-10 h-10 bg-white transform rotate-45 absolute top-0 z-0 -translate-x-4 transition-transform group-hover:translate-x-3 duration-500 ease-in-out rounded-sm">
                    </div>
                    <div className="relative z-10 ">
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
        <NavLink to='/shop-men' className="custom-link [font-family:'Helvetica_Now_Display-Medium',Helvetica]">Shop Men</NavLink>
        <NavLink to='/shop-women' className="custom-link [font-family:'Helvetica_Now_Display-Medium',Helvetica]">Shop Women</NavLink>
        <NavLink to='/return' className="custom-link [font-family:'Helvetica_Now_Display-Medium',Helvetica]">Return/Exchange</NavLink>
        <NavLink to='/contact' className="custom-link [font-family:'Helvetica_Now_Display-Medium',Helvetica]">Contact</NavLink>
        <NavLink to='/customer-spotlight' className="custom-link [font-family:'Helvetica_Now_Display-Medium',Helvetica]">Customer Spotlight</NavLink>
        <NavLink to='/sale' style={{ color: '#FF7575' }} className="custom-link [font-family:'Helvetica_Now_Display-Medium',Helvetica] ">SALE</NavLink>
    </>


    return (
        <div className=''>
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

                    {!noHeaderFooter && (<div className='hidden lg:flex'>
                        <Searchbar></Searchbar>
                        <div className=' w-10'>
                            <Link to='/favourite'>
                                <FontAwesomeIcon className=' text-3xl w-full h-fit mt-2' icon={faHeart} />
                            </Link>
                        </div>
                    </div>)}
                    {!noHeaderFooter && (
                        <div className=" relative z-20 flex justify-center items-center ">
                            <div className={` flex justify-center items-center ${open ? 'border-indigo-700 transform transition duration-300' : ''}`}>
                                <div onClick={() => setOpen(!open)} className="relative border-b-4 border-transparent py-3">
                                    {loading ? (
                                        // Render a loading indicator here
                                        <div className='lg:btn lg:btn-sm bg-[#DBC896] border-[#DBC896] bg-transparent lg:w-[183.67px] lg:h-[44.67px]'>
                                            <p>Loading...</p>
                                        </div>
                                    ) : (
                                        // Render the content when data is loaded
                                        user ? (
                                            <div className="lg:btn lg:btn-sm bg-[#DBC896] border-[#DBC896] bg-transparent lg:w-[183.67px] lg:h-[44.67px]">
                                                <img src={userIMG} alt="" />
                                                <div className='hidden lg:flex'>
                                                    <h1>{user?.displayName}</h1>
                                                </div>
                                            </div>
                                        ) : (
                                            <Link to='/signup' className="lg:btn lg:btn-sm bg-[#DBC896] border-[#DBC896] bg-transparent lg:w-[183.67px] lg:h-[44.67px]">
                                                <img src={userIMG} alt="" />
                                                <div className='hidden lg:flex'>
                                                    <h1>Create Account</h1>
                                                </div>
                                            </Link>
                                        )
                                    )}

                                    {
                                        user && matchedUser?.role === 'User' &&
                                        open && (
                                            <div className="absolute z-50 w-60 px-5 py-3 bg-white rounded-lg shadow border dark:border-transparent mt-5">
                                                <ul className="space-y-3 text-black">
                                                    <li className="font-medium">
                                                        <Link to='/userprofile' className="flex items-start transform transition-colors duration-200 border-r-4 border-transparent hover:border-indigo-700 ">
                                                            <div className="mr-3">
                                                                <FontAwesomeIcon className=' ml-2 text-xl' icon={faUser} />
                                                            </div>
                                                            <h1 className="[font-family:'Helvetica_Now_Display-Medium',Helvetica] text-[19px]">Profile</h1>
                                                        </Link>
                                                        <Link to='/myorder' className="flex items-start transform transition-colors duration-200 border-r-4 border-transparent hover:border-indigo-700 mt-3">
                                                            <div className="mr-3">
                                                                <FontAwesomeIcon className=' ml-2 text-xl' icon={faBagShopping} />
                                                            </div>
                                                            <h1 className="[font-family:'Helvetica_Now_Display-Medium',Helvetica] text-[19px]">My Order</h1>

                                                        </Link>
                                                        <Link to='/trackorder' className="flex items-start transform transition-colors duration-200 border-r-4 border-transparent hover:border-indigo-700 mt-3">

                                                            <h1 className="[font-family:'Helvetica_Now_Display-Medium',Helvetica] text-[19px]">
                                                                <FontAwesomeIcon className=' ml-2 text-xl text-white' icon={faUser} />
                                                                Trac Order
                                                            </h1>

                                                        </Link>
                                                        <div className=' divider'></div>
                                                        <button onClick={handleLogOut}
                                                            className="flex items-start transform transition-colors duration-200 border-r-4 border-transparent hover:border-indigo-700 [font-family:'Helvetica_Now_Display-Medium',Helvetica] text-[19px]" type="button">
                                                            <div className="mr-3">
                                                                <FontAwesomeIcon className='ml-2 text-xl text-red-600' icon={faArrowRightFromBracket} />
                                                            </div>
                                                            Log Out
                                                        </button>
                                                    </li>
                                                </ul>
                                            </div>
                                        )}

                                    {
                                        user && matchedUser?.role === 'Admin' &&
                                        open && (
                                            <div className="absolute z-50 w-60 px-5 py-3 bg-white rounded-lg shadow border dark:border-transparent mt-5">
                                                <ul className="space-y-3 text-black">
                                                    <li className="font-medium">
                                                        <Link to='/dashboard' className="flex items-start transform transition-colors duration-200 border-r-4 border-transparent hover:border-indigo-700 ">
                                                            <div className="mr-3">
                                                                <FontAwesomeIcon className=' ml-2 text-xl' icon={faChartLine} />

                                                            </div>
                                                            <h1 className="[font-family:'Helvetica_Now_Display-Medium',Helvetica] text-[19px]">Dashboard</h1>

                                                        </Link>
                                                        <div className=' divider'></div>
                                                        <button onClick={handleLogOut}
                                                            className="flex items-start transform transition-colors duration-200 border-r-4 border-transparent hover:border-indigo-700 [font-family:'Helvetica_Now_Display-Medium',Helvetica] text-[19px]" type="button">
                                                            <div className="mr-3">
                                                                <FontAwesomeIcon className='ml-2 text-xl text-red-600' icon={faArrowRightFromBracket} />
                                                            </div>
                                                            Log Out
                                                        </button>

                                                    </li>
                                                </ul>
                                            </div>
                                        )}
                                </div>

                            </div>
                        </div>
                    )}


                    {!noHeaderFooter && (<div className="indicator">
                        {localCartData ? (
                            <span className="indicator-item badge badge-secondary right-5">{localCartData.length}</span>
                        ) : (
                            <span className="indicator-item badge badge-secondary right-5">0</span>
                        )}
                        <SideCart selectedCurrencyValue={selectedCurrencyValue} doller={doller} localCartData={localCartData} setLocalCartData={setLocalCartData}></SideCart>
                    </div>)}

                </div>
            </div>

            <div className=' bg-black w-full h-[76px] hidden lg:flex'>
                <div className=' flex flex-row text-white gap-5 justify-center items-center align-middle w-full h-[76px] uppercase'>
                    {navLink}
                </div>
                <div className=' flex justify-end align-middle items-center mr-10'>
                    <select onClick={handleColorModeCheck} className="select w-[154px] h-[42px] bg-[#2c2a2a] text-white max-w-xs">
                        <option selected className="[font-family:'Helvetica_Now_Display-Medium',Helvetica] text-[19px]">Light Mode</option>
                        <option className="[font-family:'Helvetica_Now_Display-Medium',Helvetica] text-[19px]">Dark Mode</option>
                    </select>
                </div>
            </div>
        </div >
    );
};

export default Navbar;