import { faArrowRightArrowLeft, faArrowUpFromBracket, faBagShopping, faBars, faBarsStaggered,  faBoxesPacking, faBoxesStacked, faCartShopping, faClipboardQuestion, faCloudArrowUp, faDatabase, faPanorama, faPeopleRoof, faShieldHalved, faShop, faStar, faTicket, faUserGroup } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import DashBoardHome from '../Pages/DashBoard/DashBoardHome/DashBoardHome';
import { AuthContext } from '../Provider/AuthProvider';
import taharLogo from '../../public/photos/tahar-logo.png';
import './DashSidebar/Dashboard.css';
import { faBell, faFileLines, faImage, faNewspaper } from '@fortawesome/free-regular-svg-icons';
const DashBoard = () => {
    const location = useLocation();
    const isDashboardPage = location.pathname === '/dashboard';
    const { user, loggedUser } = useContext(AuthContext);

    const matchedUser = loggedUser.find(logeduser => logeduser?.email === user?.email);

    // console.log(user)

    return (
        <div className="drawer ">
            <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col border-b-2 border-white border-opacity-10 ">
                {/* Navbar */}
                <div className="w-full navbar bg-[#110e0e] border border-b-2 px-[100px]">
                    <div className="flex-none ">
                        <label htmlFor="my-drawer-3" className="btn btn-square btn-ghost ">
                            <FontAwesomeIcon className=' text-xl' icon={faBarsStaggered} style={{ color: "#ffffff", }} />
                        </label>
                    </div>

                    <div className="flex-1 px-2 mx-2">
                        <p className='navbar-title-text'>
                            {location.pathname.substring(location.pathname.lastIndexOf('/') + 1)}
                        </p>
                    </div>

                    <button>
                        <FontAwesomeIcon className=' text-[25px]' icon={faBell} style={{ color: "#ffffff", }} />
                    </button>

                    <div className="avatar ml-8">
                        <div className="w-[38px] h-[38px] rounded-full ring ring-white ring-offset-base-100 ring-offset-1">
                            <img src={user?.photoURL} />
                        </div>
                    </div>
                    <div className="flex-none hidden lg:block"></div>
                </div>
                {isDashboardPage && <DashBoardHome ></DashBoardHome>}
                <Outlet></Outlet>
            </div>

            <div className="drawer-side">
                <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label>


                <ul className="menu p-4 w-80 min-h-full bg-[#201D1D]">

                    <Link to='/dashboard' >
                        <div className=" flex justify-center">
                            <img className=' w-[67px] h-[86px] ' src={taharLogo} alt="" />
                        </div>
                    </Link>

                    {
                        user && matchedUser && matchedUser.role === "Admin" ? (

                            <>
                                <div className="w-80 h-10 px-7 py-3.5 mt-[35px] rounded-md justify-start items-center gap-2 inline-flex">
                                    <div className="top-menu-text ">MAIN MENU</div>
                                </div>

                                {/* order Management */}
                                <NavLink to='/dashboard/uploadProducts' className="w-72 h-12 px-5 py-2 rounded-md justify-start items-center gap-5 inline-flex">
                                    <div className=" relative">
                                        <FontAwesomeIcon className=' w-[20px] h-[20px]' icon={faCartShopping} style={{ color: "#8b909a", }} />
                                    </div>
                                    <div className="">
                                        <p className='sidebar_text'>Order Management</p>
                                    </div>
                                </NavLink >

                                {/* Customer */}
                                <NavLink to='/dashboard/uploadProducts' className="w-72 h-12 px-5 py-2 rounded-md justify-start items-center gap-5 inline-flex">
                                    <div className=" relative">
                                        <FontAwesomeIcon className=' w-[20px] h-[20px]' icon={faUserGroup} style={{ color: "#8b909a", }} />
                                    </div>
                                    <div className="">
                                        <p className='sidebar_text'>Customers</p>
                                    </div>
                                </NavLink >
                                {/* coupon */}
                                <NavLink to='/dashboard/promocode' className="w-72 h-12 px-5 py-2 rounded-md justify-start items-center gap-5 inline-flex">
                                    <div className=" relative">
                                        <FontAwesomeIcon className=' w-[20px] h-[20px]' icon={faTicket} style={{ color: "#8b909a", }} />
                                    </div>
                                    <div className="text-[17px] sidebar_text leading-snug">Coupon Code</div>
                                </NavLink >
                                {/* Categories */}
                                <NavLink to='/dashboard/promocode' className="w-72 h-12 px-5 py-2 rounded-md justify-start items-center gap-5 inline-flex">
                                    <div className=" relative">
                                        <FontAwesomeIcon className=' w-[20px] h-[20px]' icon={faBoxesStacked} style={{ color: "#8b909a", }} />
                                    </div>
                                    <div className="text-[17px] sidebar_text leading-snug">Categories</div>
                                </NavLink >
                                {/* Transaction */}
                                <NavLink to='/dashboard/promocode' className="w-72 h-12 px-5 py-2 rounded-md justify-start items-center gap-5 inline-flex">
                                    <div className=" relative">
                                        <FontAwesomeIcon className=' w-[20px] h-[20px]' icon={faFileLines} style={{ color: "#8b909a", }} />
                                    </div>
                                    <div className="text-[17px] sidebar_text leading-snug">Transactions</div>
                                </NavLink >

                                <NavLink to='/dashboard/promocode' className="w-72 h-12 px-5 py-2 rounded-md justify-start items-center gap-5 inline-flex">
                                    <div className=" relative">
                                        <FontAwesomeIcon className=' w-[20px] h-[20px]' icon={faShieldHalved} style={{ color: "#8b909a", }} />
                                    </div>
                                    <div className="text-[17px] sidebar_text leading-snug">Brand</div>
                                </NavLink >

                                <NavLink to='/dashboard/promocode' className="w-72 h-12 px-5 py-2 rounded-md justify-start items-center gap-5 inline-flex">
                                    <div className=" relative">
                                        <FontAwesomeIcon className=' w-[20px] h-[20px]' icon={faStar} style={{ color: "#8b909a", }} />
                                    </div>
                                    <div className="text-[17px] sidebar_text leading-snug">Customer Rating</div>
                                </NavLink >

                                <NavLink to='/dashboard/promocode' className="w-72 h-12 px-5 py-2 rounded-md justify-start items-center gap-5 inline-flex">
                                    <div className=" relative">
                                        <FontAwesomeIcon className=' w-[20px] h-[20px]' icon={faArrowRightArrowLeft} style={{ color: "#8b909a", }} />
                                    </div>
                                    <div className="text-[17px] sidebar_text leading-snug">Return & Exchange</div>
                                </NavLink >

                                <NavLink to='/dashboard/promocode' className="w-72 h-12 px-5 py-2 rounded-md justify-start items-center gap-5 inline-flex">
                                    <div className=" relative">
                                        <FontAwesomeIcon className=' w-[20px] h-[20px]' icon={faNewspaper} style={{ color: "#8b909a", }} />
                                    </div>
                                    <div className="text-[17px] sidebar_text leading-snug">Newsletter Subscriber</div>
                                </NavLink >

                                {/* upload */}
                                <div className="w-80 h-10 px-7 py-3.5 mt-[35px] rounded-md justify-start items-center gap-2 inline-flex">
                                    <div className="top-menu-text ">Upload</div>
                                </div>

                                <NavLink to='/dashboard/categoryUpload' className="w-72 h-12 px-5 py-2 rounded-md justify-start items-center gap-5 inline-flex">
                                    <div className=" relative">
                                        <FontAwesomeIcon className=' w-[20px] h-[20px]' icon={faArrowUpFromBracket} style={{ color: "#8b909a", }} />
                                    </div>
                                    <div className="text-[17px] sidebar_text leading-snug">Upload Category</div>
                                </NavLink >


                                <NavLink to='/dashboard/uploadVideo' className="w-72 h-12 px-5 py-2 rounded-md justify-start items-center gap-5 inline-flex">
                                    <div className=" relative">
                                        <FontAwesomeIcon className=' w-[20px] h-[20px]' icon={faCloudArrowUp} style={{ color: "#8b909a", }} />
                                    </div>
                                    <div className="text-[17px] sidebar_text leading-snug">Upload Video</div>
                                </NavLink >


                                <NavLink to='/dashboard/uploadBanner' className="w-72 h-12 px-5 py-2 rounded-md justify-start items-center gap-5 inline-flex">
                                    <div className=" relative">
                                        <FontAwesomeIcon className=' w-[20px] h-[20px]' icon={faPanorama} style={{ color: "#8b909a", }} />
                                    </div>
                                    <div className="text-[17px] sidebar_text leading-snug">Upload Banner</div>
                                </NavLink >


                                <NavLink to='/dashboard/uploadCustomerSpot' className="w-72 h-12 px-5 py-2 rounded-md justify-start items-center gap-5 inline-flex">
                                    <div className=" relative">
                                        <FontAwesomeIcon className=' w-[20px] h-[20px]' icon={faImage} style={{ color: "#8b909a", }} />
                                    </div>
                                    <div className="text-[17px] sidebar_text leading-snug">Upload Customer Spotlight</div>
                                </NavLink >

                                <NavLink to='/dashboard/uploadCustomerSpot' className="w-72 h-12 px-5 py-2 rounded-md justify-start items-center gap-5 inline-flex">
                                    <div className=" relative">
                                        <FontAwesomeIcon className=' w-[20px] h-[20px]' icon={faClipboardQuestion} style={{ color: "#8b909a", }} />
                                    </div>
                                    <div className="text-[17px] sidebar_text leading-snug">Upload FAQs</div>
                                </NavLink >




                                <div className="w-80 h-10 px-7 py-3.5 mt-[35px] rounded-md justify-start items-center gap-2 inline-flex">
                                    <div className="top-menu-text ">Manage</div>
                                </div>


                                <NavLink to='/dashboard/manageProducts' className="w-72 h-12 px-5 py-2 rounded-md justify-start items-center gap-5 inline-flex">
                                    <div className=" relative">
                                        <FontAwesomeIcon className=' w-[20px] h-[20px]' icon={faBoxesPacking} style={{ color: "#8b909a", }} />
                                    </div>
                                    <div className="text-[17px] sidebar_text leading-snug">Manage Products</div>
                                </NavLink >

                                <NavLink to='/dashboard/manageUsers' className="w-72 h-12 px-5 py-2 rounded-md justify-start items-center gap-5 inline-flex">
                                    <div className=" relative">
                                        <FontAwesomeIcon className=' w-[20px] h-[20px]' icon={faPeopleRoof} style={{ color: "#8b909a", }} />
                                    </div>
                                    <div className="text-[17px] sidebar_text leading-snug">Manage Users</div>
                                </NavLink >

                                <NavLink to='/dashboard/manageOrders' className="w-72 h-12 px-5 py-2 rounded-md justify-start items-center gap-5 inline-flex">
                                    <div className=" relative">
                                        <FontAwesomeIcon className=' w-[20px] h-[20px]' icon={faBagShopping} style={{ color: "#8b909a", }} />
                                    </div>
                                    <div className="text-[17px] sidebar_text leading-snug">Manage Orders</div>
                                </NavLink >


                            </>
                        ) : (
                            <>

                                <NavLink to='/dashboard/cartItems' className="w-72 h-12 px-5 py-2 rounded-md justify-start items-center gap-5 inline-flex">
                                    <div className=" relative">
                                        <FontAwesomeIcon className=' w-[20px] h-[20px]' icon={faCartShopping} style={{ color: "#8b909a", }} />
                                    </div>
                                    <div className="text-[17px] sidebar_text leading-snug">Cart Items</div>
                                </NavLink >

                                <NavLink to='/dashboard/myItems' className="w-72 h-12 px-5 py-2 rounded-md justify-start items-center gap-5 inline-flex">
                                    <div className=" relative">
                                        <FontAwesomeIcon className=' w-[20px] h-[20px]' icon={faCartShopping} style={{ color: "#8b909a", }} />
                                    </div>
                                    <div className="text-[17px] sidebar_text leading-snug">My Items</div>
                                </NavLink >

                                <NavLink to='/dashboard/paymentHistory' className="w-72 h-12 px-5 py-2 rounded-md justify-start items-center gap-5 inline-flex">
                                    <div className=" relative">
                                        <FontAwesomeIcon className=' w-[20px] h-[20px]' icon={faCartShopping} style={{ color: "#8b909a", }} />
                                    </div>
                                    <div className="text-[17px] sidebar_text leading-snug">Payment History</div>
                                </NavLink >

                            </>
                        )
                    }

                    <div className="w-80 h-10 px-7 py-3.5 mt-[35px] rounded-md justify-start items-center gap-2 inline-flex">
                        <div className="top-menu-text ">{matchedUser?.role}</div>
                    </div>

                    <NavLink to='/' className="w-72 h-12 px-5 py-2 rounded-md justify-start items-center gap-5 inline-flex">
                        <div className=" relative">
                            <FontAwesomeIcon className=' w-[20px] h-[20px]' icon={faShop} style={{ color: "#8b909a", }} />
                        </div>
                        <div className="text-[17px] sidebar_text leading-snug">Home</div>
                    </NavLink >

                    <NavLink to='/instructor' className="w-72 h-12 px-5 py-2 rounded-md justify-start items-center gap-5 inline-flex">
                        <div className=" relative">
                            <FontAwesomeIcon className=' w-[20px] h-[20px]' icon={faDatabase} style={{ color: "#8b909a", }} />
                        </div>
                        <div className="text-[17px] sidebar_text leading-snug">Collections</div>
                    </NavLink >


                </ul>

            </div >
        </div >
    );
};

export default DashBoard;

