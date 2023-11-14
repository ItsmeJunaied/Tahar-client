import './Navbar.css';
import taharLogo from '../../../public/photos/tahar-logo.png';
import userIMG from '../../../public/photos/Create_Account.png';
import usa from '../../../public/photos/usa.png';
import ban from '../../../public/photos/bangladesh.png';
import { Link, NavLink, useLocation } from 'react-router-dom';
import SideCart from '../../Pages/Home/SideCart/SideCart';
import { useContext, useEffect, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faArrowRightFromBracket, faBagShopping, faBarsStaggered, faChartLine, faCircleXmark, faFlagUsa, faTruckFast } from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from '../../Provider/AuthProvider';
import Searchbar from '../Searchbar/Searchbar';


const Navbar = () => {
    const { user, logOut, loading, setLoading, categoryName, localCartData, setLocalCartData, loggedUser, selectedCurrencyValue, setSelectedCurrencyValue, doller, there, setTheme } = useContext(AuthContext);
    const [open, setOpen] = useState(false);

    // console.log(user)

    const matchedUser = loggedUser.find(logeduser => logeduser?.email === user?.email);

    console.log(matchedUser)

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
                <FontAwesomeIcon className=' w-6 h-5' icon={faTruckFast} style={{ color: "#ffffff", }} />
                <p className='ml-1'>Track Order</p>
            </NavLink>

            {/* Select Currency */}
            <div className=' bg-[#2c2a2a] w-[138px] rounded-md mr-2  flex justify-center px-2 items-center'>
                {
                    selectedCurrencyValue === 'USD' ? <img className='w-6 h-6' src={usa} alt="" /> : <img className='w-6 h-6' src={ban} alt="" />
                }


                <select
                    value={selectedCurrencyValue}
                    onChange={handleSelectCurrencyChange}
                    className="mr-2 select bg-[#2c2a2a] w-full  h-[42px]"
                >
                    <option value="BDT">BDT</option>
                    <option value="USD">USD</option>
                </select>
            </div>

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
            setTheme('light'); // Update the state to 'light'
            htmlElement.setAttribute('data-theme', 'light');
        } else if (selectedOption === "Dark Mode") {
            setTheme('forest'); // Update the state to 'forest'
            htmlElement.setAttribute('data-theme', 'forest');
        }
    };

    const navLink = <>
        {/* <NavLink to='/collections' >Collections</NavLink> */}
        <ul className="relative group px-3 py-2">
            <button className="hover:opacity-50 cursor-default uppercase custom-link [font-family:'Helvetica_Now_Display-Medium',Helvetica]">Collections</button>
            <div
                className="absolute top-0 -left-2 transition group-hover:translate-y-5 translate-y-0 opacity-0 invisible group-hover:opacity-100 group-hover:visible duration-500 ease-in-out group-hover:transform z-50 min-w-[600px] transform">
                <div className="relative top-6 p-6 bg-white rounded-xl shadow-xl w-full">
                    <div
                        className="w-10 h-10 bg-white transform rotate-45 absolute top-0 z-0 -translate-x-4 transition-transform group-hover:translate-x-3 duration-500 ease-in-out rounded-sm">
                    </div>
                    <div className="relative z-10 ">
                        <p className="uppercase tracking-wider text-black text-lg font-medium text-[13px]">Calegory</p>
                        <ul className="mt-3 text-[15px]">
                            <div className="grid grid-cols-3 gap-5">
                                {
                                    categoryName.map(cat =>
                                        <Link key={cat._id} to={`/product/category/${cat._id}`}
                                            className="bg-transparent text-gray-500  font-semibold hover:text-sky-500 bold py-1 block">
                                            {cat.title}
                                        </Link>
                                    )
                                }
                            </div>

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

    const [isDrawerOpen, setIsDrawerOpen] = useState(true);

    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };


    return (
        <div className=''>


            <div className="drawer ">
                <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col  ">
                    {/* Navbar */}
                    <div className="w-full flex flex-col navbar bg-[#110e0e] border border-b-2 border-[#FFFFFF24]">

                        {/* Navbar */}
                        <div className="navbar nv-bg text-white  md:w-full md:h-[127px] md:px-[68px]">
                            <div className="flex-none md:hidden ">
                                <label htmlFor="my-drawer-3" className="btn btn-square btn-ghost ">
                                    <FontAwesomeIcon className=' text-xl' icon={faBarsStaggered} style={{ color: "#DBC896", }} />
                                </label>
                            </div>
                            <div className="navbar-start">

                                <div className='hidden lg:flex'>
                                    {dropdownLink}
                                </div>
                            </div>

                            <div className="navbar-center ">
                                <Link to='/'><img className='w-[82px] h-[103px]' src={taharLogo} alt="" /></Link>
                            </div>

                            <div className="navbar-end flex flex-row justify-end gap-4">

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
                                                    <div className='w-44 h-11  px-3.5 py-2 rounded-lg lg:border-2 border-orange-200 justify-end items-center gap-1.5 inline-flex'>
                                                        <p>Loading...</p>
                                                    </div>
                                                ) : (
                                                    // Render the content when data is loaded
                                                    user ? (
                                                        <div className="w-fit h-11 px-3.5 py-2 rounded-lg  border-orange-200 justify-end items-center gap-1.5 inline-flex uppercase lg:border-2">
                                                            <img src={userIMG} alt="" />
                                                            <div className='hidden lg:flex '>
                                                                <h1>{user?.displayName}</h1>
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <Link to='/signup' className="w-44 h-11 px-3.5 py-2 rounded-lg lg:border-2 border-orange-200 justify-end items-center gap-1.5 inline-flex">
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
                                                                        <FontAwesomeIcon icon={faTruckFast} style={{ color: "#ffffff", }} />
                                                                        <h1 className="[font-family:'Helvetica_Now_Display-Medium',Helvetica] text-[19px]">

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

                                                {user && (matchedUser?.role === 'Admin' || matchedUser?.role === 'Manager') && open && (
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


                                {!noHeaderFooter && (
                                    <div className=" flex flex-row-reverse">
                                        {localCartData ? (
                                            <span className="indicator-item badge badge-secondary right-5">{localCartData.length}</span>
                                        ) : (
                                            <span className="indicator-item badge badge-secondary right-5">0</span>
                                        )}
                                        <SideCart
                                            selectedCurrencyValue={selectedCurrencyValue}
                                            doller={doller}
                                            localCartData={localCartData}
                                            setLocalCartData={setLocalCartData}>

                                        </SideCart>
                                    </div>
                                )}

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
                    </div>

                </div>

                <div className="drawer-side z-50 md:hidden fixed" >
                    <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay w-80 fixed"></label>
                    <ul className="menu p-4 df w-80 bg-[#201D1D] fixed ">
                        {/* Sidebar */}
                        <div className=' flex flex-row justify-between align-middle items-center'>
                            <p> </p>
                            <Link to='/' >
                                <div className=" flex justify-center">
                                    <img className=' w-[67px] h-[86px] ' src={taharLogo} alt="" />
                                </div>
                            </Link>
                            <button
                                className=' flex justify-end'
                                onClick={() => { document.getElementById('my-drawer-3').click(); }}
                            >
                                <FontAwesomeIcon className='text-[30px]' icon={faBarsStaggered} style={{ color: "#ffffff" }} />
                            </button>
                        </div>
                        
                    </ul>
                </div>


            </div >
        </div >
    );
};

export default Navbar;