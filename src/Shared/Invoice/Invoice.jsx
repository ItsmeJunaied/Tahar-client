import React, { useEffect, useRef } from 'react';
import './Invoice.css';
import jsPDF from 'jspdf';

const Invoice = () => {

    return (
        <div >
            <div >
                <div id="invoice-content" className="invoice-box">
                    <table>
                        <tbody>
                            <tr className="top">
                                <td colSpan="2">
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td className="title">
                                                    <img src="../../../public/photos/tahar-logo.png" alt="Company logo" style={{ width: '100%', maxWidth: '300px' }} />
                                                </td>

                                                <td>
                                                    Invoice #: 123<br />
                                                    Created: January 1, 2023<br />
                                                    Due: February 1, 2023
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>

                            <tr className="information">
                                <td colSpan="2">
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    Sparksuite, Inc.<br />
                                                    12345 Sunny Road<br />
                                                    Sunnyville, TX 12345
                                                </td>

                                                <td>
                                                    Acme Corp.<br />
                                                    John Doe<br />
                                                    john@example.com
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>

                            <tr className="heading">
                                <td>Payment Method</td>
                                <td>Check #</td>
                            </tr>

                            <tr className="details">
                                <td>Check</td>
                                <td>1000</td>
                            </tr>

                            <tr className="heading">
                                <td>Item</td>
                                <td>Price</td>
                            </tr>

                            <tr className="item">
                                <td>Website design</td>
                                <td>$300.00</td>
                            </tr>

                            <tr className="item">
                                <td>Hosting (3 months)</td>
                                <td>$75.00</td>
                            </tr>

                            <tr className="item last">
                                <td>Domain name (1 year)</td>
                                <td>$10.00</td>
                            </tr>

                            <tr className="total">
                                <td></td>
                                <td>Total: $385.00</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Invoice;