import React, { useContext, useEffect, useState } from 'react';
import './DashBoardHome.css';
import Revenue from './Revenue/Revenue';
import Scatistics from '../Scatistics/Scatistics';
import Stats from '../Stats/Stats';
import { AuthContext } from '../../../Provider/AuthProvider';
const DashBoardHome = () => {
    const { AllProducts } = useContext(AuthContext);
    const [ratingData, setRatingData] = useState([]);
    const [orderData, setOrderData] = useState([]);

    console.log(ratingData)
    useEffect(() => {
        fetch('https://tahar-server-production.up.railway.app/orders')
            .then(res => res.json())
            .then(data => {
                setOrderData(data);
            });
    }, []);


    useEffect(() => {
        fetch('https://tahar-server-production.up.railway.app/rating')
            .then(res => res.json())
            .then(data => setRatingData(data))
    }, []);

    const orderedProductName = orderData.flatMap(item => item.localCartData.map(cartItem => cartItem.ProductName));

    const productFrequency = {};

    orderedProductName.forEach(product => {
        if (productFrequency[product]) {
            productFrequency[product] += 1;
        } else {
            productFrequency[product] = 1;
        }
    });

    const numberOfUnpaidOrders = orderData.filter(item => item.paidStatus === false).length;
    console.log(numberOfUnpaidOrders);

    const formatDate = (isoDate) => {
        const date = new Date(isoDate);
        const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true };
        return new Intl.DateTimeFormat('en-US', options).format(date);
    };
    return (
        <div className=' container mx-auto'>
            <div className="px-4 pt-6">
                <div className="grid gap-4 xl:grid-cols-2 2xl:grid-cols-3">

                    <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2  sm:p-6  ">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex-shrink-0">
                                {/* <span className="text-xl font-bold leading-none text-gray-900 sm:text-2xl  ">$45,385</span> */}
                                <h3 className="text-base font-light text-gray-500  ">Sales this week</h3>
                            </div>
                            <div className="flex items-center justify-end flex-1 text-base font-medium text-green-500  ">
                                12.5%
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd"
                                        d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z"
                                        clipRule="evenodd"></path>
                                </svg>
                            </div>
                        </div>
                        <div>
                            <Revenue></Revenue>
                        </div>
                        <div id="main-chart"></div>

                        <div className="flex items-center justify-between pt-3 mt-4 border-t border-gray-200 sm:pt-6  ">
                            <div>
                                <button className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 rounded-lg hover:text-gray-900    " type="button" data-dropdown-toggle="weekly-sales-dropdown">Last 7 days <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg></button>

                                <div className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow    " id="weekly-sales-dropdown">
                                    <div className="px-4 py-3" role="none">
                                        <p className="text-sm font-medium text-gray-900 truncate  " role="none">
                                            Sep 16, 2021 - Sep 22, 2021
                                        </p>
                                    </div>
                                    <ul className="py-1" role="none">
                                        <li>
                                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100     " role="menuitem">Yesterday</a>
                                        </li>
                                        <li>
                                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100     " role="menuitem">Today</a>
                                        </li>
                                        <li>
                                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100     " role="menuitem">Last 7 days</a>
                                        </li>
                                        <li>
                                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100     " role="menuitem">Last 30 days</a>
                                        </li>
                                        <li>
                                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100     " role="menuitem">Last 90 days</a>
                                        </li>
                                    </ul>
                                    <div className="py-1" role="none">
                                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100     " role="menuitem">Custom...</a>
                                    </div>
                                </div>
                            </div>
                            {/* <div className="flex-shrink-0">
                                <a href="#" className="inline-flex items-center p-2 text-xs font-medium uppercase rounded-lg text-primary-700 sm:text-sm hover:bg-gray-100    ">
                                    Sales Report
                                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                                </a>
                            </div> */}
                        </div>
                    </div>

                    <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm  sm:p-6  ">
                        <h3 className="flex items-center mb-4 text-lg font-semibold text-gray-900  ">Statistics this month
                            <button data-popover-target="popover-description" data-popover-placement="bottom-end" type="button"><svg className="w-4 h-4 ml-2 text-gray-400 hover:text-gray-500" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"></path></svg><span className="sr-only">Show information</span></button>
                        </h3>
                        <div data-popover id="popover-description" role="tooltip" className="absolute z-10 invisible inline-block text-sm font-light text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 w-72     ">
                            <div className="p-3 space-y-2">
                                <h3 className="font-semibold text-gray-900  ">Statistics</h3>
                                <p>Statistics is a branch of applied mathematics that involves the collection, description, analysis, and inference of conclusions from quantitative data.</p>
                                <a href="#" className="flex items-center font-medium text-primary-600   hover:text-primary-700">Read more <svg className="w-4 h-4 ml-1" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg></a>
                            </div>
                            <div data-popper-arrow></div>
                        </div>
                        <div className="sm:hidden">
                            <label htmlFor="tabs" className="sr-only">Select tab</label>
                            <select id="tabs" className="bg-gray-50 border-0 border-b border-gray-200 text-gray-900 text-sm rounded-t-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 ">
                                <option>Statistics</option>
                                <option>Services</option>
                                <option>FAQ</option>
                            </select>
                        </div>
                        <ul className="hidden text-sm font-medium text-center text-gray-500 divide-x divide-gray-200 rounded-lg sm:flex    " id="fullWidthTab" data-tabs-toggle="#fullWidthTabContent" role="tablist">
                            <li className="w-full">
                                <button id="faq-tab" data-tabs-target="#faq" type="button" role="tab" aria-controls="faq" aria-selected="true" className="inline-block w-full p-4 rounded-tl-lg bg-gray-50 hover:bg-gray-100 focus:outline-none    ">Top products</button>
                            </li>
                            {/* <li className="w-full">
                                <button id="about-tab" data-tabs-target="#about" type="button" role="tab" aria-controls="about" aria-selected="false" className="inline-block w-full p-4 rounded-tr-lg bg-gray-50 hover:bg-gray-100 focus:outline-none    ">Top Customers</button>
                            </li> */}
                        </ul>
                        <div id="fullWidthTabContent" className="border-t border-gray-200  ">
                            <div className=" pt-4" id="faq" role="tabpanel" aria-labelledby="faq-tab">
                                <ul role="list" className="divide-y divide-gray-200  ">
                                    <li className="py-3 sm:py-4">
                                        <div className="flex items-center justify-around ">
                                            <div>
                                                {Object.entries(productFrequency).map(([productName, quantity]) => (
                                                    <div className="flex items-center justify-between w-full " key={productName}>
                                                        <div>
                                                            <img className="flex-shrink-0 w-10 h-10" src={`/images/products/${productName}.png`} alt={`${productName} image`} />
                                                        </div>
                                                        <div className="ml-3">
                                                            <p className="font-medium text-gray-900 truncate">
                                                                {productName}
                                                            </p>
                                                        </div>
                                                        <div className="ml-3 flex">
                                                            <div>
                                                                <p>Quantity</p>
                                                            </div>
                                                            <div className="flex items-center justify-end flex-1 text-sm text-green-500 text-center ">
                                                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                                                    <path clipRule="evenodd" fillRule="evenodd" d="M10 17a.75.75 0 01-.75-.75V5.612L5.29 9.77a.75.75 0 01-1.08-1.04l5.25-5.5a.75.75 0 011.08 0l5.25 5.5a.75.75 0 11-1.08 1.04l-3.96-4.158V16.25A.75.75 0 0110 17z"></path>
                                                                </svg>
                                                                <p>{quantity}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>

                                        </div>
                                    </li>
                                </ul>
                            </div>

                        </div>

                        <div className="flex items-center justify-between pt-3 mt-5 border-t border-gray-200 sm:pt-6  ">
                            <div>
                                <button className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 rounded-lg hover:text-gray-900    " type="button" data-dropdown-toggle="stats-dropdown">Last 7 days <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg></button>

                                <div className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow    " id="stats-dropdown">
                                    <div className="px-4 py-3" role="none">
                                        <p className="text-sm font-medium text-gray-900 truncate  " role="none">
                                            Sep 16, 2021 - Sep 22, 2021
                                        </p>
                                    </div>
                                    <ul className="py-1" role="none">
                                        <li>
                                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100     " role="menuitem">Yesterday</a>
                                        </li>
                                        <li>
                                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100     " role="menuitem">Today</a>
                                        </li>
                                        <li>
                                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100     " role="menuitem">Last 7 days</a>
                                        </li>
                                        <li>
                                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100     " role="menuitem">Last 30 days</a>
                                        </li>
                                        <li>
                                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100     " role="menuitem">Last 90 days</a>
                                        </li>
                                    </ul>
                                    <div className="py-1" role="none">
                                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100     " role="menuitem">Custom...</a>
                                    </div>
                                </div>
                            </div>
                            <div className="flex-shrink-0">
                                <a href="#" className="inline-flex items-center p-2 text-xs font-medium uppercase rounded-lg text-primary-700 sm:text-sm hover:bg-gray-100    ">
                                    Full Report
                                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="grid w-full grid-cols-1 gap-4 mt-4 xl:grid-cols-2 2xl:grid-cols-3">
                    <div className="items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:flex  sm:p-6  ">
                        <div className="w-full">
                            <h3 className="text-base font-normal text-gray-500  "> Total Products</h3>
                            <span className="text-2xl font-bold leading-none text-gray-900 sm:text-3xl  ">{AllProducts.length}</span>

                        </div>
                        <div className="w-full" id="new-products-chart"></div>
                    </div>
                    <div className="items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:flex  sm:p-6  ">
                        <div className="w-full">
                            <h3 className="text-base font-normal text-gray-500  ">Total Orders</h3>
                            <span className="text-2xl font-bold leading-none text-gray-900 sm:text-3xl  ">{orderData.length}</span>

                        </div>
                        <div className="w-full" id="week-signups-chart"></div>
                    </div>
                    <div className="items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:flex  sm:p-6  ">
                        <div className="w-full">
                            <h3 className="text-base font-normal text-gray-500  ">Pending Order</h3>
                            <span className="text-2xl font-bold leading-none text-gray-900 sm:text-3xl  ">
                                {numberOfUnpaidOrders}
                            </span>

                        </div>
                        <div className="w-full" id="new-products-chart"></div>
                    </div>
                    {/* <div className="items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:flex  sm:p-6  ">
                        <div className="w-full">
                            <h3 className="text-base font-normal text-gray-500  ">Cancaled Order</h3>
                            <span className="text-2xl font-bold leading-none text-gray-900 sm:text-3xl  ">
                                {numberOfUnpaidOrders}
                            </span>

                        </div>
                        <div className="w-full" id="new-products-chart"></div>
                    </div> */}
                </div>
                <div className="grid grid-cols-1 my-4 xl:grid-cols-2 xl:gap-4">
                    <div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-6    xl:mb-0">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-gray-900  ">Customer Reviews</h3>
                            <a href="#" className="inline-flex items-center p-2 text-sm font-medium rounded-lg text-primary-700 hover:bg-gray-100    ">
                                View all
                            </a>
                        </div>

                        <form className="overflow-y-auto lg:max-h-[60rem] 2xl:max-h-fit">
                            {
                                ratingData &&
                                ratingData
                                    .sort((a, b) => new Date(b.date) - new Date(a.date)) // Sort by date in descending order
                                    .slice(0, 7)
                                    .map(item =>
                                        <article key={item._id} className="mb-5">
                                            <footer className="flex items-center justify-between mb-2">
                                                <div className="flex items-center">
                                                    <p className="inline-flex items-center mr-3 text-sm font-semibold text-gray-900  ">
                                                        <img
                                                            className="w-6 h-6 mr-2 rounded-full"
                                                            src={item?.photo} alt="Michael Gough" />
                                                        {item?.name}
                                                    </p>
                                                    <p className="text-sm text-gray-600  ">
                                                        {/* <time dateTime="2022-02-08" title="February 8th, 2022"> 01/03/2023 4:15 PM</time> */}
                                                        {formatDate(item.date)}
                                                    </p>
                                                </div>

                                            </footer>
                                            <div className="rating rating-sm">
                                                <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                                                <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" checked />
                                                <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                                                <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                                                <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                                            </div>
                                            <p className="mb-2 text-gray-900  ">
                                                {item.review}
                                            </p>
                                        </article>
                                    )
                            }

                        </form>
                    </div>

                    <div className="grid gap-4">
                        <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm  sm:p-6  ">
                            <div className="items-center justify-between pb-4 border-b border-gray-200 sm:flex  ">
                                <div className="w-full mb-4 sm:mb-0">
                                    <h3 className="text-base font-normal text-gray-500  ">Sales by category</h3>
                                    <span className="text-2xl font-bold leading-none text-gray-900 sm:text-3xl  ">Desktop PC</span>
                                    <p className="flex items-center text-base font-normal text-gray-500  ">
                                        <span className="flex items-center mr-1.5 text-sm text-green-500  ">
                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                                <path clipRule="evenodd" fillRule="evenodd" d="M10 17a.75.75 0 01-.75-.75V5.612L5.29 9.77a.75.75 0 01-1.08-1.04l5.25-5.5a.75.75 0 011.08 0l5.25 5.5a.75.75 0 11-1.08 1.04l-3.96-4.158V16.25A.75.75 0 0110 17z"></path>
                                            </svg>
                                            2.5%
                                        </span>
                                        Since last month
                                    </p>
                                </div>
                                {/* <div className="w-full max-w-lg">
                                    <div className="grid items-center grid-cols-2 gap-4">
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                                <svg className="w-5 h-5 text-gray-500  " fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                                    <path d="M5.25 12a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H6a.75.75 0 01-.75-.75V12zM6 13.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V14a.75.75 0 00-.75-.75H6zM7.25 12a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H8a.75.75 0 01-.75-.75V12zM8 13.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V14a.75.75 0 00-.75-.75H8zM9.25 10a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H10a.75.75 0 01-.75-.75V10zM10 11.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V12a.75.75 0 00-.75-.75H10zM9.25 14a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H10a.75.75 0 01-.75-.75V14zM12 9.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V10a.75.75 0 00-.75-.75H12zM11.25 12a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H12a.75.75 0 01-.75-.75V12zM12 13.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V14a.75.75 0 00-.75-.75H12zM13.25 10a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H14a.75.75 0 01-.75-.75V10zM14 11.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V12a.75.75 0 00-.75-.75H14z"></path>
                                                    <path clipRule="evenodd" fillRule="evenodd" d="M5.75 2a.75.75 0 01.75.75V4h7V2.75a.75.75 0 011.5 0V4h.25A2.75 2.75 0 0118 6.75v8.5A2.75 2.75 0 0115.25 18H4.75A2.75 2.75 0 012 15.25v-8.5A2.75 2.75 0 014.75 4H5V2.75A.75.75 0 015.75 2zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75z"></path>
                                                </svg>
                                            </div>
                                            <input name="start" type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2.5          " placeholder="From" />
                                        </div>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                                <svg className="w-5 h-5 text-gray-500  " fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                                    <path d="M5.25 12a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H6a.75.75 0 01-.75-.75V12zM6 13.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V14a.75.75 0 00-.75-.75H6zM7.25 12a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H8a.75.75 0 01-.75-.75V12zM8 13.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V14a.75.75 0 00-.75-.75H8zM9.25 10a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H10a.75.75 0 01-.75-.75V10zM10 11.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V12a.75.75 0 00-.75-.75H10zM9.25 14a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H10a.75.75 0 01-.75-.75V14zM12 9.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V10a.75.75 0 00-.75-.75H12zM11.25 12a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H12a.75.75 0 01-.75-.75V12zM12 13.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V14a.75.75 0 00-.75-.75H12zM13.25 10a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H14a.75.75 0 01-.75-.75V10zM14 11.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V12a.75.75 0 00-.75-.75H14z"></path>
                                                    <path clipRule="evenodd" fillRule="evenodd" d="M5.75 2a.75.75 0 01.75.75V4h7V2.75a.75.75 0 011.5 0V4h.25A2.75 2.75 0 0118 6.75v8.5A2.75 2.75 0 0115.25 18H4.75A2.75 2.75 0 012 15.25v-8.5A2.75 2.75 0 014.75 4H5V2.75A.75.75 0 015.75 2zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75z"></path>
                                                </svg>
                                            </div>
                                            <input name="end" type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2.5          " placeholder="To" />
                                        </div>
                                    </div>
                                </div> */}
                            </div>

                            <div className="w-full" id="sales-by-category"></div>

                            <iframe
                                src="https://analytics.google.com/analytics/web/?pli=1#/p411485116/reports/reportinghub?params=_u..nav%3Dmaui%26_r.14..selmet%3D%5B%22eventCount%22%5D" >

                            </iframe>
                            <div className="flex items-center justify-between pt-3 mt-4 border-t border-gray-200 sm:pt-6  ">
                                <div>
                                    <button className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 rounded-lg hover:text-gray-900    " type="button" data-dropdown-toggle="sales-by-category-dropdown">Last 7 days <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg></button>

                                    <div className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow    " id="sales-by-category-dropdown">
                                        <div className="px-4 py-3" role="none">
                                            <p className="text-sm font-medium text-gray-900 truncate  " role="none">
                                                Sep 16, 2021 - Sep 22, 2021
                                            </p>
                                        </div>
                                        <ul className="py-1" role="none">
                                            <li>
                                                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100     " role="menuitem">Yesterday</a>
                                            </li>
                                            <li>
                                                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100     " role="menuitem">Today</a>
                                            </li>
                                            <li>
                                                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100     " role="menuitem">Last 7 days</a>
                                            </li>
                                            <li>
                                                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100     " role="menuitem">Last 30 days</a>
                                            </li>
                                            <li>
                                                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100     " role="menuitem">Last 90 days</a>
                                            </li>
                                        </ul>
                                        <div className="py-1" role="none">
                                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100     " role="menuitem">Custom...</a>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex-shrink-0">
                                    <a href="#" className="inline-flex items-center p-2 text-xs font-medium uppercase rounded-lg text-primary-700 sm:text-sm hover:bg-gray-100    ">
                                        Sales Report
                                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm  sm:p-6  ">
                            <div className="flex items-center justify-between pb-4 mb-4 border-b border-gray-200  ">
                                <div>
                                    <h3 className="text-base font-normal text-gray-500  ">Traffic by device</h3>
                                    <span className="text-2xl font-bold leading-none text-gray-900 sm:text-3xl  ">Desktop</span>
                                </div>
                                <a href="#" className="inline-flex items-center p-2 text-xs font-medium uppercase rounded-lg text-primary-700 sm:text-sm hover:bg-gray-100    ">
                                    Full report
                                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                                </a>
                            </div>
                            <div id="traffic-by-device"></div>

                            <div className="flex items-center justify-between pt-4 lg:justify-evenly sm:pt-6">
                                <div>
                                    <svg className="w-8 h-8 mb-1 text-gray-500  " fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                        <path clipRule="evenodd" fillRule="evenodd" d="M2 4.25A2.25 2.25 0 014.25 2h11.5A2.25 2.25 0 0118 4.25v8.5A2.25 2.25 0 0115.75 15h-3.105a3.501 3.501 0 001.1 1.677A.75.75 0 0113.26 18H6.74a.75.75 0 01-.484-1.323A3.501 3.501 0 007.355 15H4.25A2.25 2.25 0 012 12.75v-8.5zm1.5 0a.75.75 0 01.75-.75h11.5a.75.75 0 01.75.75v7.5a.75.75 0 01-.75.75H4.25a.75.75 0 01-.75-.75v-7.5z"></path>
                                    </svg>
                                    <h3 className="text-gray-500  ">Desktop</h3>
                                    <h4 className="text-xl font-bold  ">
                                        234k
                                    </h4>
                                    <p className="flex items-center text-sm text-gray-500  ">
                                        <span className="flex items-center mr-1.5 text-sm text-green-500  ">
                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                                <path clipRule="evenodd" fillRule="evenodd" d="M10 17a.75.75 0 01-.75-.75V5.612L5.29 9.77a.75.75 0 01-1.08-1.04l5.25-5.5a.75.75 0 011.08 0l5.25 5.5a.75.75 0 11-1.08 1.04l-3.96-4.158V16.25A.75.75 0 0110 17z"></path>
                                            </svg>
                                            4%
                                        </span>
                                        vs last month
                                    </p>
                                </div>
                                <div>
                                    <svg className="w-8 h-8 mb-1 text-gray-500  " fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                        <path d="M8 16.25a.75.75 0 01.75-.75h2.5a.75.75 0 010 1.5h-2.5a.75.75 0 01-.75-.75z"></path>
                                        <path clipRule="evenodd" fillRule="evenodd" d="M4 4a3 3 0 013-3h6a3 3 0 013 3v12a3 3 0 01-3 3H7a3 3 0 01-3-3V4zm4-1.5v.75c0 .414.336.75.75.75h2.5a.75.75 0 00.75-.75V2.5h1A1.5 1.5 0 0114.5 4v12a1.5 1.5 0 01-1.5 1.5H7A1.5 1.5 0 015.5 16V4A1.5 1.5 0 017 2.5h1z"></path>
                                    </svg>
                                    <h3 className="text-gray-500  ">Phone</h3>
                                    <h4 className="text-xl font-bold  ">
                                        94k
                                    </h4>
                                    <p className="flex items-center text-sm text-gray-500  ">
                                        <span className="flex items-center mr-1.5 text-sm text-red-600  ">
                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                                <path clipRule="evenodd" fillRule="evenodd" d="M10 3a.75.75 0 01.75.75v10.638l3.96-4.158a.75.75 0 111.08 1.04l-5.25 5.5a.75.75 0 01-1.08 0l-5.25-5.5a.75.75 0 111.08-1.04l3.96 4.158V3.75A.75.75 0 0110 3z"></path>
                                            </svg>
                                            1%
                                        </span>
                                        vs last month
                                    </p>
                                </div>
                                <div>
                                    <svg className="w-8 h-8 mb-1 text-gray-500  " fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                        <path clipRule="evenodd" fillRule="evenodd" d="M5 1a3 3 0 00-3 3v12a3 3 0 003 3h10a3 3 0 003-3V4a3 3 0 00-3-3H5zM3.5 4A1.5 1.5 0 015 2.5h10A1.5 1.5 0 0116.5 4v12a1.5 1.5 0 01-1.5 1.5H5A1.5 1.5 0 013.5 16V4zm5.25 11.5a.75.75 0 000 1.5h2.5a.75.75 0 000-1.5h-2.5z"></path>
                                    </svg>
                                    <h3 className="text-gray-500  ">Tablet</h3>
                                    <h4 className="text-xl font-bold  ">
                                        16k
                                    </h4>
                                    <p className="flex items-center text-sm text-gray-500  ">
                                        <span className="flex items-center mr-1.5 text-sm text-red-600  ">
                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                                <path clipRule="evenodd" fillRule="evenodd" d="M10 3a.75.75 0 01.75.75v10.638l3.96-4.158a.75.75 0 111.08 1.04l-5.25 5.5a.75.75 0 01-1.08 0l-5.25-5.5a.75.75 0 111.08-1.04l3.96 4.158V3.75A.75.75 0 0110 3z"></path>
                                            </svg>
                                            0,6%
                                        </span>
                                        vs last month
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm  sm:p-6  ">

                    <div className="items-center justify-between lg:flex">
                        <div className="mb-4 lg:mb-0">
                            <h3 className="mb-2 text-xl font-bold text-gray-900  ">Transactions</h3>
                            <span className="text-base font-normal text-gray-500  ">This is a list of latest transactions</span>
                        </div>
                        <div className="items-center sm:flex">
                            <div className="flex items-center">
                                <button id="dropdownDefault" data-dropdown-toggle="dropdown"
                                    className="mb-4 sm:mb-0 mr-4 inline-flex items-center text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-4 py-2.5          "
                                    type="button">
                                    Filter by status
                                    <svg className="w-4 h-4 ml-2" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                    </svg>
                                </button>

                                <div id="dropdown" className="z-10 hidden w-56 p-3 bg-white rounded-lg shadow  ">
                                    <h6 className="mb-3 text-sm font-medium text-gray-900  ">
                                        Category
                                    </h6>
                                    <ul className="space-y-2 text-sm" aria-labelledby="dropdownDefault">
                                        <li className="flex items-center">
                                            <input id="apple" type="checkbox" value="" className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500  focus:ring-2  " />

                                            <label htmlFor="apple" className="ml-2 text-sm font-medium text-gray-900  ">
                                                Completed (56)
                                            </label>
                                        </li>

                                        <li className="flex items-center">
                                            <input id="fitbit" type="checkbox" value="" checked className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500  focus:ring-2  " />

                                            <label htmlFor="fitbit" className="ml-2 text-sm font-medium text-gray-900  ">
                                                Cancelled (56)
                                            </label>
                                        </li>

                                        <li className="flex items-center">
                                            <input id="dell" type="checkbox" value="" className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500  focus:ring-2  " />

                                            <label htmlFor="dell" className="ml-2 text-sm font-medium text-gray-900  ">
                                                In progress (56)
                                            </label>
                                        </li>

                                        <li className="flex items-center">
                                            <input id="asus" type="checkbox" value="" checked className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500  focus:ring-2  " />

                                            <label htmlFor="asus" className="ml-2 text-sm font-medium text-gray-900  ">
                                                In review (97)
                                            </label>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4">
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                        <svg className="w-5 h-5 text-gray-500  " fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                            <path d="M5.25 12a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H6a.75.75 0 01-.75-.75V12zM6 13.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V14a.75.75 0 00-.75-.75H6zM7.25 12a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H8a.75.75 0 01-.75-.75V12zM8 13.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V14a.75.75 0 00-.75-.75H8zM9.25 10a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H10a.75.75 0 01-.75-.75V10zM10 11.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V12a.75.75 0 00-.75-.75H10zM9.25 14a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H10a.75.75 0 01-.75-.75V14zM12 9.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V10a.75.75 0 00-.75-.75H12zM11.25 12a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H12a.75.75 0 01-.75-.75V12zM12 13.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V14a.75.75 0 00-.75-.75H12zM13.25 10a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H14a.75.75 0 01-.75-.75V10zM14 11.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V12a.75.75 0 00-.75-.75H14z"></path>
                                            <path clipRule="evenodd" fillRule="evenodd" d="M5.75 2a.75.75 0 01.75.75V4h7V2.75a.75.75 0 011.5 0V4h.25A2.75 2.75 0 0118 6.75v8.5A2.75 2.75 0 0115.25 18H4.75A2.75 2.75 0 012 15.25v-8.5A2.75 2.75 0 014.75 4H5V2.75A.75.75 0 015.75 2zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75z"></path>
                                        </svg>
                                    </div>
                                    <input name="start" type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2.5          " placeholder="From" />
                                </div>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                        <svg className="w-5 h-5 text-gray-500  " fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                            <path d="M5.25 12a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H6a.75.75 0 01-.75-.75V12zM6 13.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V14a.75.75 0 00-.75-.75H6zM7.25 12a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H8a.75.75 0 01-.75-.75V12zM8 13.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V14a.75.75 0 00-.75-.75H8zM9.25 10a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H10a.75.75 0 01-.75-.75V10zM10 11.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V12a.75.75 0 00-.75-.75H10zM9.25 14a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H10a.75.75 0 01-.75-.75V14zM12 9.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V10a.75.75 0 00-.75-.75H12zM11.25 12a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H12a.75.75 0 01-.75-.75V12zM12 13.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V14a.75.75 0 00-.75-.75H12zM13.25 10a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H14a.75.75 0 01-.75-.75V10zM14 11.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V12a.75.75 0 00-.75-.75H14z"></path>
                                            <path clipRule="evenodd" fillRule="evenodd" d="M5.75 2a.75.75 0 01.75.75V4h7V2.75a.75.75 0 011.5 0V4h.25A2.75 2.75 0 0118 6.75v8.5A2.75 2.75 0 0115.25 18H4.75A2.75 2.75 0 012 15.25v-8.5A2.75 2.75 0 014.75 4H5V2.75A.75.75 0 015.75 2zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75z"></path>
                                        </svg>
                                    </div>
                                    <input name="end" type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2.5          " placeholder="To" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col mt-6">
                        <div className="overflow-x-auto rounded-lg">
                            <div className="inline-block min-w-full align-middle">
                                <div className="overflow-hidden shadow sm:rounded-lg">
                                    <table className="min-w-full divide-y divide-gray-200  ">

                                        <thead className="bg-gray-50  ">
                                            <tr>
                                                <th scope="col" className="p-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase  ">
                                                    Transaction
                                                </th>
                                                <th scope="col" className="p-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase  ">
                                                    Date & Time
                                                </th>
                                                <th scope="col" className="p-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase  ">
                                                    Amount
                                                </th>
                                                <th scope="col" className="p-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase  ">
                                                    Reference number
                                                </th>
                                                <th scope="col" className="p-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase  ">
                                                    Payment method
                                                </th>
                                                <th scope="col" className="p-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase  ">
                                                    Status
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white  ">
                                            {
                                                orderData &&
                                                orderData.map((item, index) => (
                                                    < tr key={item._id} >

                                                        <td className="p-4 text-sm font-normal text-gray-900 whitespace-nowrap  ">
                                                            Payment from <span className="font-semibold">{item.data.cus_name}</span>
                                                        </td>
                                                        <td className="p-4 text-sm font-normal text-gray-500 whitespace-nowrap  ">
                                                            {item.data.date}
                                                        </td>
                                                        <td className="p-4 text-sm font-semibold text-gray-900 whitespace-nowrap  ">
                                                            {
                                                                item.currency === 'BDT' ? <p>Tk.{item.data.total_amount}</p> : <p>&{item.data.total_amount}</p>
                                                            }
                                                        </td>
                                                        <td className="p-4 text-sm font-normal text-gray-500 whitespace-nowrap  ">
                                                            <p>{item.tranjection_id}</p>
                                                        </td>
                                                        <td className="inline-flex items-center p-4 space-x-2 text-sm font-normal text-gray-500 whitespace-nowrap  ">

                                                            <span>{item.data.shipping_method}</span>
                                                        </td>
                                                        <td className="p-4 whitespace-nowrap">
                                                            {
                                                                item.Confirm === 'Processing' ? <span
                                                                    className="bg-red-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-md     border border-green-100  ">
                                                                    {item.Confirm}
                                                                </span> :  <span
                                                                    className="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-md     border border-green-100  ">
                                                                    {item.Confirm}
                                                                </span> 
                                                        }

                                                        </td>
                                                    </tr>
                                                ))
                                            }



                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-between pt-3 sm:pt-6">
                        <div>
                            <button className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 rounded-lg hover:text-gray-900    " type="button" data-dropdown-toggle="transactions-dropdown">Latest <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg></button>

                            <div className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow    " id="transactions-dropdown">
                                <div className="px-4 py-3" role="none">
                                    <p className="text-sm font-medium text-gray-900 truncate  " role="none">
                                        Sep 16, 2021 - Sep 22, 2021
                                    </p>
                                </div>
                                <ul className="py-1" role="none">
                                    <li>
                                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100     " role="menuitem">Yesterday</a>
                                    </li>
                                    <li>
                                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100     " role="menuitem">Today</a>
                                    </li>
                                    <li>
                                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100     " role="menuitem">Latest</a>
                                    </li>
                                    <li>
                                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100     " role="menuitem">Last 30 days</a>
                                    </li>
                                    <li>
                                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100     " role="menuitem">Last 90 days</a>
                                    </li>
                                </ul>
                                <div className="py-1" role="none">
                                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100     " role="menuitem">Custom...</a>
                                </div>
                            </div>
                        </div>
                        {/* <div className="flex-shrink-0">
                            <a href="#" className="inline-flex items-center p-2 text-xs font-medium uppercase rounded-lg text-primary-700 sm:text-sm hover:bg-gray-100    ">
                                Transactions Report
                                <svg className="w-4 h-4 ml-1 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                            </a>
                        </div> */}
                    </div>
                </div>
            </div>
        </div >
    );
};

export default DashBoardHome;