import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../Provider/AuthProvider';


const MyOrder = () => {
    const { user } = useContext(AuthContext);
    const [orderData, setOrderData] = useState([]);
    const [invoice, setInvoice] = useState([]);
    const [showInvoice, setShowInvoice] = useState(false);
    useEffect(() => {
        fetch('https://tahar-server.vercel.app/orders')
            .then(res => res.json())
            .then(data => setOrderData(data))
    }, [])

    useEffect(() => {
        fetch('https://tahar-server.vercel.app/invoices')
            .then(res => res.json())
            .then(data => setShowInvoice(data))
    }, [])

    const getUserData = orderData.filter(product => product.data.cus_email === user?.email);

    // console.log(getUserData)
    const handleInvoiceDownload = async (tranId) => {
        try {
            const response = await fetch(`https://tahar-server.vercel.app/downloadInvoice/${tranId}`);

            if (!response.ok) {
                throw new Error('Error fetching invoice');
            }

            const blob = await response.blob();
            const url = window.URL.createObjectURL(new Blob([blob]));
            const a = document.createElement('a');
            a.href = url;
            a.download = `invoice_${tranId}.pdf`;
            document.body.appendChild(a);
            a.click();
            a.remove();
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className=' container mx-auto my-[100px] '>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}

                    <tbody>
                        {getUserData && getUserData.map(product => (
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
                                                        <img src={`https://tahar-server.vercel.app/uploads/${detail.ProductImage}`} alt="Product Image" />
                                                    </div>
                                                </td>
                                                <td className='text-start '>
                                                    <p className=" [font-family:'Helvetica_Now_Display-Medium',Helvetica] text-[17px] ">{detail.ProductName}</p>
                                                </td>
                                                <td className='text-start '>
                                                    <p className=" [font-family:'Helvetica_Now_Display-Medium',Helvetica] text-[17px] ">{detail.ProductSize}</p>
                                                </td>
                                                <td className='text-start '>
                                                    <p className=" [font-family:'Helvetica_Now_Display-Medium',Helvetica] text-[17px] ">{detail.ProductPrice}</p>
                                                </td>
                                                <td className='text-start '>
                                                    <p className=" [font-family:'Helvetica_Now_Display-Medium',Helvetica] text-[17px] ">{detail.ProductQuantity}</p>
                                                </td>
                                                <td className='text-start '>
                                                    <p className=" [font-family:'Helvetica_Now_Display-Medium',Helvetica] text-[17px] ">Tk. {detail.ProductPrice * detail.ProductQuantity}</p>
                                                </td>
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
                                                <td className=" [font-family:'Helvetica_Now_Display-Medium',Helvetica] text-[17px] ">{product.data.total_amount
                                                }</td>
                                            </tr>

                                            <tr>
                                                <td className=" [font-family:'Helvetica_Now_Display-Medium',Helvetica] text-[17px] ">Payment Status:</td>
                                                <td className=" [font-family:'Helvetica_Now_Display-Medium',Helvetica] text-[17px] text-green-400">Paid</td>
                                            </tr>
                                            <tr>
                                                <td className=" [font-family:'Helvetica_Now_Display-Medium',Helvetica] text-[17px] ">Invoice</td>
                                                <button onClick={() => handleInvoiceDownload(product.data.tran_id)} className="bg-[#DBC896] btn btn-sm hover:bg-[#DBC896]  mt-2 [font-family:'Helvetica_Now_Display-Medium',Helvetica] text-[17px] ">Download</button>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        ))}

                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default MyOrder;