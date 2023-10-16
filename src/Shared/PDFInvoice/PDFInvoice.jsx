import React from 'react';
import './PDFInvoice.css';
import jsPDF from 'jspdf';
const PDFInvoice = ({ product, setSelectedOrder }) => {

    return (
        <div id="invoice-content" className="invoice-box"    >
            <section>
                <div className="invoice" >
                    <div className="top_line"></div>
                    <div className="header">
                        <div className="i_row">
                            <div className="i_logo">
                                <img className=' w-16 h-16' src='' alt="" />
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

            <button
                onClick={() => setSelectedOrder(product)}
                className="bg-[#DBC896] btn btn-sm hover:bg-[#DBC896] mt-2 [font-family:'Helvetica_Now_Display-Medium',Helvetica] text-[17px]"
            >
                View Invoice
            </button>
        </div>
    );
};

export default PDFInvoice;