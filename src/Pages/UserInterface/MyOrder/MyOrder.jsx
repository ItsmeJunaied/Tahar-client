import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../Provider/AuthProvider';
import jsPDF from 'jspdf';

const MyOrder = () => {
    const { user } = useContext(AuthContext);
    const [orderData, setOrderData] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/orders')
            .then(res => res.json())
            .then(data => setOrderData(data))
    }, [])

    const getUserData = orderData.filter(product => product.data.cus_email === user?.email);
    // const uniqueTransactionIds = [...new Set(getUserData.map(product => product.data.tran_id))];

    const createInvoiceData = (product) => {
        const doc = new jsPDF();

        // Assuming your invoice content is HTML, you can add it to the PDF using fromHTML
        doc.fromHTML(`
          <html>
            <head>
              <title>Invoice</title>
            </head>
            <body>
              <h1>Invoice</h1>
              <p>Product Name: ${product.data.tran_id}</p>
              <p>Product Price: ${product.data.total_amount}</p>
              <!-- Add more invoice details here -->
            </body>
          </html>
        `, 10, 10); // Adjust the position as needed

        return doc.output('datauristring'); // Returns the PDF as a data URI
    };

    const handleDownloadInvoice = (product) => {
        const pdfDataUri = createInvoiceData(product);
        window.open(pdfDataUri);
    };
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
                                        {product.OrderDetails && product.OrderDetails.map(detail => (
                                            <tr key={detail._id}>
                                                <td className='text-start'>
                                                    <div className="mask mask-squircle w-12 h-12">
                                                        <img src={`http://localhost:5000/uploads/${detail.ProductImage}`} alt="Product Image" />
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
                                                    <p className=" [font-family:'Helvetica_Now_Display-Medium',Helvetica] text-[17px] ">Tk. {detail.ProductPrice}</p>
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
                                                <button className="bg-[#DBC896] btn btn-sm hover:bg-[#DBC896]  mt-2 [font-family:'Helvetica_Now_Display-Medium',Helvetica] text-[17px] " onClick={() => handleDownloadInvoice(product)}>Download</button>
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