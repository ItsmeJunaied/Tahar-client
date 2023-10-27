import { useForm } from 'react-hook-form';
import './ManageProducts.css';
import { useContext, useRef } from 'react';
import userImg from '../../../../public/photos/userImageStock.png'
import { AuthContext } from '../../../Provider/AuthProvider';
import { useDownloadExcel } from 'react-export-table-to-excel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDropletSlash, faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
const ManageProducts = () => {
    const { user, loggedUser, AllProducts, doller } = useContext(AuthContext);
    const [searchTerm, setSearchTerm] = useState('');

    // console.log(AllProducts)
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
        const fullName = `${user?.title} ${user?.category} ${user?.Clearance} ${user?.fabrics} ${user?.gender}`;
        return fullName.toLowerCase().includes(searchTerm.toLowerCase());
    });

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
                        <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl  ">All Productss</h1>
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
                            <table className="table table-zebra " ref={tableRef}>
                                <thead>
                                    <tr>
                                        <th>Product Image</th>
                                        <th>Product Title</th>
                                        <th>Price</th>
                                        <th>Sale Price</th>
                                        <th>Category</th>
                                        <th>Clearance</th>
                                        <th>Fabrics</th>
                                        <th>Gender</th>
                                        <th>Description</th>
                                        <th>Colors</th>
                                        <th>Sizes</th>
                                        <th>Discount (%)</th>
                                        <th>Update</th>
                                        <th>Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredUsers ===''? (AllProducts.map(product => (
                                        <tr key={product?._id}>
                                            <td>
                                                <div className="flex items-center space-x-3">
                                                    <div className="avatar">
                                                        <div className="mask mask-squircle w-12 h-12">
                                                            <img src={`https://tahar-server-production.up.railway.app/uploads/${product.images[0]}`} alt="Avatar Tailwind CSS Component" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>{product?.title}</td>
                                            <td>
                                                <p className=" [font-family:'Helvetica_Now_Display-Medium',Helvetica]">
                                                    <div className=' flex flex-col'>
                                                        <span className="">Tk{parseInt(product?.price)}</span>
                                                        <span className="">${(product?.price * 2.5 * doller).toFixed(2)}</span>
                                                    </div>
                                                </p>

                                            </td>
                                            <td>
                                                <p className=" [font-family:'Helvetica_Now_Display-Medium',Helvetica]">
                                                    <div className=' flex flex-col'>
                                                        <span className="">
                                                            Tk.{(((parseInt(product?.price) - (parseInt(product?.price) * (parseInt(product?.sellpercet) / 100)))).toFixed(2)) | 'Tk.0'}
                                                        </span>
                                                        <span className="">
                                                            {product?.price && doller && product?.sellpercet ?
                                                                `$${(((parseInt(product.price) * 2.5 * doller) - ((parseInt(product.price) * 2.5 * doller) * (parseInt(product.sellpercet)) / 100)).toFixed(2))}`
                                                                : '$0'}

                                                        </span>
                                                    </div>
                                                </p>

                                            </td>
                                            <td>{product?.category}</td>
                                            <td>{product?.Clearance}</td>
                                            <td>{product?.fabrics}</td>
                                            <td>{product?.gender}</td>
                                            <td className=''>{product?.description}</td>
                                            <td >
                                                {/* S */}
                                                <div className=' flex flex-row gap-1' >
                                                    <div>
                                                        <p>S</p>
                                                    </div>
                                                    <div className=' flex flex-row gap-1'>
                                                        {product.Scolor.split(',').map((color, index) => (
                                                            <div key={index} className={`${product.Scolor === '' ? '' : 'border border-black rounded-full p-[1px]'}`}>
                                                                <div
                                                                    className={`w-[16px] h-[16px] rounded-[104px] `}
                                                                    style={{ backgroundColor: color }}
                                                                >
                                                                    {product.Scolor === '' ? <FontAwesomeIcon icon={faDropletSlash} style={{ color: "#ffd43b", }} /> : ''}
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                                {/* M */}
                                                <div className=' flex flex-row gap-1' >
                                                    <div>
                                                        <p>M </p>
                                                    </div>
                                                    <div className=' flex flex-row gap-1'>
                                                        {product.Mcolor.split(',').map((color, index) => (
                                                            <div key={index} className={`${product.Mcolor === '' ? '' : 'border border-black rounded-full p-[1px]'}`}>
                                                                <div
                                                                    className={`w-[16px] h-[16px] rounded-[104px] `}
                                                                    style={{ backgroundColor: color }}
                                                                >
                                                                    {product.Mcolor === '' ? <FontAwesomeIcon icon={faDropletSlash} style={{ color: "#ffd43b", }} /> : ''}
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                                {/* L */}
                                                <div className=' flex flex-row gap-1' >
                                                    <div>
                                                        <p>L </p>
                                                    </div>
                                                    <div className=' flex flex-row gap-1'>
                                                        {product.Lcolor.split(',').map((color, index) => (
                                                            <div key={index} className={`${product.Lcolor === '' ? '' : 'border border-black rounded-full p-[1px]'}`}>
                                                                <div
                                                                    className={`w-[16px] h-[16px] rounded-[104px] `}
                                                                    style={{ backgroundColor: color }}
                                                                >
                                                                    {product.Lcolor === '' ? <FontAwesomeIcon icon={faDropletSlash} style={{ color: "#ffd43b", }} /> : ''}
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                                {/* XL */}
                                                <div className=' flex flex-row gap-1' >
                                                    <div>
                                                        <p>XL </p>
                                                    </div>
                                                    <div className=' flex flex-row gap-1'>
                                                        {product.XLcolor.split(',').map((color, index) => (
                                                            <div key={index} className={`${product.XLcolor === '' ? '' : 'border border-black rounded-full p-[1px]'}`}>
                                                                <div
                                                                    className={`w-[16px] h-[16px] rounded-[104px] `}
                                                                    style={{ backgroundColor: color }}
                                                                >
                                                                    {product.XLcolor === '' ? <FontAwesomeIcon icon={faDropletSlash} style={{ color: "#ffd43b", }} /> : ''}
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                                {/* XXL */}
                                                <div className=' flex flex-row gap-1' >
                                                    <div>
                                                        <p>2XL </p>
                                                    </div>
                                                    <div className=' flex flex-row gap-1'>
                                                        {product.XXLcolor.split(',').map((color, index) => (
                                                            <div key={index} className={`${product.XXLcolor === '' ? '' : 'border border-black rounded-full p-[1px]'}`}>
                                                                <div
                                                                    className={`w-[16px] h-[16px] rounded-[104px] `}
                                                                    style={{ backgroundColor: color }}
                                                                >
                                                                    {product.XXLcolor === '' ? <FontAwesomeIcon icon={faDropletSlash} style={{ color: "#ffd43b", }} /> : ''}
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                                {/* 3XL */}
                                                <div className=' flex flex-row gap-1' >
                                                    <div>
                                                        <p>3XL </p>
                                                    </div>
                                                    <div className=' flex flex-row gap-1'>
                                                        {product.XXXLcolor.split(',').map((color, index) => (
                                                            <div key={index} className={`${product.XXXLcolor === '' ? '' : 'border border-black rounded-full p-[1px]'}`}>
                                                                <div
                                                                    className={`w-[16px] h-[16px] rounded-[104px] `}
                                                                    style={{ backgroundColor: color }}
                                                                >
                                                                    {product.XXXLcolor === '' ? <FontAwesomeIcon icon={faDropletSlash} style={{ color: "#ffd43b", }} /> : ''}
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>

                                            </td>



                                            <td>
                                                {(
                                                    <div>
                                                        <span>S: {product?.Squantity}</span>
                                                        <br />
                                                        <span>M: {product?.Mquantity}</span>
                                                        <br />
                                                        <span>L: {product?.Lquantity}</span>
                                                        <br />
                                                        <span>XL: {product?.XLquantity}</span>
                                                        <br />
                                                        <span>2XL: {product?.XXLquantity}</span>
                                                        <br />
                                                        <span>3XL: {product?.XXXLquantity}</span>
                                                        <br />
                                                    </div>
                                                )}
                                            </td>
                                            <td>{product?.sellpercet || 0} %</td>
                                            <td><button><FontAwesomeIcon icon={faPenToSquare} style={{ color: "#ffd43b", }} size='2x' /></button></td>
                                            <td><button><FontAwesomeIcon icon={faTrashCan} style={{ color: "#f50000", }} size='2x'/></button></td>
                                        </tr>
                                    ))):((filteredUsers.map(product => (
                                        <tr key={product?._id}>
                                            <td>
                                                <div className="flex items-center space-x-3">
                                                    <div className="avatar">
                                                        <div className="mask mask-squircle w-12 h-12">
                                                            <img src={`https://tahar-server-production.up.railway.app/uploads/${product.images[0]}`} alt="Avatar Tailwind CSS Component" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>{product?.title}</td>
                                            <td>
                                                <p className=" [font-family:'Helvetica_Now_Display-Medium',Helvetica]">
                                                    <div className=' flex flex-col'>
                                                        <span className="">Tk{parseInt(product?.price)}</span>
                                                        <span className="">${(product?.price * 2.5 * doller).toFixed(2)}</span>
                                                    </div>
                                                </p>

                                            </td>
                                            <td>
                                                <p className=" [font-family:'Helvetica_Now_Display-Medium',Helvetica]">
                                                    <div className=' flex flex-col'>
                                                        <span className="">
                                                            Tk.{(((parseInt(product?.price) - (parseInt(product?.price) * (parseInt(product?.sellpercet) / 100)))).toFixed(2)) | 'Tk.0'}
                                                        </span>
                                                        <span className="">
                                                            {product?.price && doller && product?.sellpercet ?
                                                                `$${(((parseInt(product.price) * 2.5 * doller) - ((parseInt(product.price) * 2.5 * doller) * (parseInt(product.sellpercet)) / 100)).toFixed(2))}`
                                                                : '$0'}

                                                        </span>
                                                    </div>
                                                </p>

                                            </td>
                                            <td>{product?.category}</td>
                                            <td>{product?.Clearance}</td>
                                            <td>{product?.fabrics}</td>
                                            <td>{product?.gender}</td>
                                            <td className=''>{product?.description}</td>
                                            <td >
                                                {/* S */}
                                                <div className=' flex flex-row gap-1' >
                                                    <div>
                                                        <p>S</p>
                                                    </div>
                                                    <div className=' flex flex-row gap-1'>
                                                        {product.Scolor.split(',').map((color, index) => (
                                                            <div key={index} className={`${product.Scolor === '' ? '' : 'border border-black rounded-full p-[1px]'}`}>
                                                                <div
                                                                    className={`w-[16px] h-[16px] rounded-[104px] `}
                                                                    style={{ backgroundColor: color }}
                                                                >
                                                                    {product.Scolor === '' ? <FontAwesomeIcon icon={faDropletSlash} style={{ color: "#ffd43b", }} /> : ''}
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                                {/* M */}
                                                <div className=' flex flex-row gap-1' >
                                                    <div>
                                                        <p>M </p>
                                                    </div>
                                                    <div className=' flex flex-row gap-1'>
                                                        {product.Mcolor.split(',').map((color, index) => (
                                                            <div key={index} className={`${product.Mcolor === '' ? '' : 'border border-black rounded-full p-[1px]'}`}>
                                                                <div
                                                                    className={`w-[16px] h-[16px] rounded-[104px] `}
                                                                    style={{ backgroundColor: color }}
                                                                >
                                                                    {product.Mcolor === '' ? <FontAwesomeIcon icon={faDropletSlash} style={{ color: "#ffd43b", }} /> : ''}
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                                {/* L */}
                                                <div className=' flex flex-row gap-1' >
                                                    <div>
                                                        <p>L </p>
                                                    </div>
                                                    <div className=' flex flex-row gap-1'>
                                                        {product.Lcolor.split(',').map((color, index) => (
                                                            <div key={index} className={`${product.Lcolor === '' ? '' : 'border border-black rounded-full p-[1px]'}`}>
                                                                <div
                                                                    className={`w-[16px] h-[16px] rounded-[104px] `}
                                                                    style={{ backgroundColor: color }}
                                                                >
                                                                    {product.Lcolor === '' ? <FontAwesomeIcon icon={faDropletSlash} style={{ color: "#ffd43b", }} /> : ''}
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                                {/* XL */}
                                                <div className=' flex flex-row gap-1' >
                                                    <div>
                                                        <p>XL </p>
                                                    </div>
                                                    <div className=' flex flex-row gap-1'>
                                                        {product.XLcolor.split(',').map((color, index) => (
                                                            <div key={index} className={`${product.XLcolor === '' ? '' : 'border border-black rounded-full p-[1px]'}`}>
                                                                <div
                                                                    className={`w-[16px] h-[16px] rounded-[104px] `}
                                                                    style={{ backgroundColor: color }}
                                                                >
                                                                    {product.XLcolor === '' ? <FontAwesomeIcon icon={faDropletSlash} style={{ color: "#ffd43b", }} /> : ''}
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                                {/* XXL */}
                                                <div className=' flex flex-row gap-1' >
                                                    <div>
                                                        <p>2XL </p>
                                                    </div>
                                                    <div className=' flex flex-row gap-1'>
                                                        {product.XXLcolor.split(',').map((color, index) => (
                                                            <div key={index} className={`${product.XXLcolor === '' ? '' : 'border border-black rounded-full p-[1px]'}`}>
                                                                <div
                                                                    className={`w-[16px] h-[16px] rounded-[104px] `}
                                                                    style={{ backgroundColor: color }}
                                                                >
                                                                    {product.XXLcolor === '' ? <FontAwesomeIcon icon={faDropletSlash} style={{ color: "#ffd43b", }} /> : ''}
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                                {/* 3XL */}
                                                <div className=' flex flex-row gap-1' >
                                                    <div>
                                                        <p>3XL </p>
                                                    </div>
                                                    <div className=' flex flex-row gap-1'>
                                                        {product.XXXLcolor.split(',').map((color, index) => (
                                                            <div key={index} className={`${product.XXXLcolor === '' ? '' : 'border border-black rounded-full p-[1px]'}`}>
                                                                <div
                                                                    className={`w-[16px] h-[16px] rounded-[104px] `}
                                                                    style={{ backgroundColor: color }}
                                                                >
                                                                    {product.XXXLcolor === '' ? <FontAwesomeIcon icon={faDropletSlash} style={{ color: "#ffd43b", }} /> : ''}
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>

                                            </td>



                                            <td>
                                                {(
                                                    <div>
                                                        <span>S: {product?.Squantity}</span>
                                                        <br />
                                                        <span>M: {product?.Mquantity}</span>
                                                        <br />
                                                        <span>L: {product?.Lquantity}</span>
                                                        <br />
                                                        <span>XL: {product?.XLquantity}</span>
                                                        <br />
                                                        <span>2XL: {product?.XXLquantity}</span>
                                                        <br />
                                                        <span>3XL: {product?.XXXLquantity}</span>
                                                        <br />
                                                    </div>
                                                )}
                                            </td>
                                            <td>{product?.sellpercet || 0} %</td>
                                            <td><button><FontAwesomeIcon icon={faPenToSquare} style={{ color: "#ffd43b", }} size='2x' /></button></td>
                                            <td><button><FontAwesomeIcon icon={faTrashCan} style={{ color: "#f50000", }} size='2x'/></button></td>
                                        </tr>
                                    ))))}
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

export default ManageProducts;