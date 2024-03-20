import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../../Provider/AuthProvider';
import { useState } from 'react';
import { useRef } from 'react';
import { useDownloadExcel } from 'react-export-table-to-excel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDropletSlash, faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';

const ManageOrders = () => {
    const { AllProducts, order, setLoggedUser, setOrder, CODorder, setCODorder } = useContext(AuthContext);

    // console.log(order)
    // const itemname = order.localCartData?.map(item => item.ProductName);
    // console?.map(itemname)
    const [searchTerm, setSearchTerm] = useState('');

    const tableRef = useRef(null);

    const { onDownload } = useDownloadExcel({
        currentTableRef: tableRef.current,
        fileName: 'Tahar Users',
        sheet: 'Tahar Users'
    });

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredUsers = AllProducts.filter(user => {
        const fullName = `${user?.firstName} ${user?.lastName} ${user?.name} ${user?.email} ${user?.role}`;
        return fullName.toLowerCase().includes(searchTerm.toLowerCase());
    });


    const HandleStatus = (id, currentRole) => {
        console.log(id)
        console.log(currentRole)

        fetch(`https://taharz.onrender.com/orders/${id}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Confirm:
                    currentRole === 'Processing' ? 'Delivered' :
                        currentRole === 'Delivered' ? 'Cancel' :
                            currentRole === 'Cancel' ? 'Processing' :
                                'Unknown'
            })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.success) {
                    fetch('https://taharz.onrender.com/orders')
                        .then(res => res.json())
                        .then(updatedData => setLoggedUser(updatedData))
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    return (
        <div className=' container mx-auto'>
            <div className="p-4 bg-white block sm:flex items-center justify-between border-b border-gray-200 lg:mt-1.5    ">
                <div className="w-full mb-1">
                    <div className="mb-4">
                        <nav className="flex mb-5" aria-label="Breadcrumb">
                            <ol className="inline-flex items-center space-x-1 text-sm font-medium md:space-x-2">
                                <li className="inline-flex items-center">
                                    <a href="#" className="inline-flex items-center text-gray-700 hover:text-primary-600    ">
                                        <svg className="w-5 h-5 mr-2.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path></svg>
                                        Home
                                    </a>
                                </li>
                                <li>
                                    <div className="flex items-center">
                                        <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
                                        <a href="#" className="ml-1 text-gray-700 hover:text-primary-600 md:ml-2    ">Users</a>
                                    </div>
                                </li>
                                <li>
                                    <div className="flex items-center">
                                        <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
                                        <span className="ml-1 text-gray-400 md:ml-2  " aria-current="page">List</span>
                                    </div>
                                </li>
                            </ol>
                        </nav>
                        <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl  ">All order</h1>
                    </div>
                    <div className="sm:flex">
                        <div className="items-center hidden mb-3 sm:flex sm:divide-x sm:divide-gray-100 sm:mb-0  ">
                            <form className="lg:pr-3" action="#" method="GET">
                                <label htmlFor="users-search" className="sr-only">Search</label>
                                <div className="relative mt-1 lg:w-64 xl:w-96">
                                    <input
                                        type="text"
                                        name="email"
                                        id="users-search"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                                        placeholder="Search for users"
                                        value={searchTerm}
                                        onChange={handleSearchChange}
                                    />
                                </div>
                            </form>
                            <div className="flex pl-0 mt-3 space-x-1 sm:pl-2 sm:mt-0">
                                <a href="#" className="inline-flex justify-center p-1 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100    ">
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd"></path></svg>
                                </a>
                                <a href="#" className="inline-flex justify-center p-1 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100    ">
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"></path></svg>
                                </a>
                                <a href="#" className="inline-flex justify-center p-1 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100    ">
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path></svg>
                                </a>
                                <a href="#" className="inline-flex justify-center p-1 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100    ">
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"></path></svg>
                                </a>
                            </div>
                        </div>
                        <div className="flex items-center ml-auto space-x-2 sm:space-x-3">
                            <button disabled type="button" data-modal-toggle="add-user-modal" className="inline-flex items-center justify-center w-1/2 px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 sm:w-auto d ">
                                <svg className="w-5 h-5 mr-2 -ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path></svg>
                                Add user
                            </button>
                            <button onClick={onDownload} className="inline-flex items-center justify-center w-1/2 px-3 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-primary-300 sm:w-auto             ">
                                <svg className="w-5 h-5 mr-2 -ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z" clipRule="evenodd"></path></svg>
                                Export
                            </button>
                        </div>
                    </div>
                </div>
            </div>



            <div className="flex flex-col">
                <div className="overflow-x-auto">
                    <div className="inline-block min-w-full align-middle">
                        <div className="overflow-x-auto">
                            <table className="table table-xs table-zebra" ref={tableRef}>
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>Customer Name</th>
                                        <th>Customer Email</th>
                                        <th>Product Name</th>
                                        <th>Product Size</th>
                                        <th>Product Color</th>
                                        <th>Product Quantity</th>
                                        <th>Product ID</th>
                                        <th>Customer Address</th>
                                        <th>Customer Country</th>
                                        <th>Customer Number</th>
                                        <th>Price</th>
                                        <th>Currency</th>
                                        <th>Payment Status</th>
                                        <th>Order Status</th>
                                        <th>Action</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {order && order?.map((item, index) => (
                                        <tr key={index}>
                                            <th>{index + 1}</th>
                                            <td>
                                                {item.localCartData?.map((detail, subIndex) => (
                                                    <div key={subIndex}>{detail?.customerName}</div>
                                                ))}
                                            </td>
                                            <td>
                                                {item.localCartData?.map((detail, subIndex) => (
                                                    <div key={subIndex}>{detail?.customerEmail}</div>
                                                ))}
                                            </td>

                                            <td>
                                                {item.localCartData?.map((detail, subIndex) => (
                                                    <div key={subIndex}>{detail?.ProductName}</div>
                                                ))}
                                            </td>



                                            <td>
                                                {item.localCartData?.map((detail, subIndex) => (
                                                    <div key={subIndex}>{detail?.
                                                        ProductSize}</div>
                                                ))}
                                            </td>

                                            <td>
                                                {item.localCartData?.map((detail, subIndex) => (
                                                    <div key={subIndex}>{detail?.
                                                        selectedColor}</div>
                                                ))}
                                            </td>

                                            <td>
                                                {item.localCartData?.map((detail, subIndex) => (
                                                    <div key={subIndex}>{detail?.
                                                        ProductQuantity}</div>
                                                ))}
                                            </td>

                                            <td>
                                                {item.localCartData?.map((detail, subIndex) => (
                                                    <div key={subIndex}>{detail?.
                                                        ProductId}</div>
                                                ))}
                                            </td>

                                            <td>
                                                {item.data.cus_add1}
                                            </td>
                                            <td>
                                                {item.data.cus_country}
                                            </td>
                                            <td>
                                                {item.data.cus_phone}
                                            </td>
                                            <td>
                                                {item.data.total_amount}
                                            </td>
                                            <td>
                                                {item.data.currency}
                                            </td>
                                            <td>
                                                {
                                                    item.paidStatus === true ? (
                                                        <p>Paid</p>
                                                    ) : (<p>Unpaid</p>)
                                                }

                                            </td>
                                            <td>
                                                {item.Confirm}
                                            </td>

                                            <td>
                                                <button onClick={()=>HandleStatus(item._id , item.Confirm)} className=' btn btn-sm bg-teal-500'>Change</button>
                                            </td>

                                        </tr>
                                    ))}
                                </tbody>


                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div className="sticky bottom-0 right-0 items-center w-full p-4 bg-white border-t border-gray-200 sm:flex sm:justify-between    ">
                <div className="flex items-center mb-4 sm:mb-0">
                    <a href="#" className="inline-flex justify-center p-1 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100    ">
                        <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                    </a>
                    <a href="#" className="inline-flex justify-center p-1 mr-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100    ">
                        <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
                    </a>
                    <span className="text-sm font-normal text-gray-500  ">Showing <span className="font-semibold text-gray-900  ">1-20</span> of <span className="font-semibold text-gray-900  ">2290</span></span>
                </div>
                <div className="flex items-center space-x-3">
                    <a href="#" className="inline-flex items-center justify-center flex-1 px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 d ">
                        <svg className="w-5 h-5 mr-1 -ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                        Previous
                    </a>
                    <a href="#" className="inline-flex items-center justify-center flex-1 px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 d ">
                        Next
                        <svg className="w-5 h-5 ml-1 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
                    </a>
                </div>
            </div>




        </div>
    );
};

export default ManageOrders;