import React, { useContext, useEffect, useRef, useState } from 'react';
import { AuthContext } from '../../../Provider/AuthProvider';
import './Myorder.css';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import ReactToPrint, { useReactToPrint } from 'react-to-print';
import PDFInvoice from '../../../Shared/PDFInvoice/PDFInvoice';
import domtoimage from 'dom-to-image';

import noOrder from '../../../../public/photos/noOrder.png';
import logo from '../../../../public/photos/tahar-logo.png';
const MyOrder = () => {
    const { user, loading, setLoading } = useContext(AuthContext);
    const [orderData, setOrderData] = useState([]);
    const [showInvoice, setShowInvoice] = useState(false);
    useEffect(() => {
        setLoading(true);
        fetch('https://tahar-server-production.up.railway.app/orders')
            .then(res => res.json())
            .then(data => {
                setOrderData(data);
                setLoading(false);
            });
    }, [setLoading]);



    const getUserData = orderData.filter(product => product.data.cus_email === user?.email);


    const ref = useRef();




    return (
        <div className=' container mx-auto my-[100px] '>
            <div className="overflow-x-auto">
                {loading ? (
                    <div className="flex justify-center items-center h-screen">
                        <div className="relative w-24 h-24 animate-spin rounded-full bg-gradient-to-r from-purple-400 via-blue-500 to-red-400 ">
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-white rounded-full border-2 border-white"></div>
                        </div>
                    </div>
                ) : (
                    <table className="table">
                        <tbody>
                            {getUserData && getUserData.length > 0 ? (
                                getUserData.map(product => (
                                    <div className="main-container bg-white shadow-xl shadow-slate-300 mb-8" key={product._id}>
                                        <table className="w-full">
                                            <thead>
                                                <tr>
                                                    <th className=" [font-family:'Helvetica_Now_Display-Medium',Helvetica] text-[17px] ">Product Image</th>
                                                    <th className=" [font-family:'Helvetica_Now_Display-Medium',Helvetica] text-[17px] ">Product Name</th>
                                                    <th className=" [font-family:'Helvetica_Now_Display-Medium',Helvetica] text-[17px] ">Product Size</th>
                                                    <th className=" [font-family:'Helvetica_Now_Display-Medium',Helvetica] text-[17px] ">Product Price</th>
                                                    <th className=" [font-family:'Helvetica_Now_Display-Medium',Helvetica] text-[17px] ">Product Quantity</th>
                                                    <th className=" [font-family:'Helvetica_Now_Display-Medium',Helvetica] text-[17px] ">Product Price</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {product.localCartData && product.localCartData.map(detail => (
                                                    <tr key={detail._id}>
                                                        <td className='text-start'>
                                                            <div className="mask mask-squircle w-12 h-12">
                                                                <img src={`https://tahar-server-production.up.railway.app/uploads/${detail.ProductImage}`} alt="Product Image" />
                                                            </div>
                                                        </td>
                                                        <td className='text-start '>
                                                            <p className=" [font-family:'Helvetica_Now_Display-Medium',Helvetica] text-[17px] ">{detail.ProductName}</p>
                                                        </td>
                                                        <td className='text-start '>
                                                            <p className=" [font-family:'Helvetica_Now_Display-Medium',Helvetica] text-[17px] ">{detail.ProductSize}</p>
                                                        </td>
                                                        {
                                                            product.data.currency === 'BDT' ? (
                                                                detail.ProductSale == "Sale" ? (
                                                                    <td className='text-start '>
                                                                        <p className=" [font-family:'Helvetica_Now_Display-Medium',Helvetica] text-[17px] ">Tk. {detail.salePriceInBDT}</p>
                                                                    </td>
                                                                ) : (
                                                                    <td className='text-start '>
                                                                        <p className=" [font-family:'Helvetica_Now_Display-Medium',Helvetica] text-[17px] ">Tk. {detail.priceInBDT}</p>
                                                                    </td>
                                                                )

                                                            ) : (
                                                                detail.ProductSale == "Sale" ? (
                                                                    <td className='text-start '>
                                                                        <p className=" [font-family:'Helvetica_Now_Display-Medium',Helvetica] text-[17px] ">$ {detail.salePriceInUSD}</p>
                                                                    </td>
                                                                ) : (
                                                                    <td className='text-start '>
                                                                        <p className=" [font-family:'Helvetica_Now_Display-Medium',Helvetica] text-[17px] ">$ {detail.priceInUSD}</p>
                                                                    </td>
                                                                )

                                                            )
                                                        }

                                                        <td className='text-start '>
                                                            <p className=" [font-family:'Helvetica_Now_Display-Medium',Helvetica] text-[17px] ">{detail.ProductQuantity}</p>
                                                        </td>

                                                        {
                                                            product.data.currency === 'BDT' ? (
                                                                detail.ProductSale == "Sale" ? (
                                                                    <td className='text-start '>
                                                                        <p className=" [font-family:'Helvetica_Now_Display-Medium',Helvetica] text-[17px] ">Tk. {detail.salePriceInBDT * detail.ProductQuantity}</p>
                                                                    </td>
                                                                ) : (
                                                                    <td className='text-start '>
                                                                        <p className=" [font-family:'Helvetica_Now_Display-Medium',Helvetica] text-[17px] ">Tk. {detail.priceInBDT * detail.ProductQuantity}</p>
                                                                    </td>
                                                                )

                                                            ) : (
                                                                detail.ProductSale == "Sale" ? (
                                                                    <td className='text-start '>
                                                                        <p className=" [font-family:'Helvetica_Now_Display-Medium',Helvetica] text-[17px] ">$ {detail.salePriceInUSD * detail.ProductQuantity}</p>
                                                                    </td>
                                                                ) : (
                                                                    <td className='text-start '>
                                                                        <p className=" [font-family:'Helvetica_Now_Display-Medium',Helvetica] text-[17px] ">$ {detail.priceInUSD * detail.ProductQuantity}</p>
                                                                    </td>
                                                                )

                                                            )
                                                        }
                                                        {/* <td className='text-start '>
                                                            <p className=" [font-family:'Helvetica_Now_Display-Medium',Helvetica] text-[17px] ">Tk. {detail.ProductPrice * detail.ProductQuantity}</p>
                                                        </td> */}
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                        <div className="order-details">
                                            <table>
                                                <tbody>
                                                    <tr>
                                                        <td className=" [font-family:'Helvetica_Now_Display-Medium',Helvetica] text-[17px] ">Transaction ID:</td>
                                                        <td className=" [font-family:'Helvetica_Now_Display-Medium',Helvetica] text-[17px] ">{product.data.tran_id}</td>
                                                    </tr>
                                                    <tr>
                                                        <td className=" [font-family:'Helvetica_Now_Display-Medium',Helvetica] text-[17px] ">Address:</td>
                                                        <td className=" [font-family:'Helvetica_Now_Display-Medium',Helvetica] text-[17px] ">{product.data.cus_add1}</td>
                                                    </tr>
                                                    <tr>
                                                        <td className=" [font-family:'Helvetica_Now_Display-Medium',Helvetica] text-[17px] ">Total:</td>
                                                        <td className=" [font-family:'Helvetica_Now_Display-Medium',Helvetica] text-[17px] ">{product.data.total_amount}</td>
                                                    </tr>

                                                    <tr>
                                                        <td className=" [font-family:'Helvetica_Now_Display-Medium',Helvetica] text-[17px] ">Payment Status:</td>
                                                        {
                                                            product.paidStatus ? (<td className=" [font-family:'Helvetica_Now_Display-Medium',Helvetica] text-[17px] text-green-400">Paid</td>) : <td className=" [font-family:'Helvetica_Now_Display-Medium',Helvetica] text-[17px] text-red-400">Due</td>
                                                        }

                                                    </tr>
                                                    {/* Invoice */}
                                                    <tr>
                                                        <td className=" [font-family:'Helvetica_Now_Display-Medium',Helvetica] text-[17px] ">Invoice</td>
                                                        <td >
                                                            <div id="invoice-content" className="invoice-box"    >
                                                                <section>
                                                                    <div className="invoice" ref={ref}>
                                                                        <div className="top_line"></div>
                                                                        <div className="header">
                                                                            <div className="i_row">
                                                                                <div className="i_logo">
                                                                                    <img className=' w-16 h-16' src={logo} alt="" />
                                                                                </div>
                                                                                <div className="i_title">
                                                                                    <h2>INVOICE</h2>
                                                                                    <p className="p_title text_right">
                                                                                        April 20, 2023
                                                                                    </p>
                                                                                </div>
                                                                            </div>
                                                                            <div className="i_row">
                                                                                <div className="i_number">
                                                                                    <p className="p_title">Tranjection ID: {product.data.tran_id}</p>
                                                                                </div>
                                                                                <div className="i_address text_right">
                                                                                    <p>TO</p>
                                                                                    <p className="p_title">
                                                                                        {product.data.cus_name} <br />
                                                                                        <span>{product.data.cus_add1}</span><br />
                                                                                        <span>{product.data.ship_country}</span>
                                                                                    </p>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="body">
                                                                            <div className="i_table">
                                                                                <div className="i_table_head">
                                                                                    <div className="i_row">
                                                                                        <div className="i_col w_55">
                                                                                            <p className="p_title">Product</p>
                                                                                        </div>
                                                                                        <div className="i_col w_55">
                                                                                            <p className="p_title">Size</p>
                                                                                        </div>
                                                                                        <div className="i_col w_15">
                                                                                            <p className="p_title">Qunatity</p>
                                                                                        </div>

                                                                                        <div className="i_col w_15">
                                                                                            <p className="p_title">PRICE</p>
                                                                                        </div>
                                                                                        <div className="i_col w_15">
                                                                                            <p className="p_title">TOTAL</p>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                {product.localCartData && product.localCartData.map(detail => (
                                                                                    <div key={detail._id} className="i_table_body">
                                                                                        <div className="i_row">
                                                                                            <div className="i_col w_15">
                                                                                                <p>{detail.ProductName}</p>
                                                                                            </div>
                                                                                            <div className="i_col w_55">
                                                                                                <p>{detail.ProductSize}</p>
                                                                                            </div>
                                                                                            <div className="i_col w_15">
                                                                                                <p>{detail.ProductQuantity}</p>
                                                                                            </div>
                                                                                            <div className="i_col w_15">
                                                                                                <p>
                                                                                                    {
                                                                                                        product.data.currency === 'BDT' ? (
                                                                                                            detail.ProductSale == "Sale" ? (
                                                                                                                <td className='text-start '>
                                                                                                                    <p className=" [font-family:'Helvetica_Now_Display-Medium',Helvetica] text-[17px] ">Tk. {detail.salePriceInBDT}</p>
                                                                                                                </td>
                                                                                                            ) : (
                                                                                                                <td className='text-start '>
                                                                                                                    <p className=" [font-family:'Helvetica_Now_Display-Medium',Helvetica] text-[17px] ">Tk. {detail.priceInBDT}</p>
                                                                                                                </td>
                                                                                                            )

                                                                                                        ) : (
                                                                                                            detail.ProductSale == "Sale" ? (
                                                                                                                <td className='text-start '>
                                                                                                                    <p className=" [font-family:'Helvetica_Now_Display-Medium',Helvetica] text-[17px] ">$ {detail.salePriceInUSD}</p>
                                                                                                                </td>
                                                                                                            ) : (
                                                                                                                <td className='text-start '>
                                                                                                                    <p className=" [font-family:'Helvetica_Now_Display-Medium',Helvetica] text-[17px] ">$ {detail.priceInUSD}</p>
                                                                                                                </td>
                                                                                                            )

                                                                                                        )
                                                                                                    }
                                                                                                </p>
                                                                                            </div>
                                                                                            <div className="i_col w_15">
                                                                                                <p>{
                                                                                                    product.data.currency === 'BDT' ? (
                                                                                                        detail.ProductSale == "Sale" ? (
                                                                                                            <td className='text-start '>
                                                                                                                <p className=" [font-family:'Helvetica_Now_Display-Medium',Helvetica] text-[17px] ">Tk. {detail.salePriceInBDT * detail.ProductQuantity}</p>
                                                                                                            </td>
                                                                                                        ) : (
                                                                                                            <td className='text-start '>
                                                                                                                <p className=" [font-family:'Helvetica_Now_Display-Medium',Helvetica] text-[17px] ">Tk. {detail.priceInBDT * detail.ProductQuantity}</p>
                                                                                                            </td>
                                                                                                        )

                                                                                                    ) : (
                                                                                                        detail.ProductSale == "Sale" ? (
                                                                                                            <td className='text-start '>
                                                                                                                <p className=" [font-family:'Helvetica_Now_Display-Medium',Helvetica] text-[17px] ">$ {detail.salePriceInUSD * detail.ProductQuantity}</p>
                                                                                                            </td>
                                                                                                        ) : (
                                                                                                            <td className='text-start '>
                                                                                                                <p className=" [font-family:'Helvetica_Now_Display-Medium',Helvetica] text-[17px] ">$ {detail.priceInUSD * detail.ProductQuantity}</p>
                                                                                                            </td>
                                                                                                        )

                                                                                                    )
                                                                                                }</p>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                ))}

                                                                                <div className=' divider'></div>
                                                                                <div className="i_table_foot">
                                                                                    <div className="i_row">
                                                                                        <div className="i_col w_15">
                                                                                            <p></p>
                                                                                        </div>
                                                                                        <div className="i_col w_55">
                                                                                            <p></p>
                                                                                        </div>
                                                                                        <div className="i_col w_15">
                                                                                            <p>SubTotal</p>
                                                                                            {/* <p>Tax(5%)</p> */}
                                                                                        </div>
                                                                                        <div className="i_col w_15">
                                                                                            <p>{product.data.total_amount}</p>
                                                                                            {/* <p>$15.00</p> */}
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="i_row grand_total_wrap">
                                                                                        <div className="i_col w_50">
                                                                                        </div>
                                                                                        <div className="i_col w_50 grand_total">
                                                                                            <p><span>GRAND TOTAL:</span>
                                                                                                <span>{product.data.total_amount}</span>
                                                                                            </p>
                                                                                            <p><span>Payment Status</span>
                                                                                                <span>
                                                                                                    {
                                                                                                        product.paidStatus ? (<td className=" [font-family:'Helvetica_Now_Display-Medium',Helvetica] text-[17px] text-green-400">Paid</td>) : <td className=" [font-family:'Helvetica_Now_Display-Medium',Helvetica] text-[17px] text-red-400">Due</td>
                                                                                                    }
                                                                                                </span>
                                                                                            </p>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="footer">
                                                                            <div className="i_row">
                                                                                <div className="i_col w_50">
                                                                                    <p className="p_title">Payment Method</p>
                                                                                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cumque, dicta distinctio! Laudantium voluptatibus est nemo.</p>
                                                                                </div>
                                                                                <div className="i_col w_50 text_right">
                                                                                    <p className="p_title">Terms and Conditions</p>
                                                                                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cumque, dicta distinctio! Laudantium voluptatibus est nemo.</p>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="bottom_line"></div>
                                                                    </div>
                                                                </section>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <ReactToPrint trigger={() => (
                                                                <button
                                                                    className="bg-[#DBC896] btn btn-sm hover:bg-[#DBC896] mt-2 [font-family:'Helvetica_Now_Display-Medium',Helvetica] text-[17px] "
                                                                >
                                                                    Print
                                                                </button>
                                                            )} content={() => ref.current} />

                                                        </td>

                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                ))) : (
                                <tr>
                                    <td colSpan="6" className="text-center">
                                        <div className="flex flex-col items-center justify-center">
                                            <div className="mb-4">
                                                <img src={noOrder} alt="No Order" />
                                            </div>
                                            <p className="text-3xl uppercase font-bold [font-family:'Helvetica_Now_Display-Medium',Helvetica] text-[#929292]">
                                                No Order placed yet
                                            </p>
                                        </div>
                                    </td>
                                </tr>

                            )}

                        </tbody>

                    </table>
                )}

            </div>
        </div>
    );
};

export default MyOrder;