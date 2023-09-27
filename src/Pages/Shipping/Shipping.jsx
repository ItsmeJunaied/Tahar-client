import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Provider/AuthProvider';
import { useForm } from 'react-hook-form';

const Shipping = () => {
    const { orderContactInfo, localCartData, setTotals, settotalShipping, setsubtotalTaxandShipping } = useContext(AuthContext);

    const [code, setCode] = useState([]);
    const [customerCode, setCustomerCode] = useState('');

    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm()

    const onSubmit = (data) => {
        setCustomerCode(data)
        console.log(data)
    }

    useEffect(() => {
        fetch('http://localhost:5000/promocode')
            .then(res => res.json())
            .then(data => setCode(data))
    }, [])


    const matchedCode = code.find(item => item.name === customerCode.code);





    let total = 0;
    let quantity = 0;

    for (const product of localCartData) {
        quantity = quantity + product.ProductQuantity;
        total = total + product.ProductPrice * product.ProductQuantity;
    }
    if (matchedCode) {
        total -= total * (parseInt(matchedCode.percentage) / 100);
    }

    setTotals(total)

    let totalWithShipping = 0;
    if (orderContactInfo && orderContactInfo.City) {
        if (orderContactInfo.City.toUpperCase() === 'DHAKA') {
            totalWithShipping = total + 80;
        } else {
            totalWithShipping = total + 120;
        }
    }

    settotalShipping(totalWithShipping)
    // console.log(orderContactInfo.City.toUpperCase())
    // console.log(localCartData)
    let subtotalWithTaxandShipping = totalWithShipping * 1.05;

    subtotalWithTaxandShipping = subtotalWithTaxandShipping.toFixed(2);

    setsubtotalTaxandShipping(subtotalWithTaxandShipping)
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
                                    <h1 className=' max-w-[354px] text-[19px] text-[#828282]'>{orderContactInfo.email}</h1>
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
                                        {orderContactInfo.Address}
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
                                                {orderContactInfo && orderContactInfo.City.toUpperCase() === 'DHAKA' ? (
                                                    <p>Tk. 80</p>
                                                ) : (
                                                    <p>Tk. 120</p>
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
                            <div className=" flex flex-row justify-between px-20">
                                <h1 className=" text-[19px] text-[#828282] [font-family:'Helvetica_Now_Display-Medium',Helvetica]">Subtotal</h1>
                                <p className=" text-[19px] text-[#1C2E37] [font-family:'Helvetica_Now_Display-Medium',Helvetica]">Tk. {total}</p>
                            </div>
                            <div className=" flex flex-row justify-between px-20">
                                <h1 className=" text-[19px] text-[#828282] [font-family:'Helvetica_Now_Display-Medium',Helvetica]">Shipping</h1>
                                <p className=" text-[19px] text-[#828282] [font-family:'Helvetica_Now_Display-Medium',Helvetica]">
                                    Tk. {totalWithShipping}
                                </p>
                            </div>
                        </div>

                        <div className="divider text-[#0000003D]"></div>

                        <div className=" px-20">
                            <h1 className=" text-[27px] font-bold uppercase mb-[25px]  [font-family:'Helvetica_Now_Display-Medium',Helvetica]">Total</h1>
                            <div className=" flex flex-row justify-between">
                                <h1 className=" text-[19px] text-[#828282] [font-family:'Helvetica_Now_Display-Medium',Helvetica]">Including 5%  in Taxes</h1>
                                <p className=" text-[19px] text-[#1C2E37] [font-family:'Helvetica_Now_Display-Medium',Helvetica]">
                                    Tk.{subtotalWithTaxandShipping}
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