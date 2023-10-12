import React from 'react';

const DashboardNavbar = () => {
    return (
        <nav className="fixed z-30 w-full bg-white border-b border-gray-200 ">
            <div className="px-3 py-3 lg:px-5 lg:pl-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center justify-start">
                        <button id="toggleSidebarMobile" aria-expanded="true" aria-controls="sidebar" className="p-2 text-gray-600 rounded cursor-pointer lg:hidden hover:text-gray-900 hover:bg-gray-100 focus:bg-gray-100  focus:ring-2 focus:ring-gray-100    ">
                            <svg id="toggleSidebarMobileHamburger" className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
                            <svg id="toggleSidebarMobileClose" className="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                        </button>
                        <a href="/" className="flex ml-2 md:mr-24">
                            <img src="/images/logo.svg" className="h-8 mr-3" alt="FlowBite Logo" />
                            <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap  ">Flowbite</span>
                        </a>
                        <form action="#" method="GET" className="hidden lg:block lg:pl-3.5">
                            <label htmlFor="topbar-search" className="sr-only">Search</label>
                            <div className="relative mt-1 lg:w-96">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <svg className="w-5 h-5 text-gray-500  " fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
                                </div>
                                <input type="text" name="email" id="topbar-search" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2.5 " placeholder="Search" />
                            </div>
                        </form>
                    </div>
                    <div className="flex items-center">
                        
                        <div className="flex items-center relative">
                            <button id="notificationDropdown" className="p-2 text-gray-500 bg-transparent border border-transparent rounded-full   hover:text-gray-600   hover:bg-gray-100    focus:outline-none focus:ring-2 focus:ring-gray-100 ">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M6 3a6 6 0 118.93 5.146 1 1 0 01-.812.33A5.977 5.977 0 0112 9c0-.097.004-.193.012-.288a3.993 3.993 0 01.662-1.662 7.002 7.002 0 011.855-.886 1 1 0 01.825.328A6.005 6.005 0 016 3zm-4 7a8 8 0 0114.341-5.658 3.99 3.99 0 01.348 5.134 1.001 1.001 0 01-.543.542A7.963 7.963 0 0117 12a8 8 0 01-11.313 7.1 1.003 1.003 0 01-1.414-1.414A5.963 5.963 0 016 13z" clipRule="evenodd"></path></svg>
                            </button>
                            <div id="notificationDropdownContainer" className="hidden bg-white border border-gray-200       mt-2 p-2 w-52 absolute top-full right-0 shadow-lg rounded-lg">
                                <a href="#" className="flex items-center p-2 -mx-2 text-sm font-semibold text-gray-800   hover:bg-gray-100    rounded-md">
                                    <span className="block mx-1.5 truncate">New Order</span>
                                    <span className="text-green-500">
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7 2a7.002 7.002 0 016.975 6.557L14 9a6 6 0 1112 0 1 1 0 012 0 8 8 0 11-16 0A1 1 0 010 9a6 6 0 011 2.557L.025 8.557A7.002 7.002 0 017 2zm0 4a2 2 0 00-2 2h4a2 2 0 00-2-2zm0 7a1 1 0 100 2 1 1 0 000-2zm6-7a2 2 0 00-2 2h4a2 2 0 00-2-2zm0 7a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd"></path></svg>
                                    </span>
                                </a>
                                <a href="#" className="flex items-center p-2 -mx-2 text-sm font-semibold text-gray-800   hover:bg-gray-100    rounded-md">
                                    <span className="block mx-1.5 truncate">New user registered</span>
                                    <span className="text-green-500">
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7 2a7.002 7.002 0 016.975 6.557L14 9a6 6 0 1112 0 1 1 0 012 0 8 8 0 11-16 0A1 1 0 010 9a6 6 0 011 2.557L.025 8.557A7.002 7.002 0 017 2zm0 4a2 2 0 00-2 2h4a2 2 0 00-2-2zm0 7a1 1 0 100 2 1 1 0 000-2zm6-7a2 2 0 00-2 2h4a2 2 0 00-2-2zm0 7a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd"></path></svg>
                                    </span>
                                </a>
                                <a href="#" className="flex items-center p-2 -mx-2 text-sm font-semibold text-gray-800   hover:bg-gray-100    rounded-md">
                                    <span className="block mx-1.5 truncate">API key created</span>
                                    <span className="text-green-500">
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7 2a7.002 7.002 0 016.975 6.557L14 9a6 6 0 1112 0 1 1 0 012 0 8 8 0 11-16 0A1 1 0 010 9a6 6 0 011 2.557L.025 8.557A7.002 7.002 0 017 2zm0 4a2 2 0 00-2 2h4a2 2 0 00-2-2zm0 7a1 1 0 100 2 1 1 0 000-2zm6-7a2 2 0 00-2 2h4a2 2 0 00-2-2zm0 7a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd"></path></svg>
                                    </span>
                                </a>
                            </div>
                        </div>
                        <div className="relative ml-3 sm:hidden">
                            <button id="notificationDropdownMobile" className="p-2 text-gray-500 bg-transparent border border-transparent rounded-full   hover:text-gray-600   hover:bg-gray-100    focus:outline-none focus:ring-2 focus:ring-gray-100   ">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M6 3a6 6 0 118.93 5.146 1 1 0 01-.812.33A5.977 5.977 0 0112 9c0-.097.004-.193.012-.288a3.993 3.993 0 01.662-1.662 7.002 7.002 0 011.855-.886 1 1 0 01.825.328A6.005 6.005 0 016 3zm-4 7a8 8 0 0114.341-5.658 3.99 3.99 0 01.348 5.134 1.001 a 1 0 01-.543.542A7.963 7.963 0 0117 12a8 8 0 01-11.313 7.1 1.003 1.003 0 01-1.414-1.414A5.963 5.963 0 016 13z" clipRule="evenodd"></path></svg>
                            </button>
                            <div id="notificationDropdownMobileContainer" className="hidden bg-white border border-gray-200       mt-2 p-2 w-52 absolute top-full right-0 shadow-lg rounded-lg">
                                <a href="#" className="flex items-center p-2 -mx-2 text-sm font-semibold text-gray-800   hover:bg-gray-100    rounded-md">
                                    <span className="block mx-1.5 truncate">New Order</span>
                                    <span className="text-green-500">
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7 2a7.002 7.002 0 016.975 6.557L14 9a6 6 0 1112 0 1 1 0 012 0 8 8 0 11-16 0A1 1 0 010 9a6 6 0 011 2.557L.025 8.557A7.002 7.002 0 017 2zm0 4a2 2 0 00-2 2h4a2 2 0 00-2-2zm0 7a1 1 0 100 2 1 1 0 000-2zm6-7a2 2 0 00-2 2h4a2 2 0 00-2-2zm0 7a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd"></path></svg>
                                    </span>
                                </a>
                                <a href="#" className="flex items-center p-2 -mx-2 text-sm font-semibold text-gray-800   hover:bg-gray-100    rounded-md">
                                    <span className="block mx-1.5 truncate">New user registered</span>
                                    <span className="text-green-500">
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7 2a7.002 7.002 0 016.975 6.557L14 9a6 6 0 1112 0 1 1 0 012 0 8 8 0 11-16 0A1 1 0 010 9a6 6 0 011 2.557L.025 8.557A7.002 7.002 0 017 2zm0 4a2 2 0 00-2 2h4a2 2 0 00-2-2zm0 7a1 1 0 100 2 1 1 0 000-2zm6-7a2 2 0 00-2 2h4a2 2 0 00-2-2zm0 7a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd"></path></svg>
                                    </span>
                                </a>
                                <a href="#" className="flex items-center p-2 -mx-2 text-sm font-semibold text-gray-800   hover:bg-gray-100    rounded-md">
                                    <span className="block mx-1.5 truncate">API key created</span>
                                    <span className="text-green-500">
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7 2a7.002 7.002 0 016.975 6.557L14 9a6 6 0 1112 0 1 1 0 012 0 8 8 0 11-16 0A1 1 0 010 9a6 6 0 011 2.557L.025 8.557A7.002 7.002 0 017 2zm0 4a2 2 0 00-2 2h4a2 2 0 00-2-2zm0 7a1 1 0 100 2 1 1 0 000-2zm6-7a2 2 0 00-2 2h4a2 2 0 00-2-2zm0 7a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd"></path></svg>
                                    </span>
                                </a>
                            </div>
                        </div>
                        <div className="relative ml-3">
                            <button id="userDropdown" className="p-2 text-gray-500 bg-transparent border border-transparent rounded-full   hover:text-gray-600   hover:bg-gray-100    focus:outline-none focus:ring-2 focus:ring-gray-100   ">
                                <img className="w-6 h-6 rounded-full" src="/images/team-1.jpg" alt="Ahmed Kamel" />
                            </button>
                            <div id="userDropdownContainer" className="hidden bg-white border border-gray-200       mt-2 p-2 w-52 absolute top-full right-0 shadow-lg rounded-lg">
                                <a href="#" className="flex items-center p-2 -mx-2 text-sm font-semibold text-gray-800   hover:bg-gray-100    rounded-md">
                                    <svg className="w-4 h-4 mx-1.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7 2a7.002 7.002 0 016.975 6.557 1 1 0 01-.812.33 5.977 5.977 0 011.837 1.042 7.002 7.002 0 11-11.813-.002A5.978 5.978 0 013.837 9.93 1 1 0 013 9.6 7.002 7.002 0 017 2zm4 2a2 2 0 00-2 2h4a2 2 0 00-2-2zm0 7a1 1 0 100 2 1 1 0 000-2zm-4 2a2 2 0 00-2 2h4a2 2 0 00-2-2z" clipRule="evenodd"></path></svg>
                                    <span className="block mx-1.5">Profile</span>
                                </a>
                                <a href="#" className="flex items-center p-2 -mx-2 text-sm font-semibold text-gray-800   hover:bg-gray-100    rounded-md">
                                    <svg className="w-4 h-4 mx-1.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7 2a7.002 7.002 0 016.975 6.557 1 1 0 01-.812.33 5.977 5.977 0 011.837 1.042 7.002 7.002 0 11-11.813-.002A5.978 5.978 0 013.837 9.93 1 1 0 013 9.6 7.002 7.002 0 017 2zm4 2a2 2 0 00-2 2h4a2 2 0 00-2-2zm0 7a1 1 0 100 2 1 1 0 000-2zm-4 2a2 2 0 00-2 2h4a2 2 0 00-2-2z" clipRule="evenodd"></path></svg>
                                    <span className="block mx-1.5">Settings</span>
                                </a>
                                <a href="#" className="flex items-center p-2 -mx-2 text-sm font-semibold text-gray-800   hover:bg-gray-100    rounded-md">
                                    <svg className="w-4 h-4 mx-1.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M13 2a7.002 7.002 0 00-6.975 6.557 1 1 0 00.812.33 5.977 5.977 0 00-1.837 1.042 7.002 7.002 0 1011.813.002A5.978 5.978 0 0016.163 9.93a1 1 0 00.174-.566A7.002 7.002 0 0013 2zm-4 2a2 2 0 012 2h-4a2 2 0 012-2zm0 7a1 1 0 110 2 1 1 0 010-2zm4 2a2 2 0 012 2h-4a2 2 0 012-2zm0 7a1 1 0 110 2 1 1 0 010-2z" clipRule="evenodd"></path></svg>
                                    <span className="block mx-1.5">Log out</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default DashboardNavbar;