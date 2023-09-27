import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Provider/AuthProvider';
const CheckoutPayment = () => {
    const { user, orderContactInfo, localCartData,totals, setTotals,totalShipping, settotalShipping,subtotalTaxandShipping, setsubtotalTaxandShipping } = useContext(AuthContext);
    const [selectedOption, setSelectedOption] = useState('');
    const [showConfirmOrderButton, setShowConfirmOrderButton] = useState(false);
    const [showPayNowButton, setShowPayNowButton] = useState(false);


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

    const dataToSend = {
        ...orderContactInfo,
        subtotalTaxandShipping,
        totalShipping,
        totals, selectedOption
    };
    console.log(dataToSend)
    const handlePayNowInfo = () => {
        fetch('http://localhost:5000/order', {
            method: 'POST',
            headers: { "content-type": "application/json" },
            body: JSON.stringify(dataToSend)
        })
            .then(res => res.json())
            .then(result => {
                window.location.replace(result.GatewayPageURL)
                console.log(result)
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
                                        {orderContactInfo.email}
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
                                        {orderContactInfo.Address}
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
                                            Tk. {subtotalTaxandShipping}
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
                                <input type="radio" name="radio-1" className="radio radio-[#828282]" value="Cash On Delivery"
                                    onChange={handleRadioChange} />
                                <p>Cash On Delivery</p>
                            </p>
                            <p className=' flex mb-2 gap-3'>
                                <input type="radio" name="radio-1" className="radio radio-[#828282]" value="Online Method"
                                    onChange={handleRadioChange} />
                                <p>Online Method</p>
                            </p>
                        </div>
                        <div className='flex w-full justify-end'>
                            {showConfirmOrderButton && (
                                <button className='text-[19px] text-white px-[25px] py-[20px] bg-[#1C2E37] rounded-[10px]'> Confirm Order </button>
                            )}
                            {showPayNowButton && (
                                <button onClick={handlePayNowInfo} className='text-[19px] text-white px-[25px] py-[20px] bg-[#1C2E37] rounded-[10px]'> Pay Now </button>
                            )}
                        </div>
                    </div>


                    {/* container 2 */}
                    <div className=" w-1/2 bg-white rounded-[10px] py-[50px] ">
                        {
                            localCartData && localCartData.map((item, index) =>
                                <div key={index} className=" flex flex-row justify-between align-middle items-center px-20 mb-3">
                                    <div>

                                        <img className="w-[135px] h-[135px] rounded-[10px] "
                                            src={`http://localhost:5000/uploads/${item.ProductImage}`}
                                            alt="" />
                                    </div>
                                    <div>
                                        <p className="text-[19px] text-[#474747] mb-[16px] [font-family:'Helvetica_Now_Display-Medium',Helvetica]">
                                            {item.ProductName}
                                        </p>
                                        <p className=" text-[19px] text-[#828282] [font-family:'Helvetica_Now_Display-Medium',Helvetica]">Dark Green / {item.ProductSize}</p>
                                    </div>
                                    <div className="  border-[2px] border-[#0000002E] rounded-[10px]">
                                        <p className="px-[28px] py-[20px] [font-family:'Helvetica_Now_Display-Medium',Helvetica]">
                                            Tk. {item.ProductPrice}</p>

                                    </div>
                                </div>
                            )
                        }

                        <div className="divider text-[#0000003D]"></div>

                        <div>
                            <div className=" flex flex-row justify-between px-20">
                                <h1 className=" text-[19px] text-[#828282] [font-family:'Helvetica_Now_Display-Medium',Helvetica]">Subtotal</h1>
                                <p className=" text-[19px] text-[#1C2E37] [font-family:'Helvetica_Now_Display-Medium',Helvetica]">Tk. {totals}</p>
                            </div>
                            <div className=" flex flex-row justify-between px-20">
                                <h1 className=" text-[19px] text-[#828282] [font-family:'Helvetica_Now_Display-Medium',Helvetica]">Shipping</h1>
                                <p className=" text-[19px] text-[#828282] [font-family:'Helvetica_Now_Display-Medium',Helvetica]">
                                    Tk. {totalShipping}
                                </p>
                            </div>
                        </div>

                        <div className="divider text-[#0000003D]"></div>

                        <div className=" px-20">
                            <h1 className=" text-[27px] font-bold uppercase mb-[25px]  [font-family:'Helvetica_Now_Display-Medium',Helvetica]">Total</h1>
                            <div className=" flex flex-row justify-between">
                                <h1 className=" text-[19px] text-[#828282] [font-family:'Helvetica_Now_Display-Medium',Helvetica]">Including 5%  in Taxes</h1>
                                <p className=" text-[19px] text-[#1C2E37] [font-family:'Helvetica_Now_Display-Medium',Helvetica]">
                                    Tk.{subtotalTaxandShipping}
                                </p>
                            </div>
                        </div>
                        <div className="divider mb-[53px] text-[#0000003D]"></div>

                        <div className="px-20">
                            <h1 className=" text-[27px] font-bold uppercase mb-[28px] [font-family:'Helvetica_Now_Display-Medium',Helvetica]">Coupon:</h1>
                            <p className=" text-[19px] text-[#828282] mb-[14px] [font-family:'Helvetica_Now_Display-Medium',Helvetica]">Ordering for the First time?</p>
                            <p className=" text-[19px] text-[#828282] mb-[28px] [font-family:'Helvetica_Now_Display-Medium',Helvetica]">Heres a special discount!</p>
                            <p className=" text-[19px] text-[#828282] mb-[28px] [font-family:'Helvetica_Now_Display-Medium',Helvetica]">Use Code: <span className=" text-[#202020] font-bold ">FIRSTORDER</span></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPayment;