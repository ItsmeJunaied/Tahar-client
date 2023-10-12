import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Provider/AuthProvider';
import { useForm } from 'react-hook-form';

const Shipping = () => {
    const { totals, localCartData, setTotals, settotalShipping, setsubtotalTaxandShipping, doller, selectedCurrencyValue, contactInfo, setContactInfo, discount, setdiscount } = useContext(AuthContext);

    console.log(localCartData)
    const [code, setCode] = useState([]);
    const [customerCode, setCustomerCode] = useState('');
    const storedTotal = localStorage.getItem('subtotal');
    // console.log(storedTotal)
    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm()

    const onSubmit = (data) => {
        setCustomerCode(data)
        console.log(data)
    }

    useEffect(() => {
        // Get the current cart data from local storage
        const savedContactInfo = JSON.parse(localStorage.getItem('contactInfo'));

        // Update the state with the saved data, if available
        if (savedContactInfo) {
            setContactInfo(savedContactInfo);
        }
    }, [setContactInfo]);

    useEffect(() => {
        fetch('https://tahar-server.vercel.app/promocode')
            .then(res => res.json())
            .then(data => setCode(data))
    }, [])


    const matchedCode = code.find(item => item.name === customerCode.code);



    let totalWithShipping = 0;
    if (contactInfo && contactInfo.City && contactInfo.Country) {
        if (contactInfo.Country.toUpperCase() === 'BANGLADESH' && contactInfo.City.toUpperCase() === 'DHAKA') {
            totalWithShipping = parseFloat(totals) + 80;
        } else if (contactInfo.Country.toUpperCase() === 'BANGLADESH' && contactInfo.City.toUpperCase() != 'DHAKA') {
            totalWithShipping = parseFloat(totals) + 120;
        } else if (contactInfo.Country.toUpperCase() != 'BANGLADESH') {
            totalWithShipping = parseFloat(totals) + 5;
        }
    }


    settotalShipping(totalWithShipping)
    setTotals(storedTotal);
    if (matchedCode) {

        const discount = parseFloat(storedTotal) * (parseInt(matchedCode.percentage) / 100);
        const discountedTotal = parseFloat(storedTotal) - discount;
        console.log('discount', discount)
        setdiscount(discount);
        setTotals(discountedTotal);
    }


    let subtotalWithTaxandShipping = (totalWithShipping * 1.05).toFixed(2);


    // console.log('storedTotal', storedTotal)
    // console.log('discount', discount)
    // console.log('totals', totals)


    setsubtotalTaxandShipping(subtotalWithTaxandShipping)


    const dataToSend = {
        ...contactInfo,
        localCartData,
        subtotalTaxandShipping: subtotalWithTaxandShipping,
        totalShipping: totalWithShipping,
        discount,
        selectedCurrencyValue,
        totals: totals,
    };

    
    localStorage.setItem('dataToSend', JSON.stringify(dataToSend));
    console.log(dataToSend)
    return (
        <div className="bg-[#D8D8D8] [font-family:'Helvetica_Now_Display-Medium',Helvetica]">
            <div className=' px-[100px] py-[100px]'>
                <div className=' flex flex-col lg:flex-row justify-between items-start gap-[20px]'>
                    {/* containr 1 */}
                    <div className='  bg-white rounded-[10px] py-[35px] pl-[37px] pr-[37px] '>
                        <div className=' w-[805px]  px-[25px] py-[27px] border-[2px] border-[#0000003D] rounded-[10px] mb-[49px]'>
                            <div className=' flex flex-row justify-between '>
                                <div className=' flex gap-[64px] '>
                                    <h1 className=' text-[19px] text-[#1C2E37]'>Contact</h1>
                                    <h1 className=' max-w-[354px] text-[19px] text-[#828282]'>{contactInfo?.email}</h1>
                                </div>
                                <Link to="/checkout" className=' text-[19px] text-white px-[25px] py-[20px] bg-[#1C2E37] rounded-[10px]'>
                                    Change
                                </Link>
                            </div>

                            <div className=' divider'></div>

                            <div className=' flex flex-row justify-between'>
                                <div className=' flex gap-[64px]'>
                                    <h1 className=' text-[19px] text-[#828282]'>Ship To</h1>
                                    <h1 className=' max-w-[354px] text-[19px] text-[#828282]'>
                                        {contactInfo?.Address}
                                    </h1>
                                </div>

                                <Link to="/checkout" className=' text-[19px] text-white px-[25px] py-[20px] bg-[#1C2E37] rounded-[10px]'>
                                    Change
                                </Link>

                            </div>
                        </div>
                        <div>
                            <h1 className=' mb-[36px] text-[#000000] text-[27px] font-bold'>Total</h1>
                            <div className=" w-[805px]  px-[25px] py-[27px] rounded-[10px] border-2 border-solid border-[rgba(0, 0, 0, 0.18)]">
                                <div className=' flex flex-row justify-between align-middle items-center '>
                                    <div>
                                        <h1 className=' text-[19px] text-[#828282]'>Standard</h1>
                                    </div>
                                    <div>
                                        <div className="flex justify-center items-center w-[109px] h-[57px] border-[2px] border-[#0000002E] rounded-[10px]">
                                            <div className="px-[28px] py-[20px] font-family:'Helvetica_Now_Display-Medium',Helvetica font-bold">
                                                {contactInfo && contactInfo.Country && contactInfo.City && (
                                                    contactInfo.Country.toUpperCase() === 'BANGLADESH' && contactInfo.City.toUpperCase() === 'DHAKA' ? (
                                                        <p>Tk. 80</p>
                                                    ) : contactInfo.Country.toUpperCase() === 'BANGLADESH' && contactInfo.City.toUpperCase() !== 'DHAKA' ? (
                                                        <p>Tk. 120</p>
                                                    ) : contactInfo.Country.toUpperCase() !== 'BANGLADESH' ? (
                                                        <p>$5.00</p>
                                                    ) : null
                                                )}
                                            </div>

                                        </div>

                                    </div>
                                </div>
                            </div>

                        </div>

                        <div className=' flex flex-col lg:flex-row items-center justify-center gap-[19px] mt-[29px]'>
                            <Link to="/checkout">
                                <input className=" w-[393px] h-[67px] bg-transparent border-[2px] border-[#DCDCDC] rounded-[10px] [font-family:'Helvetica_Now_Display-Medium',Helvetica] text-[#828282]" type="submit" value="Return To Information" />
                            </Link>
                            <Link to="/shippingPayment">
                                <input className=" w-[393px] h-[67px] bg-[#1C2E37] rounded-[10px] [font-family:'Helvetica_Now_Display-Medium',Helvetica] text-white" type="submit" value="Continue to Shipping" />
                            </Link>
                        </div>
                    </div>
                    {/* container 2 */}
                    <div className=" w-1/2 bg-white rounded-[10px] py-[100px] ">
                        {
                            localCartData.map((item, index) =>
                                <div key={index} className=" flex flex-row justify-between align-middle items-center px-20 mb-3">
                                    <div>

                                        <img className="w-[135px] h-[135px] rounded-[10px] object-cover "
                                            src={`https://tahar-server.vercel.app/uploads/${item.ProductImage}`}
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
                                            <p className=" text-[#828282] text-[13px] [font-family:'Helvetica_Now_Display-Medium',Helvetica]">
                                                <p className='text-lg font-bold'>
                                                    {selectedCurrencyValue === 'BDT' ? (
                                                        item.ProductSale === 'Sale' ?
                                                            (item.salePriceInBDT && `Tk.${item.salePriceInBDT}`) :
                                                            (item.priceInBDT && `Tk.${item.priceInBDT}`)
                                                    ) : (
                                                        item.ProductSale === 'Sale' ?
                                                            (item.salePriceInUSD && `$${item.salePriceInUSD}`) :
                                                            (item.priceInUSD && `$${item.priceInUSD}`)
                                                    )}
                                                </p>

                                            </p>
                                        </span>
                                    </div>
                                </div>
                            )
                        }

                        <div className="flex flex-col gap-4 w-full items-start px-20 mt-[46px]">
                            <div className="text-lg [font-family:'Helvetica_Now_Display-Medium',Helvetica] font-medium text-[#828282]">
                                Promo Code / Coupons:
                            </div>
                            <form
                                onSubmit={handleSubmit(onSubmit)}
                                className="border-solid border-[#dcdcdc] h-[72px] overflow-hidden self-stretch flex flex-row items-center justify-between p-1 border-2 rounded-lg">
                                <input
                                    {...register("code", { required: true })}
                                    className='w-full h-full focus:outline-none ps-5' type="text" name="code" id="" />

                                <button
                                    type='submit'
                                    className=" bg-[#1c2e37] flex flex-col justify-center h-[56px] w-[106px] shrink-0 items-center rounded-lg  text-base [font-family:'Helvetica_Now_Display-Medium',Helvetica] font-bold text-white">
                                    Apply
                                </button>

                            </form>
                        </div>

                        <div className="divider text-[#0000003D]"></div>

                        <div>
                            <div className="flex flex-row justify-between px-20 items-center">
                                <h1 className="text-[19px] text-[#828282] font-[Helvetica_Now_Display-Medium]">Subtotal</h1>
                                <p className="text-[19px] text-[#1C2E37] font-[Helvetica_Now_Display-Medium]">
                                    {totals}
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
                                <p className=" text-[19px] text-[#1C2E37] [font-family:'Helvetica_Now_Display-Medium',Helvetica]">
                                    {/* Tk.{subtotalWithTaxandShipping}
                                     */}
                                    {subtotalWithTaxandShipping}

                                </p>
                            </div>
                        </div>
                        <div className="divider mb-[53px] text-[#0000003D]"></div>

                        <div className="px-20">
                            <h1 className=" text-[27px] font-bold uppercase mb-[28px] [font-family:'Helvetica_Now_Display-Medium',Helvetica]">Coupon:</h1>
                            <p className=" text-[19px] text-[#828282] mb-[14px] [font-family:'Helvetica_Now_Display-Medium',Helvetica]">Ordering for the First time?</p>
                            <p className=" text-[19px] text-[#828282] mb-[28px] [font-family:'Helvetica_Now_Display-Medium',Helvetica]">Heres a special discount!</p>
                            <p className=" text-[19px] text-[#828282] mb-[28px] [font-family:'Helvetica_Now_Display-Medium',Helvetica]">Use Code: <span className=" text-[#202020] font-bold ">Tahar20</span></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Shipping;