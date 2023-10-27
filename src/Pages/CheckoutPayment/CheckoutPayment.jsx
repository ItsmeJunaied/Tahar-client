import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Provider/AuthProvider';
import Swal from 'sweetalert2';
import { updateCurrentUser } from 'firebase/auth';
const CheckoutPayment = () => {
    const { user, localCartData, setLocalCartData, doller, selectedCurrencyValue, contactInfo, setContactInfo, totals } = useContext(AuthContext);
    const [selectedOption, setSelectedOption] = useState('');
    const [showConfirmOrderButton, setShowConfirmOrderButton] = useState(false);
    const [showPayNowButton, setShowPayNowButton] = useState(false);



    useEffect(() => {
        // Get the current cart data from local storage
        const savedContactInfo = JSON.parse(localStorage.getItem('contactInfo'));

        // Update the state with the saved data, if available
        if (savedContactInfo) {
            setContactInfo(savedContactInfo);
        }
    }, [setContactInfo]);

    console.log('selectedOption', selectedOption)
    const handleRadioChange = (event) => {
        setSelectedOption(event.target.value);

        if (event.target.value === 'Cash On Delivery') {
            setShowConfirmOrderButton(true);
            setShowPayNowButton(false);
        } else if (event.target.value === 'Online Method') {
            setShowPayNowButton(true);
            setShowConfirmOrderButton(false);
        }
    };



    const [dataToSend, setDatatoSend] = useState([]);
    const [updatedDataToSend, setUpdatedDataToSend] = useState({});
    // console.log(selectedOption)
    useEffect(() => {
        const retrievedData = localStorage.getItem('dataToSend');
        if (retrievedData) {
            const data = JSON.parse(retrievedData);
            setDatatoSend(data);

            // Update dataToSend with selectedOption
            const updatedData = { ...data, selectedOption };

            // Save updatedDataToSend back to localStorage
            localStorage.setItem('dataToSend', JSON.stringify(updatedData));

            // Update updatedDataToSend state
            setUpdatedDataToSend(updatedData);
        }
    }, [selectedOption]);

    console.log('updated data', updatedDataToSend)


    const handlePayNowInfo = () => {
        console.log(dataToSend)
        fetch('http://localhost:5000/orders', {
            method: 'POST',
            headers: { "content-type": "application/json" },
            body: JSON.stringify(updatedDataToSend)
        })
            .then(res => res.json())
            .then(result => {
                window.location.replace(result.GatewayPageURL)
                console.log(result)
            })
    }

    const handleCODInfo = () => {
        const updatedDataToSend = { ...updatedDataToSend, payment: "not paid" };
        fetch('http://localhost:5000/CODorder', {
            method: 'POST',
            headers: { "content-type": "application/json" },
            body: JSON.stringify(updatedDataToSend)
        })
            .then(res => res.json())
            .then(result => {
                console.log(result)
                if (result.success) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Order Placed",
                        timer: 1500,
                    });
                }

                localStorage.removeItem('cartData');
                setLocalCartData([]);

                window.location.href = '/';

            })
    }

    return (
        <div className="bg-[#D8D8D8] [font-family:'Helvetica_Now_Display-Medium',Helvetica]">
            <div className=' px-[100px] py-[100px]'>
                <div className=' flex flex-col lg:flex-row justify-between items-stretch gap-[20px]'>
                    {/* containr 1 */}
                    <div className="border-solid border-[#cfcfcf] bg-white flex flex-col mb-10 gap-6  w-1/2  items-start px-10 py-8 border-2 rounded-lg">
                        <div className="border-solid overflow-hidden self-stretch flex flex-col mb-5 gap-8 h-[345px] shrink-0 p-6 border-black/18 border-2 rounded-lg">
                            <div className="flex flex-row justify-between items-center">
                                <div className="flex flex-row gap-16 w-1/2 items-start">
                                    <div className="text-lg [font-family:'Helvetica_Now_Display-Medium',Helvetica] font-medium text-[#828282]">
                                        Contact
                                    </div>
                                    <div className="text-lg [font-family:'Helvetica_Now_Display-Medium',Helvetica] font-medium text-[#1c2e37]">
                                        {contactInfo?.email}
                                    </div>
                                </div>
                                <div className="bg-[#1c2e37] self-start flex flex-col justify-center h-12 items-center rounded-lg">
                                    <Link to="/checkout" className=' text-[19px] text-white px-[25px] py-[20px] bg-[#1C2E37] rounded-[10px]'>
                                        Change
                                    </Link>
                                </div>
                            </div>
                            <img
                                src="https://file.rendit.io/n/zYXJczgENPNh0Tj8W1VF.svg"
                                className="self-center"
                                id="Line"
                            />
                            <div className="flex flex-row justify-between items-start">
                                <div className="flex flex-row mt-2 gap-16 w-3/4 items-center">
                                    <div className="text-[19px]  [font-family:'Helvetica_Now_Display-Medium',Helvetica] font-medium text-[#828282]">
                                        Ship to
                                    </div>
                                    <div className="text-lg [font-family:'Helvetica_Now_Display-Medium',Helvetica] font-medium text-[#828282] self-start w-3/4">
                                        {contactInfo?.Address}
                                    </div>
                                </div>
                                <div className="bg-[#1c2e37] flex flex-col justify-center h-12 items-center rounded-lg">
                                    <Link to="/checkout" className=' text-[19px] text-white px-[25px] py-[20px] bg-[#1C2E37] rounded-[10px]'>
                                        Change
                                    </Link>
                                </div>
                            </div>
                            <img
                                src="https://file.rendit.io/n/zYXJczgENPNh0Tj8W1VF.svg"
                                className="self-center"
                                id="Line1"
                            />
                            <div className="flex flex-row justify-between items-center">
                                <div className="flex flex-row gap-16 items-start">
                                    <div className="text-lg [font-family:'Helvetica_Now_Display-Medium',Helvetica] font-medium text-[#828282] mt-px">
                                        Method
                                    </div>
                                    <div className="flex flex-row gap-4 w-[142px] shrink-0 items-start">
                                        <div
                                            className="text-lg [font-family:'Helvetica_Now_Display-Medium',Helvetica] font-medium text-[#828282]"
                                            id="Standard"
                                        >
                                            Standard
                                        </div>
                                        <div className="text-right text-lg [font-family:'Helvetica_Now_Display-Medium',Helvetica] font-medium text-[#1c2e37]">
                                            <p className="text-[19px] text-[#828282] font-family:'Helvetica_Now_Display-Medium',Helvetica">
                                                <div className="px-[28px] py-[20px] text-end font-bold">
                                                    {contactInfo && contactInfo.Country && contactInfo.City && (
                                                        (contactInfo.Country.toUpperCase()) === 'BANGLADESH' && (contactInfo.City.toUpperCase()) === 'DHAKA' ? (
                                                            <p>Tk. 80</p>
                                                        ) : (contactInfo.Country.toUpperCase()) === 'BANGLADESH' && (contactInfo.City.toUpperCase()) !== 'DHAKA' ? (
                                                            <p>Tk. 120</p>
                                                        ) : (contactInfo.Country.toUpperCase()) !== 'BANGLADESH' ? (
                                                            <p>$5.00</p>
                                                        ) : null
                                                    )}
                                                </div>
                                            </p>

                                        </div>
                                    </div>
                                </div>
                                <div className="bg-[#1c2e37] self-start flex flex-col justify-center h-12 items-center rounded-lg">
                                    <Link to="/shipping" className=' text-[19px] text-white px-[25px] py-[20px] bg-[#1C2E37] rounded-[10px]'>
                                        Change
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="text-2xl [font-family:'Helvetica_Now_Display-Medium',Helvetica] font-bold uppercase">
                            payment
                        </div>
                        <div className="text-lg [font-family:'Helvetica_Now_Display-Medium',Helvetica] font-medium text-[#828282] mb-2">
                            All transactions are secure and encrypted.
                            <p className=' flex mb-2 gap-3'>
                                {selectedCurrencyValue === "USD" ? (
                                    <>
                                        <input type="radio" name="radio-1" className="radio radio-[#828282]" value="Online Method"
                                            onChange={handleRadioChange} />
                                        <p>Online Method</p>
                                    </>
                                ) : (
                                    <>
                                        <div className=' flex flex-col'>
                                            <div className=' flex flex-row gap-2'>
                                                <input type="radio" name="radio-1" className="radio radio-[#828282]" value="Cash On Delivery"
                                                    onChange={handleRadioChange} />
                                                <p>Cash On Delivery</p>
                                            </div>
                                            <div className=' flex flex-row gap-2'>
                                                <input type="radio" name="radio-1" className="radio radio-[#828282]" value="Online Method"
                                                    onChange={handleRadioChange} />
                                                <p>Online Method</p>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </p>
                        </div>


                        <div className='flex w-full justify-end'>
                            {showConfirmOrderButton && (
                                <button onClick={handleCODInfo} className='text-[19px] text-white px-[25px] py-[20px] bg-[#1C2E37] rounded-[10px]'> Confirm Order </button>
                            )}
                            {showPayNowButton && (
                                <button onClick={handlePayNowInfo} className='text-[19px] text-white px-[25px] py-[20px] bg-[#1C2E37] rounded-[10px]'> Pay Now </button>
                            )}
                        </div>
                    </div>


                    {/* container 2 */}
                    <div className=" w-1/2 bg-white rounded-[10px] py-[50px] ">
                        {
                            localCartData.map((item, index) =>
                                <div key={index} className=" flex flex-row justify-between align-middle items-center px-20 mb-3">
                                    <div>

                                        <img className="w-[135px] h-[135px] rounded-[10px] object-cover "
                                            src={`http://localhost:5000/uploads/${item.ProductImage}`}
                                            alt="" />
                                    </div>
                                    <div>
                                        <p className="text-[19px] text-[#474747] mb-[16px] [font-family:'Helvetica_Now_Display-Medium',Helvetica]">
                                            {item.ProductName}
                                        </p>
                                        <div className=" flex flex-row justify-between items-center align-middle ">
                                            <div className="w-5 h-5 mt-2 rounded-full" style={{ backgroundColor: item?.selectedColor }}></div>
                                            <p>/</p>
                                            <p className=" text-[19px] text-[#828282] [font-family:'Helvetica_Now_Display-Medium',Helvetica]">
                                                {item.ProductSize}
                                            </p>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-[19px] text-[#828282] [font-family:'Helvetica_Now_Display-Medium',Helvetica]">Quantity - {item.ProductQuantity}</p>
                                    </div>
                                    <div className="w-20 h-16 text-center border-[2px] border-[#0000002E] rounded-[10px] flex flex-col justify-center">
                                        <span className="font-semibold text-sm">
                                            {selectedCurrencyValue === 'BDT' ? (
                                                item.ProductSale === 'Sale' ?
                                                    (item.salePriceInBDT && `Tk.${item.salePriceInBDT}`) :
                                                    (item.priceInBDT && `Tk.${item.priceInBDT}`)
                                            ) : (
                                                item.ProductSale === 'Sale' ?
                                                    (item.salePriceInUSD && `$${item.salePriceInUSD}`) :
                                                    (item.priceInUSD && `$${item.priceInUSD}`)
                                            )}
                                        </span>
                                    </div>
                                </div>
                            )
                        }

                        <div className="divider text-[#0000003D]"></div>

                        <div>
                            <div className="flex flex-row justify-between px-20  items-center">
                                <h1 className="text-[19px] text-[#828282] font-[Helvetica_Now_Display-Medium]">Subtotal</h1>
                                <p className="text-[19px] px-[28px] py-[20px] text-[#1C2E37] font-[Helvetica_Now_Display-Medium]">
                                    {dataToSend?.totals}
                                </p>
                            </div>
                            <div className="flex flex-row justify-between px-20 items-center">
                                <h1 className="text-[19px] text-[#828282] font-[Helvetica_Now_Display-Medium]">Shipping</h1>
                                <p className="text-[19px] text-[#1C2E37] font-[Helvetica_Now_Display-Medium]">
                                    <div className="px-[28px] py-[20px] font-[Helvetica_Now_Display-Medium] ">
                                        {contactInfo && contactInfo?.Country && contactInfo?.City && (
                                            contactInfo?.Country.toUpperCase() != 'BANGLADESH' && selectedCurrencyValue === 'USD' ? (
                                                <p>$5.00</p>
                                            ) : (
                                                contactInfo?.Country.toUpperCase() === 'BANGLADESH' && contactInfo?.City.toUpperCase() === 'DHAKA' ? (
                                                    <p>Tk. 80</p>
                                                ) : (
                                                    <p>Tk. 120</p>
                                                )
                                            )
                                        )}

                                    </div>
                                </p>
                            </div>
                        </div>

                        <div className="divider text-[#0000003D]"></div>

                        <div className=" px-20">
                            <h1 className=" text-[27px] font-bold uppercase mb-[25px]  [font-family:'Helvetica_Now_Display-Medium',Helvetica]">Total</h1>
                            <div className=" flex flex-row justify-between">
                                <h1 className=" text-[19px] text-[#828282] [font-family:'Helvetica_Now_Display-Medium',Helvetica]">Including 5%  in Taxes</h1>
                                <p className=" text-[19px] px-[28px] py-[20px] text-[#1C2E37] [font-family:'Helvetica_Now_Display-Medium',Helvetica]">
                                    {dataToSend?.subtotalTaxandShipping}
                                </p>
                            </div>
                        </div>
                        {/* <div className="divider mb-[53px] text-[#0000003D]"></div>

                        <div className="px-20">
                            <h1 className=" text-[27px] font-bold uppercase mb-[28px] [font-family:'Helvetica_Now_Display-Medium',Helvetica]">Coupon:</h1>
                            <p className=" text-[19px] text-[#828282] mb-[14px] [font-family:'Helvetica_Now_Display-Medium',Helvetica]">Ordering for the First time?</p>
                            <p className=" text-[19px] text-[#828282] mb-[28px] [font-family:'Helvetica_Now_Display-Medium',Helvetica]">Heres a special discount!</p>
                            <p className=" text-[19px] text-[#828282] mb-[28px] [font-family:'Helvetica_Now_Display-Medium',Helvetica]">Use Code: <span className=" text-[#202020] font-bold ">FIRSTORDER</span></p>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPayment;