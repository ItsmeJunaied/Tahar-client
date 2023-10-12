import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import DashBoardHome from '../Pages/DashBoard/DashBoardHome/DashBoardHome';
import { AuthContext } from '../Provider/AuthProvider';

const DashBoard = () => {
    const location = useLocation();
    const isDashboardPage = location.pathname === '/dashboard';
    const { user, loggedUser } = useContext(AuthContext);

    const matchedUser = loggedUser.find(logeduser => logeduser?.email === user?.email);

    return (
        <div className="drawer ">
            <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col">
                {/* Navbar */}
                <div className="w-full navbar bg-white border border-b-2 ">
                    <div className="flex-none ">
                        <label htmlFor="my-drawer-3" className="btn btn-square btn-ghost">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                        </label>
                    </div>
                    <div className="flex-1 px-2 mx-2">Navbar Title</div>
                    <div className="flex-none hidden lg:block"></div>
                </div>
                {isDashboardPage && <DashBoardHome ></DashBoardHome>}
                <Outlet></Outlet>
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label>


                <ul className="menu p-4 w-80 min-h-full bg-white">
                    
                    <Link to='/dashboard' >
                        <div className="avatar indicator">

                            {
                                user && matchedUser && matchedUser.role === "Admin" ? (<span className="indicator-item badge badge-secondary mt-28 h-10 font-bold">Admin</span>) : (<span className="indicator-item badge badge-secondary mt-28 h-10 font-bold">User</span>)
                            }
                            <div className="w-32 ml-24 mt-24 rounded-full ring ring-warning ring-offset-base-100 ring-offset-2">
                                <img src={user?.photoURL} />
                            </div>
                        </div>
                    </Link>
                    <div>
                        <h3 className=' text-white text-center uppercase font-serif font-bold text-2xl'>{user?.displayName}</h3>
                    </div>
                    {
                        user && matchedUser && matchedUser.role === "Admin" ? (
                            <>
                                <li>
                                    <NavLink className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 mt-2" to='/dashboard/uploadProducts'>

                                        <span className="flex-1 ml-3 text-left   text-[19px] [font-family:'Helvetica_Now_Display-Medium',Helvetica]"  >
                                            Upload Products</span>
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 mt-2" to='/dashboard/categoryUpload'>

                                        <span className="flex-1 ml-3 text-left   text-[19px] [font-family:'Helvetica_Now_Display-Medium',Helvetica]"  >
                                            Upload Category</span>
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 mt-2" to='/dashboard/uploadVideo'>

                                        <span className="flex-1 ml-3 text-left   text-[19px] [font-family:'Helvetica_Now_Display-Medium',Helvetica]"  >
                                            Upload Video</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 mt-2" to='/dashboard/uploadBanner'>

                                        <span className="flex-1 ml-3 text-left   text-[19px] [font-family:'Helvetica_Now_Display-Medium',Helvetica]"  >
                                            Upload Banner</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 mt-2" to='/dashboard/uploadCustomerSpot'>

                                        <span className="flex-1 ml-3 text-left   text-[19px] [font-family:'Helvetica_Now_Display-Medium',Helvetica]"  >
                                            Upload Customer Spotlight</span>
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 mt-2" to='/dashboard/promocode'>

                                        <span className="flex-1 ml-3 text-left   text-[19px] [font-family:'Helvetica_Now_Display-Medium',Helvetica]"  >
                                            Promo Code</span>
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 mt-2" to='/dashboard/manageProducts'>

                                        <span className="flex-1 ml-3 text-left   text-[19px] [font-family:'Helvetica_Now_Display-Medium',Helvetica]"  >
                                            Manage Products</span>
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 mt-2" to='/dashboard/manageUsers'>

                                        <span className="flex-1 ml-3 text-left   text-[19px] [font-family:'Helvetica_Now_Display-Medium',Helvetica]"  >
                                            Manage Users</span>
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 mt-2" to='/dashboard/manageOrders'>

                                        <span className="flex-1 ml-3 text-left   text-[19px] [font-family:'Helvetica_Now_Display-Medium',Helvetica]"  >
                                            Manage Orders</span>
                                    </NavLink>
                                </li>

                            </>
                        ) : (
                            <>
                                <li><NavLink className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 mt-2 text-[19px] [font-family:'Helvetica_Now_Display-Medium',Helvetica]" to='/dashboard/cartItems'>
                                    Cart Items
                                </NavLink></li>
                                <li><NavLink className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 mt-2 text-[19px] [font-family:'Helvetica_Now_Display-Medium',Helvetica]" to='/dashboard/myItems'>
                                    My Items
                                </NavLink></li>
                                <li><NavLink className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 mt-2 text-[19px] [font-family:'Helvetica_Now_Display-Medium',Helvetica]" to='/dashboard/paymentHistory'>
                                    Payment History
                                </NavLink></li>
                            </>
                        )
                    }
                    <div className="divider"></div>
                    <li><NavLink className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 mt-2 text-[19px] [font-family:'Helvetica_Now_Display-Medium',Helvetica]" to='/'>
                        Home
                    </NavLink>
                    </li>
                    <li><NavLink className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 mt-2 text-[19px] [font-family:'Helvetica_Now_Display-Medium',Helvetica]" to='/instructor'>
                        Collections
                    </NavLink>
                    </li>
                    <li><NavLink className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 mt-2 text-[19px] [font-family:'Helvetica_Now_Display-Medium',Helvetica]" to='/class'>
                        Log Out
                    </NavLink>
                    </li>
                </ul>

            </div >
        </div >
    );
};

export default DashBoard;

